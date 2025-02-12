import { HashRepository } from '../repositories/hash-repository'

export class InMemoryHashRepository implements HashRepository {
  async hash(word: string): Promise<string> {
    const hashedPassword = word + '-hashed'

    return hashedPassword
  }
}
