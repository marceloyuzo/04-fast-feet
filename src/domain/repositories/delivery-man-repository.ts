import { DeliveryMan } from '../entities/delivery-man'

export abstract class DeliveryManRepository {
  abstract create(deliveryMan: DeliveryMan): Promise<void>
  abstract findByEmail(email: string): Promise<DeliveryMan | null>
  abstract findByCpf(cpf: string): Promise<DeliveryMan | null>
}
