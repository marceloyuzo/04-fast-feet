import {
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common'
import { OrdersRepository } from 'src/repositories/orders-repository'
import { UsersRepository } from 'src/repositories/users-repository'

interface DeliveringOrderUseCaseProps {
  userId: string
  orderId: string
}

@Injectable()
export class DeliveringOrderUseCase {
  constructor(
    private ordersRepository: OrdersRepository,
    private usersRepository: UsersRepository,
  ) {}

  async execute({ orderId, userId }: DeliveringOrderUseCaseProps) {
    const userExist = await this.usersRepository.findById(userId)

    if (!userExist) {
      throw new NotFoundException(
        'O usuário que está requisitando a entrega do pedido não foi encontrado.',
      )
    }

    const orderExist = await this.ordersRepository.findById(orderId)

    if (!orderExist) {
      throw new NotFoundException(
        'O pedido que o usuário está tentando entregar não foi encontrado.',
      )
    }

    if (orderExist.userId !== userId) {
      throw new UnauthorizedException(
        'Credenciais inválidas para realizar essa operação.',
      )
    }

    if (orderExist.status !== 'pickedUp') {
      throw new ConflictException(
        'Este pedido não está em estado possível de entrega.',
      )
    }

    await this.ordersRepository.update({
      ...orderExist,
      status: 'delivered',
      updatedAt: new Date(),
      deliveredAt: new Date(),
    })
  }
}
