import { Body, Controller, HttpCode, Post, UsePipes } from '@nestjs/common'
import { ZodValidationPipe } from 'src/pipes/zod-validation-pipe'
import { RegisterAccountUseCase } from 'src/use-cases/register-account-use-case'
import { z } from 'zod'

const registerAccountBodySchema = z.object({
  name: z.string(),
  email: z.string().email(),
  password: z.string(),
  cpf: z.string(),
  role: z.enum(['deliveryMan', 'admin']).default('deliveryMan'),
})

type RegisterAccountBodySchema = z.infer<typeof registerAccountBodySchema>

@Controller()
export class RegisterAccountController {
  constructor(private registerAccountUseCase: RegisterAccountUseCase) {}

  @Post('/accounts')
  @HttpCode(201)
  @UsePipes(new ZodValidationPipe(registerAccountBodySchema))
  async handle(
    @Body() { name, email, password, cpf, role }: RegisterAccountBodySchema,
  ): Promise<void> {
    await this.registerAccountUseCase.execute({
      name,
      email,
      cpf,
      password,
      role,
    })
  }
}
