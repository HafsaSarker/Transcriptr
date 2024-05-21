import { protos } from "@google-cloud/speech";

export const transcribeWithTimestamps = (
  response: protos.google.cloud.speech.v1.ILongRunningRecognizeResponse
): {
  time: string;
  transcript: string;
}[] => {
  const interval = 4; // Interval length in seconds
  let currentTime = 0;
  let currentTranscript = "";
  const transcriptWithTimestamps: { time: string; transcript: string }[] = [];

  response.results.forEach((result) => {
    result.alternatives[0].words.forEach((wordInfo) => {
      const startSecs = parseFloat(
        `${wordInfo.startTime?.seconds ?? 0}` +
          `.${(wordInfo.startTime?.nanos ?? 0) / 1e6}`
      );

      // Check if the word's start time exceeds the current interval
      if (startSecs >= currentTime + interval) {
        if (currentTranscript.trim().length > 0) {
          transcriptWithTimestamps.push({
            time: `${Math.floor(currentTime / 60)
              .toString()
              .padStart(2, "0")}:${(currentTime % 60)
              .toString()
              .padStart(2, "0")}`,
            transcript: currentTranscript.trim(),
          });
        }
        currentTime = Math.floor(startSecs / interval) * interval;
        currentTranscript = "";
      }
      currentTranscript += `${wordInfo.word} `;
    });
  });

  // Push the last chunk if any words are left
  if (currentTranscript.trim().length > 0) {
    transcriptWithTimestamps.push({
      time: `${Math.floor(currentTime / 60)
        .toString()
        .padStart(2, "0")}:${(currentTime % 60).toString().padStart(2, "0")}`,
      transcript: currentTranscript.trim(),
    });
  }

  return transcriptWithTimestamps;
};
