import {
    IsEmail,
    IsNotEmpty,
    IsString,
    IsStrongPassword,
    Matches,
    MaxLength,
    MinLength,
} from 'class-validator';
import { BaseCollection } from 'src/common/shared/base.entity';

export class CreateUserDto extends BaseCollection  {
    @IsNotEmpty({ message: 'O email é obrigatório :)' })
    @IsEmail({}, { message: 'O email informado é inválido' })
    email: string;

    @IsNotEmpty({ message: 'Me informe seu nome, por favor :)' })
    @IsString()
    name: string;

    @IsNotEmpty({ message: 'Informe sua senha, por favor :)' })
    @IsStrongPassword({ minLength: 8, minLowercase: 1, minUppercase: 1, minNumbers: 1, minSymbols: 1 }, { message: 'A senha deve conter no mínimo 8 caracteres, 1 letra maiúscula, 1 letra minúscula, 1 número e 1 caractere' })
    password: string;
}
