import { Order, Prisma } from '@prisma/client'

export abstract class OrdersRepository {
  abstract create(order: Prisma.OrderUncheckedCreateInput): Promise<Order>
  abstract update(order: Order): Promise<Order>
  abstract findById(orderId: string): Promise<Order | null>
  abstract findManyByUserId(
    userId: string,
    page: number,
    limit: number,
    status: 'onGoing' | 'done',
  ): Promise<Order[] | null>
}
