import { Injectable } from '@nestjs/common'
import { AttachmentsRepository } from 'src/repositories/attachments-repository'
import { Uploader } from 'src/repositories/uploader'

interface UploadAndCreateAttachmentUseCaseRequest {
  fileName: string
  fileType: string
  body: Buffer
}

@Injectable()
export class UploadAndCreateAttachmentUseCase {
  constructor(
    private uploader: Uploader,
    private attachmentsRepository: AttachmentsRepository,
  ) {}

  async execute({
    body,
    fileName,
    fileType,
  }: UploadAndCreateAttachmentUseCaseRequest) {
    if (!/^(image\/(jpeg|png))$|^application\/pdf$/.test(fileType)) {
      throw new Error('Invalid type file.')
    }

    const { url } = await this.uploader.upload({
      body,
      fileName,
      fileType,
    })

    const attachment = await this.attachmentsRepository.create({
      title: fileName,
      url,
    })

    return {
      attachment,
    }
  }
}
