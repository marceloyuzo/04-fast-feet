import { Injectable } from '@nestjs/common'
import { hash } from 'bcryptjs'
import { HashRepository } from 'src/domain/repositories/hash-repository'

@Injectable()
export class BcryptHasher implements HashRepository {
  private HASH_SALT_LENGTH = 8

  async hash(word: string): Promise<string> {
    const hashedWord = await hash(word, this.HASH_SALT_LENGTH)

    return hashedWord
  }
}
