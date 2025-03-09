import { ConflictException, Injectable } from '@nestjs/common'
import { User } from '@prisma/client'
import { hash } from 'bcryptjs'
import { UsersRepository } from 'src/repositories/users-repository'

interface RegisterAccountUseCaseBody {
  name: string
  email: string
  password: string
  cpf: string
  role: 'deliveryMan' | 'admin'
}

interface RegisterAccountUseCaseResponse {
  user: User
}

@Injectable()
export class RegisterAccountUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute({
    cpf,
    email,
    name,
    password,
    role,
  }: RegisterAccountUseCaseBody): Promise<RegisterAccountUseCaseResponse> {
    const isEmailAlreadyExists = await this.usersRepository.findByEmail(email)

    if (isEmailAlreadyExists) {
      throw new ConflictException('Email já está cadastrado.')
    }

    const isCpfAlreadyExists = await this.usersRepository.findByCpf(cpf)

    if (isCpfAlreadyExists) {
      throw new ConflictException('Cpf já está cadastrado.')
    }

    const passwordHashed = await hash(password, 8)

    const user = await this.usersRepository.create({
      cpf,
      email,
      name,
      role,
      password: passwordHashed,
    })

    return { user }
  }
}
