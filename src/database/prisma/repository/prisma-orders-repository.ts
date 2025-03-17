import { Injectable } from '@nestjs/common'
import { Prisma, Order } from '@prisma/client'
import { OrdersRepository } from 'src/repositories/orders-repository'
import { PrismaService } from '../prisma.service'

@Injectable()
export class PrismaOrdersRepository implements OrdersRepository {
  constructor(private prisma: PrismaService) {}

  async create(order: Prisma.OrderUncheckedCreateInput): Promise<Order> {
    const orderCreated = await this.prisma.order.create({
      data: order,
    })

    return orderCreated
  }

  async update(order: Order): Promise<Order> {
    const orderUpdated = await this.prisma.order.update({
      where: {
        id: order.id,
      },
      data: order,
    })

    return orderUpdated
  }

  async findById(orderId: string): Promise<Order | null> {
    const order = await this.prisma.order.findUnique({
      where: {
        id: orderId,
      },
    })

    if (!order) {
      return null
    }

    return order
  }

  async findManyByUserId(
    userId: string,
    page: number,
    limit: number,
    status: 'onGoing' | 'done',
  ): Promise<Order[] | null> {
    const orders = await this.prisma.order.findMany({
      where: {
        userId,
        status:
          status === 'onGoing' ? { in: ['pending', 'pickedUp'] } : 'delivered',
      },
      orderBy: {
        createdAt: 'desc',
      },
      take: limit,
      skip: (page - 1) * limit,
    })

    return orders
  }
}
