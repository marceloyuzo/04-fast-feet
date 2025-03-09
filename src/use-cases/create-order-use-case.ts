import { Injectable, NotFoundException } from '@nestjs/common'
import { AddresseeRepository } from 'src/repositories/addressee-repository'
import { OrdersRepository } from 'src/repositories/orders-repository'

interface CreateOrderUseCaseProps {
  addresseeId: string
}

@Injectable()
export class CreateOrderUseCase {
  constructor(
    private ordersRepository: OrdersRepository,
    private addresseeRepository: AddresseeRepository,
  ) {}

  async execute({ addresseeId }: CreateOrderUseCaseProps) {
    const addresseeExist = await this.addresseeRepository.findById(addresseeId)

    if (!addresseeExist) {
      throw new NotFoundException(
        'O não foi possível encontrar destinatário fornecido.',
      )
    }

    const order = await this.ordersRepository.create({
      addresseeId,
    })

    if (!order) {
      throw new Error('Não foi possível registrar o pedido')
    }

    return order
  }
}
