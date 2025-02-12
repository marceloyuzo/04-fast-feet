import { DeliveryMan } from 'src/domain/entities/delivery-man'
import { DeliveryManRepository } from 'src/domain/repositories/delivery-man-repository'
import { PrismaService } from '../prisma.service'
import { Injectable } from '@nestjs/common'

@Injectable()
export class PrismaDeliveryManRepository implements DeliveryManRepository {
  constructor(private prisma: PrismaService) {}

  async create(deliveryMan: DeliveryMan): Promise<void> {
    await this.prisma.deliveryMan.create({
      data: {
        cpf: deliveryMan.cpf,
        email: deliveryMan.email,
        name: deliveryMan.name,
        password: deliveryMan.password,
      },
    })
  }

  async findByEmail(email: string): Promise<DeliveryMan | null> {
    const deliveryMan = await this.prisma.deliveryMan.findUnique({
      where: {
        email,
      },
    })

    if (!deliveryMan) {
      return null
    }

    const deliveryManMapper = DeliveryMan.create(
      {
        cpf: deliveryMan.cpf,
        email: deliveryMan.email,
        name: deliveryMan.name,
        password: deliveryMan.password,
      },
      deliveryMan.id,
    )

    return deliveryManMapper
  }

  async findByCpf(cpf: string): Promise<DeliveryMan | null> {
    const deliveryMan = await this.prisma.deliveryMan.findUnique({
      where: {
        cpf,
      },
    })

    if (!deliveryMan) {
      return null
    }

    const deliveryManMapper = DeliveryMan.create(
      {
        cpf: deliveryMan.cpf,
        email: deliveryMan.email,
        name: deliveryMan.name,
        password: deliveryMan.password,
      },
      deliveryMan.id,
    )

    return deliveryManMapper
  }
}
