import axios from "axios";
import { ChangeEvent, FormEvent } from "react";
import { FiUpload } from "react-icons/fi";
import { Itranscript } from "../types/transcriptTypes";

interface UploadProps {
  link: string;
  setlink: React.Dispatch<React.SetStateAction<string>>;
  setTranscript: React.Dispatch<React.SetStateAction<Itranscript[] | null>>;
  setShowLoader: React.Dispatch<React.SetStateAction<boolean>>;
  setSummary: React.Dispatch<React.SetStateAction<string | null>>;
}

function Upload({
  link,
  setlink,
  setTranscript,
  setShowLoader,
  setSummary,
}: UploadProps) {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setlink(e.target.value);
    setTranscript(null);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // incase user does ctrl+a ctrl+v
    setTranscript(null);
    setShowLoader(true);

    try {
      const transcriptResponse = await axios.post(
        "http://localhost:8080/api/transcribe",
        { link }
      );
      const transcriptData = transcriptResponse.data.transcriptWithTimestamps;
      setTranscript(transcriptData);

      const summaryResponse = await axios.post(
        "http://localhost:8080/api/summarize",
        { transcripts: transcriptData }
      );
      const summaryData = summaryResponse.data.result.summary_text;
      setSummary(summaryData);
    } catch (error) {
      console.error("Error occurred:", error);
    } finally {
      setShowLoader(false);
    }
  };
  return (
    <>
      <form onSubmit={handleSubmit} className="w-full max-w-[700px] pb-4">
        <label className="input input-bordered flex items-center flex-wrap">
          <input
            onChange={handleChange}
            type="text"
            className="grow"
            placeholder="Enter video link"
            name="link"
          />
          <button className="opacity-70 cursor-pointer">
            <FiUpload />
          </button>
        </label>
      </form>
    </>
  );
}

export default Upload;
