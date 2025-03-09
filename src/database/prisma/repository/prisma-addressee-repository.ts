import { Prisma, Addressee } from '@prisma/client'
import { AddresseeRepository } from 'src/repositories/addressee-repository'
import { PrismaService } from '../prisma.service'
import { Injectable } from '@nestjs/common'

@Injectable()
export class PrismaAddresseeRepository implements AddresseeRepository {
  constructor(private prisma: PrismaService) {}

  async create(
    addressee: Prisma.AddresseeUncheckedCreateInput,
  ): Promise<Addressee> {
    const addresseeCreated = await this.prisma.addressee.create({
      data: {
        name: addressee.name,
        Address: addressee.Address,
        Order: addressee.Order,
      },
    })

    return addresseeCreated
  }

  async findByName(name: string): Promise<Addressee | null> {
    const addressee = await this.prisma.addressee.findUnique({
      where: {
        name,
      },
    })

    if (!addressee) {
      return null
    }

    return addressee
  }

  async findById(addresseeId: string): Promise<Addressee | null> {
    const addressee = await this.prisma.addressee.findUnique({
      where: {
        id: addresseeId,
      },
    })

    if (!addressee) {
      return null
    }

    return addressee
  }
}
