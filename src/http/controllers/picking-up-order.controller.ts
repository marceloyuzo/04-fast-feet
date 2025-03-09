import { Body, Controller, Patch, UseGuards, UsePipes } from '@nestjs/common'
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard'
import { Roles } from 'src/auth/roles.decorator'
import { ZodValidationPipe } from 'src/pipes/zod-validation-pipe'
import { PickingUpOrderUseCase } from 'src/use-cases/picking-up-order-use-case'
import { z } from 'zod'

const pickingUpOrderBodySchema = z.object({
  orderId: z.string(),
  userId: z.string(),
})

type PickingUpOrderBodySchema = z.infer<typeof pickingUpOrderBodySchema>

@Controller('order')
// @Roles('deliveryMan')
// @UseGuards(JwtAuthGuard)
export class PickingUpOrderController {
  constructor(private pickingUpOrderUseCase: PickingUpOrderUseCase) {}

  @Patch('/picking-up')
  @UsePipes(new ZodValidationPipe(pickingUpOrderBodySchema))
  async handle(@Body() { orderId, userId }: PickingUpOrderBodySchema) {
    await this.pickingUpOrderUseCase.execute({
      orderId,
      userId,
    })
  }
}
