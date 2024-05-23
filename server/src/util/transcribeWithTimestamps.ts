import { protos } from "@google-cloud/speech";

export const transcribeWithTimestamps = (
  response: protos.google.cloud.speech.v1.ILongRunningRecognizeResponse
): {
  time: string;
  transcript: string;
}[] => {
  let currentInterval = 3;
  let accumulatedWords: string[] = [];
  let intervalStart = 0;
  const transcriptWithTimestamps: { time: string; transcript: string }[] = [];

  response.results.forEach((result) => {
    result.alternatives[0].words.forEach((wordInfo) => {
      // Calculate the start and end times in seconds
      const startSecs = parseFloat(
        `${wordInfo.startTime.seconds}` +
          "." +
          wordInfo.startTime.nanos / 100000000
      );

      // Check if the word's start time falls within the current interval
      if (startSecs < currentInterval) {
        accumulatedWords.push(wordInfo.word);
      } else {
        // Save the accumulated words for the current interval
        transcriptWithTimestamps.push({
          time: intervalStart.toFixed(2),
          transcript: accumulatedWords.join(" "),
        });

        // Move to the next interval
        intervalStart = currentInterval;
        currentInterval += 3;
        accumulatedWords = [wordInfo.word];
      }
    });
  });

  // Save any remaining words in the last interval
  if (accumulatedWords.length > 0) {
    transcriptWithTimestamps.push({
      time: intervalStart.toFixed(2),
      transcript: accumulatedWords.join(" "),
    });
  }

  return transcriptWithTimestamps;
};
