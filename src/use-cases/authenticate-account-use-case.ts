import { Injectable, UnauthorizedException } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { compare } from 'bcryptjs'
import { UsersRepository } from 'src/repositories/users-repository'

interface AuthenticateAccountUseCaseBody {
  email: string
  password: string
}

interface AuthenticateAccountUseCaseResponse {
  token: string
}

@Injectable()
export class AuthenticateAccountUseCase {
  constructor(
    private usersRepository: UsersRepository,
    private jwt: JwtService,
  ) {}

  async execute({
    email,
    password,
  }: AuthenticateAccountUseCaseBody): Promise<AuthenticateAccountUseCaseResponse> {
    const isAccountExists = await this.usersRepository.findByEmail(email)

    if (!isAccountExists) {
      throw new UnauthorizedException('Crendenciais inválidas.')
    }

    const isPasswordEquals = compare(password, isAccountExists.password)

    if (!isPasswordEquals) {
      throw new UnauthorizedException('Crendenciais inválidas.')
    }

    const token = await this.jwt.sign({
      sub: isAccountExists.id,
      role: isAccountExists.role,
    })

    return { token }
  }
}
