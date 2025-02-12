import { Module } from '@nestjs/common'
import { RegisterDeliveryManController } from './controllers/register-delivery-man.controller'
import { RegisterDeliveryManUseCase } from 'src/domain/use-cases/register-delivery-man'
import { DatabaseModule } from '../database/database.module'
import { CryptographyModule } from '../cryptography/cryptography.module'

@Module({
  imports: [DatabaseModule, CryptographyModule],
  controllers: [RegisterDeliveryManController],
  providers: [RegisterDeliveryManUseCase],
})
export class HttpModule {}
