import {
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common'
import { AttachmentsRepository } from 'src/repositories/attachments-repository'
import { OrdersRepository } from 'src/repositories/orders-repository'
import { UsersRepository } from 'src/repositories/users-repository'

interface DeliveringOrderUseCaseProps {
  userId: string
  orderId: string
  attachmentsIds: string[]
}

@Injectable()
export class DeliveringOrderUseCase {
  constructor(
    private ordersRepository: OrdersRepository,
    private usersRepository: UsersRepository,
    private attachmentsRepository: AttachmentsRepository,
  ) {}

  async execute({
    orderId,
    userId,
    attachmentsIds,
  }: DeliveringOrderUseCaseProps) {
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

    const attachments =
      await this.attachmentsRepository.findByIds(attachmentsIds)

    if (attachments.length !== attachmentsIds.length) {
      throw new NotFoundException('Um ou mais anexos não foram encontrados.')
    }

    await this.attachmentsRepository.update(attachmentsIds, orderId)

    await this.ordersRepository.update({
      ...orderExist,
      status: 'delivered',
      updatedAt: new Date(),
      deliveredAt: new Date(),
    })
  }
}
