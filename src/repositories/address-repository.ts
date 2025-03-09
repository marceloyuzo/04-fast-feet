import { Address, Prisma } from '@prisma/client'

export abstract class AddressRepository {
  abstract create(address: Prisma.AddressUncheckedCreateInput): Promise<Address>
}
