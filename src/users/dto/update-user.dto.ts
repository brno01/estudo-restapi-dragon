import { IsEmail, IsNotEmpty, IsOptional } from 'class-validator';

export class UpdateUserDto {
    @IsNotEmpty({ message: 'O email é obrigatório para alteração :)' })
    @IsEmail({}, { message: 'O email informado é inválido para alteração :)' })
    @IsOptional()
    email?: string;

    @IsNotEmpty({ message: 'O nome é obrigatório para alteração :)' })
    @IsOptional()
    name?: string;

    @IsNotEmpty({ message: 'Informe sua senha, por favor :)' })
    @IsOptional()
    password?: string;
}
