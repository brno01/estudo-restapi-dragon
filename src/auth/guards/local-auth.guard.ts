import {
    ExecutionContext,
    Injectable,
    UnauthorizedException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Observable } from 'rxjs';

@Injectable()
export class LocalAuthGuard extends AuthGuard('local') {
    canActivate(context: ExecutionContext) {
        return super.canActivate(context);
    }
    handleRequest(error, user) {
        if (error || !user) {
            throw error || new UnauthorizedException(error?.message);
        }
        return user;
    }
}
