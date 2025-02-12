import { Module } from '@nestjs/common'
import { PrismaService } from './prisma/prisma.service'
import { DeliveryManRepository } from 'src/domain/repositories/delivery-man-repository'
import { PrismaDeliveryManRepository } from './prisma/repository/prisma-delivery-man-repository'

@Module({
  providers: [
    PrismaService,
    {
      provide: DeliveryManRepository,
      useClass: PrismaDeliveryManRepository,
    },
  ],
  exports: [DeliveryManRepository],
})
export class DatabaseModule {}
