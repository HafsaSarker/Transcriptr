import { Request, Response } from "express";
import ytdl from "ytdl-core";
import fs from "fs";
import { initializeSpeechClient } from "../config/googleCloudClient";
import { protos } from "@google-cloud/speech";
import { transcribeWithTimestamps } from "../util/transcribeWithTimestamps";

const ffmpegPath = require("@ffmpeg-installer/ffmpeg").path;
import ffmpeg from "fluent-ffmpeg";

ffmpeg.setFfmpegPath(ffmpegPath);

export async function transcribe(req: Request, res: Response) {
  try {
    const { link } = req.body;
    const speechClient = await initializeSpeechClient();

    if (ytdl.validateURL(link)) {
      // download vid
      ytdl(link, { quality: "highestaudio" })
        // create writable stream
        // write data (output of ytdl) to "video.mp4" file
        .pipe(fs.createWriteStream("video.mp4"))
        .on("finish", () => {
          // convert mp4 to WAV
          ffmpeg("video.mp4")
            .audioFrequency(16000)
            .audioChannels(1)
            .toFormat("wav")
            .save("audio.wav")
            .on("end", async () => {
              // convert audio to Base64-encoded string
              const audio = {
                content: fs.readFileSync("audio.wav").toString("base64"),
              };
              const request: protos.google.cloud.speech.v1.IRecognizeRequest = {
                audio,
                config: {
                  enableWordTimeOffsets: true,
                  enableAutomaticPunctuation: true,
                  encoding: "LINEAR16",
                  sampleRateHertz: 16000,
                  languageCode: "en-US",
                },
              };

              const [operation] = await speechClient.longRunningRecognize(
                request
              );

              const [response] = await operation.promise();

              // Process the response to extract the transcript with timestamps
              let transcriptWithTimestamps = transcribeWithTimestamps(response);

              return res.status(200).json({ transcriptWithTimestamps });
            });
        });
    } else {
      res.status(404).json({ message: "Invalid Link" });
    }
  } catch (error) {
    let message = "Server Error";
    if (error instanceof Error) message = error.message;
    res.status(500).json({ error: message });
  }
}

export const transcribeController = {
  transcribe,
};
