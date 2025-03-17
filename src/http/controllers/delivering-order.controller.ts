import { Body, Controller, Patch, UseGuards, UsePipes } from '@nestjs/common'
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard'
import { Roles } from 'src/auth/roles.decorator'
import { ZodValidationPipe } from 'src/pipes/zod-validation-pipe'
import { DeliveringOrderUseCase } from 'src/use-cases/delivering-order-use-case'
import { z } from 'zod'

const deliveringOrderBodySchema = z.object({
  orderId: z.string(),
  userId: z.string(),
  attachments: z.array(z.string().uuid()),
})

type DeliveringOrderBodySchema = z.infer<typeof deliveringOrderBodySchema>

@Controller('order')
@Roles('deliveryMan')
@UseGuards(JwtAuthGuard)
export class DeliveringOrderController {
  constructor(private deliveringOrderUseCase: DeliveringOrderUseCase) {}

  @Patch('/delivering')
  @UsePipes(new ZodValidationPipe(deliveringOrderBodySchema))
  async handle(
    @Body() { orderId, userId, attachments }: DeliveringOrderBodySchema,
  ) {
    await this.deliveringOrderUseCase.execute({
      orderId,
      userId,
      attachmentsIds: attachments,
    })
  }
}
