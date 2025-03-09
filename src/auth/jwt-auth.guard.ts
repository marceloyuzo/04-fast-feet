import { AuthGuard } from '@nestjs/passport'
import {
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { JwtService } from '@nestjs/jwt'

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(
    private readonly reflector: Reflector,
    private readonly jwtService: JwtService,
  ) {
    super()
  }

  async canActivate(context: ExecutionContext) {
    const canActivate = await super.canActivate(context)

    if (!canActivate) {
      return false
    }

    const requiredRoles = this.reflector.getAllAndOverride<string[]>('roles', [
      context.getHandler(),
      context.getClass(),
    ])

    if (!requiredRoles) {
      return true
    }

    const request = context.switchToHttp().getRequest()

    const token = request.headers.authorization?.split(' ')[1]

    if (!token) {
      throw new UnauthorizedException('No token provided.')
    }

    const payload = this.jwtService.verify(token)
    const userRoles = payload.role || []
    const hasRole = () => userRoles === requiredRoles[0] // Alterar depois para caso tenha mais de uma role

    if (!hasRole()) {
      throw new UnauthorizedException('Insufficient permissions.')
    }

    return true
  }
}
