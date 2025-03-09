import { Injectable } from '@nestjs/common'
import { AddressRepository } from 'src/repositories/address-repository'
import { AddresseeRepository } from 'src/repositories/addressee-repository'

interface RegisterAddressUseCaseBody {
  postalCode: string
  country: string
  state: string
  city: string
  neighborhood: string
  street: string
  number: string
  latitude: number
  longitude: number
  addresseeId: string
}

@Injectable()
export class RegisterAddressUseCase {
  constructor(
    private addressRepository: AddressRepository,
    private addresseeRepository: AddresseeRepository,
  ) {}

  async execute({
    postalCode,
    country,
    state,
    city,
    neighborhood,
    street,
    number,
    latitude,
    longitude,
    addresseeId,
  }: RegisterAddressUseCaseBody) {
    const addresseeExists = await this.addresseeRepository.findById(addresseeId)

    if (!addresseeExists) {
      throw new Error('O destinatário com esse id não existe.')
    }

    const address = await this.addressRepository.create({
      addresseeId,
      city,
      country,
      latitude,
      longitude,
      neighborhood,
      number,
      postalCode,
      state,
      street,
    })

    return address
  }
}
