import { ChangeEvent, FormEvent, useState } from "react";
import { FiUpload } from "react-icons/fi";

function Upload() {
  const [url, setUrl] = useState<string>("");
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setUrl(e.target.value);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(url);
  };
  return (
    <form onSubmit={handleSubmit} className="w-full">
      <label className="input input-bordered flex items-center flex-wrap">
        <input
          onChange={handleChange}
          type="text"
          className="grow"
          placeholder="Enter video link"
        />
        <button className="opacity-70 cursor-pointer">
          <FiUpload />
        </button>
      </label>
    </form>
  );
}

export default Upload;
