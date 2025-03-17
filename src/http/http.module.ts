import { Module } from '@nestjs/common'
import { DatabaseModule } from '../database/database.module'
import { RegisterAccountUseCase } from 'src/use-cases/register-account-use-case'
import { AuthenticateAccountController } from './controllers/authenticate-account.controller'
import { AuthenticateAccountUseCase } from 'src/use-cases/authenticate-account-use-case'
import { AuthModule } from 'src/auth/auth.module'
import { RegisterAccountController } from './controllers/register-account.controller'
import { RegisterAddresseeController } from './controllers/register-addressee.controller'
import { RegisterAddresseeUseCase } from 'src/use-cases/register-addressee-use-case'
import { RegisterAddressUseCase } from 'src/use-cases/register-address-use-case'
import { RegisterOrderController } from './controllers/register-order.controller'
import { CreateOrderUseCase } from 'src/use-cases/create-order-use-case'
import { PickingUpOrderController } from './controllers/picking-up-order.controller'
import { PickingUpOrderUseCase } from 'src/use-cases/picking-up-order-use-case'
import { ReturningOrderController } from './controllers/returning-order.controller'
import { ReturningOrderUseCase } from 'src/use-cases/returning-order-use-case'
import { DeliveringOrderController } from './controllers/delivering-order.controller'
import { DeliveringOrderUseCase } from 'src/use-cases/delivering-order-use-case'
import { FetchOrdersController } from './controllers/fetch-orders.controller'
import { FetchOrdersUseCase } from 'src/use-cases/fetch-orders-use-case'
import { UploadAttachmentController } from './controllers/upload-attachment.controller'
import { StorageModule } from 'src/storage/storage.module'
import { UploadAndCreateAttachmentUseCase } from 'src/use-cases/upload-and-create-attachment-use-case'

@Module({
  imports: [DatabaseModule, AuthModule, StorageModule],
  controllers: [
    RegisterAccountController,
    AuthenticateAccountController,
    RegisterAddresseeController,
    RegisterOrderController,
    PickingUpOrderController,
    ReturningOrderController,
    DeliveringOrderController,
    FetchOrdersController,
    UploadAttachmentController,
  ],
  providers: [
    RegisterAccountUseCase,
    AuthenticateAccountUseCase,
    RegisterAddresseeUseCase,
    RegisterAddressUseCase,
    CreateOrderUseCase,
    PickingUpOrderUseCase,
    ReturningOrderUseCase,
    DeliveringOrderUseCase,
    FetchOrdersUseCase,
    UploadAndCreateAttachmentUseCase,
  ],
})
export class HttpModule {}
