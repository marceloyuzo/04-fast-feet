import {
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common'
import { OrdersRepository } from 'src/repositories/orders-repository'
import { UsersRepository } from 'src/repositories/users-repository'

interface ReturningOrderUseCaseProps {
  userId: string
  orderId: string
}

@Injectable()
export class ReturningOrderUseCase {
  constructor(
    private ordersRepository: OrdersRepository,
    private usersRepository: UsersRepository,
  ) {}

  async execute({ orderId, userId }: ReturningOrderUseCaseProps) {
    const userExist = await this.usersRepository.findById(userId)

    if (!userExist) {
      throw new NotFoundException(
        'O usuário que está requisitando a devolução do pedido não foi encontrado.',
      )
    }

    const orderExist = await this.ordersRepository.findById(orderId)

    if (!orderExist) {
      throw new NotFoundException(
        'O pedido que o usuário está tentando devolver não foi encontrado.',
      )
    }

    if (orderExist.userId !== userId) {
      throw new UnauthorizedException(
        'Credenciais inválidas para realizar essa operação.',
      )
    }

    if (orderExist.status !== 'pickedUp') {
      throw new ConflictException(
        'Este pedido não está em estado possível de devolução.',
      )
    }

    await this.ordersRepository.update({
      ...orderExist,
      status: 'pending',
      updatedAt: new Date(),
      pickedAt: null,
      userId: null,
    })
  }
}
