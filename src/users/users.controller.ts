import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { ApiOperation } from '@nestjs/swagger';
import { ApiBearerAuth, ApiBody, ApiConflictResponse, ApiOkResponse } from '@nestjs/swagger/dist';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  @Post()
  @ApiOperation({ summary: 'Create a new user' })
  @ApiConflictResponse({ description: 'User already exists with this email' })
  async createUser(@Body() createUserDto: CreateUserDto) {
    return await this.usersService.createUser(createUserDto)
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Get all users' })
  @ApiOkResponse({ description: 'Users fetched successfully' })
  @ApiBearerAuth()
  async getAllUsers(): Promise<User[]> {
    return this.usersService.getAllUsers();
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get a user by id' })
  @ApiOkResponse({ status: 200, description: 'User fetched successfully', type: User })
  async getOne(@Param('id') id: string): Promise<User> {
    return this.usersService.getUserById(id);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update a user by id' })
  @ApiBody({ type: UpdateUserDto })
  @ApiOkResponse({ status: 200, description: 'User updated successfully', type: User })
  update(@Param('id') id: string, @Body() user: UpdateUserDto): Promise<User> {
    return this.usersService.updateUser(id, { ...user });
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Delete a user by id' })
  @ApiOkResponse({ status: 200, description: 'User deleted successfully', type: User })
  async delete(@Param('id') id: string): Promise<User> {
    return this.usersService.deleteUser(id);
  }
}
