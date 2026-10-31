import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

export type SignedUpload = { key: string; uploadUrl: string; expiresInSeconds: number };
export interface ObjectStorage { createUploadUrl(input: { key: string; contentType: string }): Promise<SignedUpload>; }

const endpoint = process.env.AWS_ENDPOINT_URL_S3;
const client = endpoint && process.env.AWS_ACCESS_KEY_ID && process.env.AWS_SECRET_ACCESS_KEY
  ? new S3Client({ endpoint, region: process.env.AWS_REGION ?? "us-east-2", forcePathStyle: true, credentials: { accessKeyId: process.env.AWS_ACCESS_KEY_ID, secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY } })
  : null;
const bucket = process.env.NEON_OBJECT_STORAGE_BUCKET ?? "assets";

export class NeonObjectStorage implements ObjectStorage {
  async createUploadUrl(input: { key: string; contentType: string }): Promise<SignedUpload> {
    if (!client) throw new Error("OBJECT_STORAGE_NOT_CONFIGURED");
    const url = await getSignedUrl(client, new PutObjectCommand({ Bucket: bucket, Key: input.key, ContentType: input.contentType }), { expiresIn: 600 });
    return { key: input.key, uploadUrl: url, expiresInSeconds: 600 };
  }
}
export const objectStorage: ObjectStorage = new NeonObjectStorage();
