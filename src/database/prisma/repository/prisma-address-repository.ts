import { Address, Prisma } from '@prisma/client'
import { AddressRepository } from 'src/repositories/address-repository'
import { PrismaService } from '../prisma.service'
import { Injectable } from '@nestjs/common'

@Injectable()
export class PrismaAddressRepository implements AddressRepository {
  constructor(private prisma: PrismaService) {}

  async create(address: Prisma.AddressUncheckedCreateInput): Promise<Address> {
    const addressCreated = await this.prisma.address.create({
      data: address,
    })

    return addressCreated
  }
}
