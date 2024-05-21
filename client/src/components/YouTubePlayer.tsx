import ReactPlayer from "react-player";
import { Itranscript } from "../types/transcriptTypes";

interface YouTubePlayerProps {
  url: string;
  transcript: Itranscript[] | null;
}

function YouTubePlayer({ url, transcript }: YouTubePlayerProps) {
  return (
    <div className="h-3/6 flex flex-row gap-5 items-start justify-center w-full">
      <div className="h-full flex flex-row gap-5 items-start justify-center max-w-[500px]">
        <ReactPlayer
          url={url}
          controls={true}
          width="100%"
          height="100%"
          loop={false}
        />
      </div>

      <div className="h-full flex flex-col gap-1 overflow-y-auto max-w-[500px]">
        {transcript &&
          transcript.map((item, index) => (
            <div
              key={index}
              className="flex justify-start gap-2 items-start text-sm"
            >
              <span className=" bg-mid-purple bg-opacity-30 text-mid-purple text-xs p-0.5 rounded-sm">
                {item.time}
              </span>
              <p>{item.transcript}</p>
            </div>
          ))}
      </div>
    </div>
  );
}

export default YouTubePlayer;
