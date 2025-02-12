export abstract class HashRepository {
  abstract hash(word: string): Promise<string>
}
