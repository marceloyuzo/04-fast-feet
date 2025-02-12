import { Body, Controller, HttpCode, Post } from '@nestjs/common'
import { RegisterDeliveryManUseCase } from 'src/domain/use-cases/register-delivery-man'
import { z } from 'zod'

const RegisterDeliveryManControllerBodySchema = z.object({
  name: z.string(),
  email: z.string().email(),
  password: z.string(),
  cpf: z.string(),
})

type RegisterDeliveryManControllerBody = z.infer<
  typeof RegisterDeliveryManControllerBodySchema
>

@Controller()
export class RegisterDeliveryManController {
  constructor(private registerDeliveryManUseCase: RegisterDeliveryManUseCase) {}

  @Post('/accounts')
  @HttpCode(201)
  async handle(
    @Body() { name, email, password, cpf }: RegisterDeliveryManControllerBody,
  ): Promise<void> {
    const result = await this.registerDeliveryManUseCase.execute({
      name,
      email,
      password,
      cpf,
    })

    if (!result) {
      throw new Error('Erro ao registrar o usuário.')
    }
  }
}
