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
import { RegisterAddressUseCase } from 'src/use-cases/register-address-use-case'
import { RegisterAddresseeUseCase } from 'src/use-cases/register-addressee-use-case'
import { z } from 'zod'

const registerAddresseeBodySchema = z.object({
  name: z.string(),
  postalCode: z.string(),
  country: z.string(),
  state: z.string(),
  city: z.string(),
  neighborhood: z.string(),
  street: z.string(),
  number: z.string(),
  latitude: z.coerce.number(),
  longitude: z.coerce.number(),
})

type RegisterAddresseeBodySchema = z.infer<typeof registerAddresseeBodySchema>

@Controller()
@Roles('admin')
@UseGuards(JwtAuthGuard)
export class RegisterAddresseeController {
  constructor(
    private registerAddresseeUseCase: RegisterAddresseeUseCase,
    private registerAddressUseCase: RegisterAddressUseCase,
  ) {}

  @Post('/addressee/new')
  @HttpCode(201)
  @UsePipes(new ZodValidationPipe(registerAddresseeBodySchema))
  async handle(
    @Body()
    {
      name,
      postalCode,
      city,
      country,
      latitude,
      longitude,
      neighborhood,
      number,
      state,
      street,
    }: RegisterAddresseeBodySchema,
  ) {
    const addressee = await this.registerAddresseeUseCase.execute({ name })

    await this.registerAddressUseCase.execute({
      addresseeId: addressee.id,
      city,
      country,
      latitude,
      longitude,
      neighborhood,
      number,
      postalCode,
      state,
      street,
    })
  }
}
