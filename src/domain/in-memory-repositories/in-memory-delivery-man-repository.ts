import { DeliveryMan } from '../entities/delivery-man'
import { DeliveryManRepository } from '../repositories/delivery-man-repository'

export class InMemoryDeliveryManRepository implements DeliveryManRepository {
  public items: DeliveryMan[] = []

  async create(deliveryMan: DeliveryMan) {
    this.items.push(deliveryMan)
  }

  async findByEmail(email: string) {
    const deliveryMan = this.items.find((item) => item.email === email)

    if (!deliveryMan) {
      return null
    }

    return deliveryMan
  }

  async findByCpf(cpf: string): Promise<DeliveryMan | null> {
    const deliveryMan = this.items.find((item) => item.cpf === cpf)

    if (!deliveryMan) {
      return null
    }

    return deliveryMan
  }
}
