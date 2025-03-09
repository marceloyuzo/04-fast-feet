import { Module } from '@nestjs/common'
import { PrismaService } from './prisma/prisma.service'
import { UsersRepository } from 'src/repositories/users-repository'
import { PrismaUsersRepository } from './prisma/repository/prisma-users-repository'
import { AddresseeRepository } from 'src/repositories/addressee-repository'
import { PrismaAddresseeRepository } from './prisma/repository/prisma-addressee-repository'
import { AddressRepository } from 'src/repositories/address-repository'
import { PrismaAddressRepository } from './prisma/repository/prisma-address-repository'
import { OrdersRepository } from 'src/repositories/orders-repository'
import { PrismaOrdersRepository } from './prisma/repository/prisma-orders-repository'

@Module({
  providers: [
    PrismaService,
    {
      provide: UsersRepository,
      useClass: PrismaUsersRepository,
    },
    {
      provide: AddresseeRepository,
      useClass: PrismaAddresseeRepository,
    },
    {
      provide: AddressRepository,
      useClass: PrismaAddressRepository,
    },
    {
      provide: OrdersRepository,
      useClass: PrismaOrdersRepository,
    },
  ],
  exports: [
    UsersRepository,
    AddresseeRepository,
    AddressRepository,
    OrdersRepository,
  ],
})
export class DatabaseModule {}
