import { InMemoryDeliveryManRepository } from '../in-memory-repositories/in-memory-delivery-man-repository'
import { InMemoryHashRepository } from '../in-memory-repositories/in-memory-hash-repository'
import { RegisterDeliveryManUseCase } from './register-delivery-man'

describe('Register Delivery Man', () => {
  let sut: RegisterDeliveryManUseCase
  let inMemoryDeliveryManRepository: InMemoryDeliveryManRepository
  let inMemoryHashRepository: InMemoryHashRepository

  beforeEach(() => {
    inMemoryDeliveryManRepository = new InMemoryDeliveryManRepository()
    inMemoryHashRepository = new InMemoryHashRepository()
    sut = new RegisterDeliveryManUseCase(
      inMemoryDeliveryManRepository,
      inMemoryHashRepository,
    )
  })

  it('should be able to register a new delivery man', async () => {
    const result = await sut.execute({
      name: 'John Doe',
      email: 'johndoe@example.com',
      cpf: '12312312312',
      password: '123456',
    })

    expect(result).toEqual({
      deliveryMan: inMemoryDeliveryManRepository.items[0],
    })
  })

  it('should password be hashed', async () => {
    await sut.execute({
      name: 'John Doe',
      email: 'johndoe@example.com',
      cpf: '12312312312',
      password: '123456',
    })

    const fakePasswordHashed = inMemoryHashRepository.hash('123456')

    expect(inMemoryDeliveryManRepository.items[0].password).toEqual(
      fakePasswordHashed,
    )
  })
})
