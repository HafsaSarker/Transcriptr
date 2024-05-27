import { SpeechClient } from "@google-cloud/speech";

export async function initializeSpeechClient(): Promise<SpeechClient> {
  // Create and return the SpeechClient
  const speechClient = new SpeechClient({
    keyFilename: "./speech-auth.json",
  });
  return speechClient;
}
