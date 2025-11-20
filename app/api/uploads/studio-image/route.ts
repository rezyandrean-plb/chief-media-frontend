export const runtime = "nodejs"
export const dynamic = "force-dynamic"

import { NextRequest, NextResponse } from "next/server"
import crypto from "node:crypto"
import { PutObjectCommand } from "@aws-sdk/client-s3"
import { s3Client, studioBucket, studioBucketPrefix } from "@/lib/s3"

const MAX_FILE_SIZE = 5 * 1024 * 1024 // 5MB

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const file = formData.get("file")

    if (!file || !(file instanceof File)) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 })
    }

    if (file.size > MAX_FILE_SIZE) {
      return NextResponse.json({ error: "File exceeds 5MB limit" }, { status: 413 })
    }

    const arrayBuffer = await file.arrayBuffer()
    const buffer = Buffer.from(arrayBuffer)
    const extension = file.name.includes(".") ? file.name.split(".").pop()?.toLowerCase() : undefined
    const safePrefix = studioBucketPrefix.endsWith("/") ? studioBucketPrefix : `${studioBucketPrefix}/`
    const key = `${safePrefix}${new Date().toISOString().split("T")[0]}/${crypto.randomUUID()}${extension ? `.${extension}` : ""}`

    await s3Client.send(
      new PutObjectCommand({
        Bucket: studioBucket,
        Key: key,
        Body: buffer,
        ContentType: file.type || "application/octet-stream",
      }),
    )

    const region = process.env.AWS_REGION || "us-east-1"
    const url = `https://${studioBucket}.s3.${region}.amazonaws.com/${key}`

    return NextResponse.json({ url, key })
  } catch (error) {
    console.error("[studio-image upload] Failed to upload", error)
    return NextResponse.json({ error: "Failed to upload image" }, { status: 500 })
  }
}

