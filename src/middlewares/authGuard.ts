import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';

@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const ctx = GqlExecutionContext.create(context);
    const authorization = ctx.getContext().req.headers['authorization'];
    if (!authorization) {
      throw new UnauthorizedException('Not authenticated');
    }

    try {
      console.log(authorization);
      const token = authorization.split(' ')[1];
      return true;
    } catch (err) {
      console.log(err);
      throw new UnauthorizedException('Not authenticated');
    }
  }
}
