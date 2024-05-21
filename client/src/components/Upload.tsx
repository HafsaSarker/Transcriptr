import axios from "axios";
import { ChangeEvent, FormEvent } from "react";
import { FiUpload } from "react-icons/fi";
import { Itranscript } from "../types/transcriptTypes";

interface UploadProps {
  link: string;
  setShowPrev: React.Dispatch<React.SetStateAction<boolean>>;
  setlink: React.Dispatch<React.SetStateAction<string>>;
  setTranscript: React.Dispatch<React.SetStateAction<Itranscript[] | null>>;
}

function Upload({ link, setShowPrev, setlink, setTranscript }: UploadProps) {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setlink(e.target.value);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setShowPrev(true);
    const res = await axios.post("http://localhost:8080/api/transcribe", {
      link,
    });

    setTranscript(res.data.transcriptWithTimestamps);
  };
  return (
    <>
      <form onSubmit={handleSubmit} className="w-full pb-4">
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
