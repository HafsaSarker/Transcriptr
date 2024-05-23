import axios from "axios";
import { ChangeEvent, FormEvent } from "react";
import { FiUpload } from "react-icons/fi";
import { Itranscript } from "../types/transcriptTypes";

interface UploadProps {
  link: string;
  setlink: React.Dispatch<React.SetStateAction<string>>;
  setTranscript: React.Dispatch<React.SetStateAction<Itranscript[] | null>>;
  setShowLoader: React.Dispatch<React.SetStateAction<boolean>>;
}

function Upload({ link, setlink, setTranscript, setShowLoader }: UploadProps) {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setlink(e.target.value);
    setTranscript(null);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // incase user does ctrl+a ctrl+v
    setTranscript(null);
    setShowLoader(true);

    const res = await axios.post("http://localhost:8080/api/transcribe", {
      link,
    });

    setTranscript(res.data.transcriptWithTimestamps);

    setShowLoader(false);
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
