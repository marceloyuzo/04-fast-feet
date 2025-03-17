import { Injectable, NotFoundException } from '@nestjs/common'
import { OrdersRepository } from 'src/repositories/orders-repository'
import { UsersRepository } from 'src/repositories/users-repository'

interface FetchOrdersUseCaseProps {
  userId: string
  page: number
  limit: number
  status: 'onGoing' | 'done'
}

@Injectable()
export class FetchOrdersUseCase {
  constructor(
    private ordersRepository: OrdersRepository,
    private usersRepository: UsersRepository,
  ) {}

  async execute({ userId, limit, page, status }: FetchOrdersUseCaseProps) {
    const userExist = await this.usersRepository.findById(userId)

    if (!userExist) {
      throw new NotFoundException('O usuário não foi encontrado.')
    }

    const orders = await this.ordersRepository.findManyByUserId(
      userId,
      page,
      limit,
      status,
    )

    return orders
  }
}
