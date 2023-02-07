import { ConflictException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}
    
    async AuthJWTSearch(email:string): Promise<User> {
        const checkUser = await this.userRepository.findOne({
            where: { email },
        });
        if (!checkUser) {
            throw new NotFoundException('User not found by email');
        }
        return checkUser;
    }

    async createUser(user:CreateUserDto): Promise<User> {
      const checkUser = await this.userRepository.findOneBy({
        email: user.email,
      });
      if (checkUser) {
        throw new ConflictException('User already exists with this email');
        }
        const userHash = {
          ...user,
          password: await bcrypt.hash(user.password, 12),
        };
      if (!userHash) {
        throw new InternalServerErrorException('Error while hashing password');
      }
      const userCreated = this.userRepository.save(userHash);
      return {
        message: 'User created successfully',
        ...userHash,
        password: '******',
        ...userCreated,
      };
    }

    async getAllUsers(): Promise<User[]> {
      const users = await this.userRepository.find();
      if (!users) {
        throw new InternalServerErrorException('Error while fetching users');
      }
      return users;
    }

    async getUserById(id: string): Promise<User> {
      const checkUser = await this.userRepository.findOne({
        where: { id },
      });
      if (!checkUser) {
        throw new InternalServerErrorException('User not found');
      }
      return checkUser;
    }

    async updateUser(id: string, user: UpdateUserDto): Promise<User> {
        const checkUser = await this.userRepository.findOne({
            where: { id },
        });
        if (!checkUser) {
            throw new InternalServerErrorException('User not found');
        }
        const userUpdated = await this.userRepository.create({
            id,
            ...user,
            password: await bcrypt.hash(user.password, 12),
        }).save();
        if (!userUpdated) {
            throw new InternalServerErrorException('Error while updating user');
        }
        const userSaved = await this.userRepository.findOne({
            where: { id },
        });
        return userSaved;
    }

    async deleteUser(id: string): Promise<User> {
        const checkUser = await this.userRepository.findOne({
            where: { id },
        });
        if (!checkUser) {
            throw new InternalServerErrorException('User not found');
        }
        const userDeleted = await this.userRepository.delete(id);
        if (!userDeleted) {
            throw new InternalServerErrorException('Error while deleting user');
        }
        return checkUser;
    }
}