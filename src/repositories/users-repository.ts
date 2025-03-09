import { Prisma, User } from '@prisma/client'

export abstract class UsersRepository {
  abstract create(data: Prisma.UserUncheckedCreateInput): Promise<User>
  abstract findByEmail(email: string): Promise<User | null>
  abstract findByCpf(cpf: string): Promise<User | null>
  abstract findById(userId: string): Promise<User | null>
}
