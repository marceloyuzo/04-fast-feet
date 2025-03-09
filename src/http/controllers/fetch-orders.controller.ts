import {
  Controller,
  Get,
  HttpCode,
  Param,
  Query,
  UsePipes,
} from '@nestjs/common'
import { ZodValidationPipe } from 'src/pipes/zod-validation-pipe'
import { FetchOrdersUseCase } from 'src/use-cases/fetch-orders-use-case'
import { z } from 'zod'

const fetchOrdersParamSchema = z.object({
  userId: z.string().uuid(),
})

const fetchOrdersQuerySchema = z.object({
  limit: z.string().optional().default('10').transform(Number),
  offset: z.string().optional().default('0').transform(Number),
})

type FetchOrdersParamSchema = z.infer<typeof fetchOrdersParamSchema>
type FetchOrdersQuerySchema = z.infer<typeof fetchOrdersQuerySchema>

@Controller('order')
export class FetchOrdersController {
  constructor(private fetchOrdersUseCase: FetchOrdersUseCase) {}

  @Get('/user/:userId')
  @HttpCode(200)
  @UsePipes(new ZodValidationPipe(fetchOrdersParamSchema))
  @UsePipes(new ZodValidationPipe(fetchOrdersQuerySchema))
  async handle(
    @Param() { userId }: FetchOrdersParamSchema,
    @Query() { limit, offset }: FetchOrdersQuerySchema,
  ) {
    const orders = await this.fetchOrdersUseCase.execute({
      userId,
    })
  }
}
