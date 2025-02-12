import { Injectable } from '@nestjs/common'
import { DeliveryMan } from '../entities/delivery-man'
import { DeliveryManRepository } from '../repositories/delivery-man-repository'
import { HashRepository } from '../repositories/hash-repository'

interface RegisterDeliveryManUseCaseRequest {
  name: string
  email: string
  cpf: string
  password: string
}

interface RegisterDeliveryManUseCaseResponse {
  deliveryMan: DeliveryMan
}

@Injectable()
export class RegisterDeliveryManUseCase {
  constructor(
    private deliveryManRepository: DeliveryManRepository,
    private hashRepository: HashRepository,
  ) {}

  async execute({
    cpf,
    email,
    name,
    password,
  }: RegisterDeliveryManUseCaseRequest): Promise<RegisterDeliveryManUseCaseResponse> {
    const isThisEmailAlreadyRegister =
      await this.deliveryManRepository.findByEmail(email)

    if (isThisEmailAlreadyRegister) {
      throw new Error('Esse email ja está cadastrado no sistema.')
    }

    const isThisCpfAlreadyRegister =
      await this.deliveryManRepository.findByCpf(cpf)

    if (isThisCpfAlreadyRegister) {
      throw new Error('Esse cpf ja está cadastrado no sistema.')
    }

    const passwordHashed = await this.hashRepository.hash(password)

    const deliveryMan = DeliveryMan.create({
      cpf,
      email,
      name,
      password: passwordHashed,
    })

    await this.deliveryManRepository.create(deliveryMan)

    return {
      deliveryMan,
    }
  }
}
