import { S3Client } from "@aws-sdk/client-s3"

const requiredEnv = (key: string) => {
  const value = process.env[key]
  if (!value) {
    throw new Error(`Missing required environment variable: ${key}`)
  }
  return value
}

const region = requiredEnv("AWS_REGION")

export const studioBucket = requiredEnv("STUDIO_IMAGES_BUCKET")
export const studioBucketPrefix = process.env.STUDIO_IMAGES_PREFIX || "images/chiefmedia/studios/"

export const s3Client = new S3Client({
  region,
  credentials: {
    accessKeyId: requiredEnv("AWS_ACCESS_KEY_ID"),
    secretAccessKey: requiredEnv("AWS_SECRET_ACCESS_KEY"),
  },
})



