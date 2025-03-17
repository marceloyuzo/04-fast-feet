import {
  Controller,
  FileTypeValidator,
  MaxFileSizeValidator,
  ParseFilePipe,
  Post,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common'
import { FilesInterceptor } from '@nestjs/platform-express'
import { UploadAndCreateAttachmentUseCase } from 'src/use-cases/upload-and-create-attachment-use-case'

@Controller('/attachments')
export class UploadAttachmentController {
  constructor(
    private uploadAndCreateAttachment: UploadAndCreateAttachmentUseCase,
  ) {}

  @Post()
  @UseInterceptors(FilesInterceptor('files', 10)) // Aceita até 10 arquivos
  async handle(
    @UploadedFiles(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({
            maxSize: 1024 * 1024 * 2, // 2MB
          }),
          new FileTypeValidator({
            fileType: '.(png|jpg|jpeg|pdf)',
          }),
        ],
      }),
    )
    files: Express.Multer.File[],
  ) {
    const attachments = await Promise.all(
      files.map(async (file) => {
        const result = await this.uploadAndCreateAttachment.execute({
          fileName: file.originalname,
          fileType: file.mimetype,
          body: file.buffer,
        })

        return {
          attachmentId: result.attachment.id.toString(),
        }
      }),
    )

    return { attachments }
  }
}
