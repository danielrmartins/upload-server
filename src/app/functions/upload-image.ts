import { Readable } from 'node:stream'
import { db } from '@/infra/db'
import { schema } from '@/infra/db/schemas'
import { z } from 'zod'

const uploadImageInput = z.object({
  fileName: z.string(),
  contentType: z.string(),
  contentStream: z.instanceof(Readable),
})

type UploadImageInput = z.infer<typeof uploadImageInput>

const ALLOWED_CONTENT_TYPES = [
  'image/jpeg',
  'image/jpg',
  'image/png',
  'image/webp',
]

export async function uploadImage(input: UploadImageInput) {
  const { fileName, contentType, contentStream } = uploadImageInput.parse(input)

  if (!ALLOWED_CONTENT_TYPES.includes(contentType)) {
    throw new Error('Invalid content type')
  }

  // TODO: carregar a imagem p/ o Cloudflare R2

  await db.insert(schema.uploads).values({
    name: fileName,
    remoteKey: fileName,
    remoteUrl: fileName,
  })
}
