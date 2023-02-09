import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString } from 'class-validator';

export class LoginRequestBody {
    @IsEmail({}, { message: 'O email informado é inválido' })
    @ApiProperty()
    email: string;

    @IsString({ message: 'É necessário informar a senha'})
    @ApiProperty()
    password: string;
}
