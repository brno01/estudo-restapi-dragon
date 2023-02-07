import {
    IsEmail,
    IsNotEmpty,
    IsString,
    Matches,
    MaxLength,
    MinLength,
} from 'class-validator';

export class CreateUserDto  {
    @IsNotEmpty({ message: 'O email é obrigatório :)' })
    @IsEmail({}, { message: 'O email informado é inválido' })
    email: string;

    @IsNotEmpty({ message: 'Me informe seu nome, por favor :)' })
    @IsString()
    name: string;

    @IsString()
    @IsNotEmpty({ message: 'Informe sua senha, por favor :)' })
    @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
        message: 'A senha deve conter letras, números e caracteres',
    })
    @MinLength(6, { message: 'A senha deve conter no mínimo 6 caracteres' })
    @MaxLength(20, { message: 'A senha deve conter no máximo 20 caracteres' })
    password: string;
}
