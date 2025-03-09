import { NotFoundException } from '@nestjs/common'
import { OrdersRepository } from 'src/repositories/orders-repository'
import { UsersRepository } from 'src/repositories/users-repository'

interface FetchOrdersUseCaseProps {
  userId: string
}

export class FetchOrdersUseCase {
  constructor(
    private ordersRepository: OrdersRepository,
    private usersRepository: UsersRepository,
  ) {}

  async execute({ userId }: FetchOrdersUseCaseProps) {
    const userExist = await this.usersRepository.findById(userId)

    if (!userExist) {
      throw new NotFoundException('O usuário não foi encontrado.')
    }

    const orders = await this.ordersRepository.findManyByUserId(userId)

    return orders
  }
}
