import { Attachment, Prisma } from '@prisma/client'

export abstract class AttachmentsRepository {
  abstract create(
    attachment: Prisma.AttachmentUncheckedCreateInput,
  ): Promise<Attachment>

  abstract findByIds(attachmentIds: string[]): Promise<Attachment[] | []>

  abstract update(
    attachmentIds: string[],
    orderId: string,
  ): Promise<Attachment[] | []>
}
