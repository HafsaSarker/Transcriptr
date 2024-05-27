import { Request, Response } from "express";

async function summarize(req: Request, res: Response) {
  const { transcripts } = req.body;

  if (!transcripts) {
    return res.status(400).json({ error: "Transcripts is required" });
  }

  try {
    const module = await import("@huggingface/inference");
    const inference = new module.HfInference(process.env.HF_TOKEN);
    const inputs: string = transcripts
      .map((item: { time: string; transcript: string }) => item.transcript)
      .join(" ");

    const result = await inference.summarization({
      model: "sshleifer/distilbart-cnn-12-6",
      inputs,
    });

    return res.status(200).json({ result });
  } catch (error) {
    let message = "Server Error";
    if (error instanceof Error) message = error.message;
    res.status(500).json({ error: message });
  }
}

export const summarizeController = {
  summarize,
};
