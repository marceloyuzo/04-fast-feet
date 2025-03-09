import { Body, Controller, HttpCode, Post, UsePipes } from '@nestjs/common'
import { ZodValidationPipe } from 'src/pipes/zod-validation-pipe'
import { AuthenticateAccountUseCase } from 'src/use-cases/authenticate-account-use-case'
import { z } from 'zod'

const authenticateAccountBodySchema = z.object({
  email: z.string().email(),
  password: z.string(),
})

type AuthenticateAccountBodySchema = z.infer<
  typeof authenticateAccountBodySchema
>

interface AuthenticateAccountResponse {
  access_token: string
}

@Controller()
export class AuthenticateAccountController {
  constructor(private authenticateAccountUseCase: AuthenticateAccountUseCase) {}

  @Post('/sessions')
  @HttpCode(200)
  @UsePipes(new ZodValidationPipe(authenticateAccountBodySchema))
  async handle(
    @Body() { email, password }: AuthenticateAccountBodySchema,
  ): Promise<AuthenticateAccountResponse> {
    const { token } = await this.authenticateAccountUseCase.execute({
      email,
      password,
    })

    return {
      access_token: token,
    }
  }
}
