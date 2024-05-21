import axios from "axios";
import { ChangeEvent, FormEvent, useState } from "react";
import { FiUpload } from "react-icons/fi";

function Upload() {
  const [link, setlink] = useState<string>("");
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setlink(e.target.value);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const res = await axios.post("http://localhost:8080/api/transcribe", {
      link,
    });

    console.log(res.data);
  };
  return (
    <form onSubmit={handleSubmit} className="w-full">
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
  );
}

export default Upload;
