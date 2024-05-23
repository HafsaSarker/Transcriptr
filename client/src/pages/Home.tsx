import { useState } from "react";
import Upload from "../components/Upload";
import { Itranscript } from "../types/transcriptTypes";
import YouTubePlayer from "../components/YouTubePlayer";
import Loader from "../components/Loader";

function Home() {
  const [transcript, setTranscript] = useState<Itranscript[] | null>(null);
  const [summary, setSummary] = useState<string | null>(null);
  const [link, setlink] = useState<string>("");
  const [showLoader, setShowLoader] = useState<boolean>(false);

  return (
    <div className="flex flex-col w-full h-full items-center  justify-center px-20 overflow-y-auto">
      <h6 className="py-2 text-sm w-full max-w-[700px]">
        Start By Pasting A Video URL
      </h6>
      <Upload
        link={link}
        setlink={setlink}
        setTranscript={setTranscript}
        setShowLoader={setShowLoader}
        setSummary={setSummary}
      />

      {showLoader && <Loader />}
      {transcript && summary && (
        <>
          <YouTubePlayer url={link} transcript={transcript} />

          <div className="max-w-[500px] py-3 flex flex-col items-start justify-center gap-1 w-full">
            <span className="font-semibold">Summary</span>
            <p className="text-sm bg-blue-gray p-1 rounded-md">{summary}</p>
          </div>
        </>
      )}
    </div>
  );
}

export default Home;
