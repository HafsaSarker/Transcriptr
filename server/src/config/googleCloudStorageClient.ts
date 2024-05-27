import { Storage } from "@google-cloud/storage";

export async function initializeStorageClient(): Promise<{
  storageClient: Storage;
  bucketName: string;
}> {
  const bucketName = process.env.GOOGLE_CLOUD_STORAGE_BUCKET;

  if (!bucketName) {
    throw new Error(
      "GOOGLE_CLOUD_STORAGE_BUCKET environment variable is not set"
    );
  }

  // Create and return the Storage client
  const storageClient = new Storage({
    keyFilename: "./speech-auth.json",
  });
  return { storageClient, bucketName };
}
