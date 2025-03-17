import { Controller, Get, HttpCode, Param, Query } from '@nestjs/common'
import { ZodValidationPipe } from 'src/pipes/zod-validation-pipe'
import { FetchOrdersUseCase } from 'src/use-cases/fetch-orders-use-case'
import { z } from 'zod'

const fetchOrdersParamSchema = z.object({
  userId: z.string().uuid(),
})

const fetchOrdersQuerySchema = z.object({
  page: z.string().optional().default('1').transform(Number),
  limit: z.string().optional().default('10').transform(Number),
  status: z.enum(['onGoing', 'done']),
})

type FetchOrdersParamSchema = z.infer<typeof fetchOrdersParamSchema>
type FetchOrdersQuerySchema = z.infer<typeof fetchOrdersQuerySchema>

@Controller('order')
export class FetchOrdersController {
  constructor(private fetchOrdersUseCase: FetchOrdersUseCase) {}

  @Get('/user/:userId')
  @HttpCode(200)
  async handle(
    @Param(new ZodValidationPipe(fetchOrdersParamSchema))
    { userId }: FetchOrdersParamSchema,
    @Query(new ZodValidationPipe(fetchOrdersQuerySchema))
    { page, limit, status }: FetchOrdersQuerySchema,
  ) {
    const orders = await this.fetchOrdersUseCase.execute({
      userId,
      page,
      limit,
      status,
    })

    return {
      orders,
    }
  }
}
