import { SpeechClient } from "@google-cloud/speech";

export async function initializeSpeechClient(): Promise<SpeechClient> {
  // Create and return the SpeechClient
  const speechClient = new SpeechClient({
    keyFilename: "./google-auth.json",
  });
  return speechClient;
}
