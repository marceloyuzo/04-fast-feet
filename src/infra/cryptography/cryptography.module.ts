import { Module } from '@nestjs/common'
import { HashRepository } from 'src/domain/repositories/hash-repository'
import { BcryptHasher } from './bcrypt-hasher'

@Module({
  providers: [
    {
      provide: HashRepository,
      useClass: BcryptHasher,
    },
  ],
  exports: [HashRepository],
})
export class CryptographyModule {}
