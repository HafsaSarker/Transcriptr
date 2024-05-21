import { useState } from "react";
import Upload from "../components/Upload";
import { Itranscript } from "../types/transcriptTypes";
import YouTubePlayer from "../components/YouTubePlayer";
import Loader from "../components/Loader";

function Home() {
  const [transcript, setTranscript] = useState<Itranscript[] | null>(null);
  const [showPrev, setShowPrev] = useState<boolean>(false);
  const [link, setlink] = useState<string>("");

  return (
    <div className="flex flex-col w-full h-full items-start justify-center px-20">
      <h6 className="py-2 text-sm">Start By Pasting A Video URL</h6>
      <Upload
        link={link}
        setShowPrev={setShowPrev}
        setlink={setlink}
        setTranscript={setTranscript}
      />

      {showPrev && !transcript && <Loader />}
      {showPrev && transcript && (
        <YouTubePlayer url={link} transcript={transcript} />
      )}
    </div>
  );
}

export default Home;
