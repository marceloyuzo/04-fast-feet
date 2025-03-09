import {
  Body,
  Controller,
  HttpCode,
  Post,
  UseGuards,
  UsePipes,
} from '@nestjs/common'
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard'
import { Roles } from 'src/auth/roles.decorator'
import { ZodValidationPipe } from 'src/pipes/zod-validation-pipe'
import { CreateOrderUseCase } from 'src/use-cases/create-order-use-case'
import { z } from 'zod'

const registerOrderBodySchema = z.object({
  addresseeId: z.string(),
})

type RegisterOrderBodySchema = z.infer<typeof registerOrderBodySchema>

@Controller('order')
@Roles('admin')
@UseGuards(JwtAuthGuard)
export class RegisterOrderController {
  constructor(private createOrderUseCase: CreateOrderUseCase) {}

  @Post('/create')
  @HttpCode(201)
  @UsePipes(new ZodValidationPipe(registerOrderBodySchema))
  async handle(@Body() { addresseeId }: RegisterOrderBodySchema) {
    await this.createOrderUseCase.execute({
      addresseeId,
    })
  }
}
