import { Body, Controller, Patch, UseGuards, UsePipes } from '@nestjs/common'
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard'
import { Roles } from 'src/auth/roles.decorator'
import { ZodValidationPipe } from 'src/pipes/zod-validation-pipe'
import { ReturningOrderUseCase } from 'src/use-cases/returning-order-use-case'
import { z } from 'zod'

const returningOrderBodySchema = z.object({
  orderId: z.string(),
  userId: z.string(),
})

type ReturningOrderBodySchema = z.infer<typeof returningOrderBodySchema>

@Controller('order')
@Roles('deliveryMan')
@UseGuards(JwtAuthGuard)
export class ReturningOrderController {
  constructor(private returningOrderUseCase: ReturningOrderUseCase) {}

  @Patch('/returning')
  @UsePipes(new ZodValidationPipe(returningOrderBodySchema))
  async handle(@Body() { orderId, userId }: ReturningOrderBodySchema) {
    await this.returningOrderUseCase.execute({
      orderId,
      userId,
    })
  }
}
