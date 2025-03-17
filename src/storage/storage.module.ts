import { Module } from '@nestjs/common'
import { R2Storage } from './r2-storage'
import { Uploader } from 'src/repositories/uploader'

@Module({
  providers: [
    {
      provide: Uploader,
      useClass: R2Storage,
    },
  ],
  exports: [Uploader],
})
export class StorageModule {}
