import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common'
import { OrdersRepository } from 'src/repositories/orders-repository'
import { UsersRepository } from 'src/repositories/users-repository'

interface PickingUpOrderUseCaseProps {
  orderId: string
  userId: string
}

@Injectable()
export class PickingUpOrderUseCase {
  constructor(
    private ordersRepository: OrdersRepository,
    private usersRepository: UsersRepository,
  ) {}

  async execute({ orderId, userId }: PickingUpOrderUseCaseProps) {
    const userExist = await this.usersRepository.findById(userId)

    if (!userExist) {
      throw new NotFoundException(
        'O usuário que está requisitando a retirada do pedido não foi encontrado.',
      )
    }

    const orderExist = await this.ordersRepository.findById(orderId)

    if (!orderExist) {
      throw new NotFoundException(
        'O pedido que o usuário está tentando retirar não foi encontrado.',
      )
    }

    if (orderExist.userId === userId && orderExist.status === 'pickedUp') {
      throw new ConflictException('Você já retirou esse pedido')
    }

    if (orderExist.status !== 'pending') {
      throw new ConflictException(
        'Este pedido já foi retirado por outro usuário.',
      )
    }

    const orderUpdated = await this.ordersRepository.update({
      ...orderExist,
      status: 'pickedUp',
      pickedAt: new Date(),
      updatedAt: new Date(),
      userId,
    })

    return orderUpdated
  }
}
