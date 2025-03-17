import { Injectable } from '@nestjs/common'
import { Prisma, Attachment } from '@prisma/client'
import { AttachmentsRepository } from 'src/repositories/attachments-repository'
import { PrismaService } from '../prisma.service'

@Injectable()
export class PrismaAttachmentsRepository implements AttachmentsRepository {
  constructor(private prisma: PrismaService) {}

  async create(
    attachment: Prisma.AttachmentUncheckedCreateInput,
  ): Promise<Attachment> {
    const attachmentCreated = await this.prisma.attachment.create({
      data: attachment,
    })

    return attachmentCreated
  }

  async findByIds(attachmentIds: string[]): Promise<Attachment[] | []> {
    const attachments = await this.prisma.attachment.findMany({
      where: {
        id: { in: attachmentIds },
      },
    })

    return attachments
  }

  async update(
    attachmentIds: string[],
    orderId: string,
  ): Promise<Attachment[] | []> {
    const attachments = await this.prisma.attachment.updateManyAndReturn({
      where: {
        id: { in: attachmentIds },
      },
      data: {
        orderId,
      },
    })

    return attachments
  }
}
