import { ConflictException, Injectable } from '@nestjs/common'
import { Addressee } from '@prisma/client'
import { AddresseeRepository } from 'src/repositories/addressee-repository'

interface RegisterAddresseeUseCaseBody {
  name: string
}

@Injectable()
export class RegisterAddresseeUseCase {
  constructor(private addresseeRepository: AddresseeRepository) {}

  async execute({ name }: RegisterAddresseeUseCaseBody): Promise<Addressee> {
    const isAddresseeAlreadyExists =
      await this.addresseeRepository.findByName(name)

    if (isAddresseeAlreadyExists) {
      throw new ConflictException('Um destinatário com esse nome já existe.')
    }

    const addressee = await this.addresseeRepository.create({ name })

    return addressee
  }
}
