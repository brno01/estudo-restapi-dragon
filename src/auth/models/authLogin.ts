import { Request } from 'express';
import { User } from 'src/users/entities/user.entity';

export interface Login extends Request {
    user: User;
}
