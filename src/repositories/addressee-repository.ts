import { Addressee, Prisma } from '@prisma/client'

export abstract class AddresseeRepository {
  abstract create(
    addressee: Prisma.AddresseeUncheckedCreateInput,
  ): Promise<Addressee>

  abstract findByName(name: string): Promise<Addressee | null>
  abstract findById(addresseeId: string): Promise<Addressee | null>
}
