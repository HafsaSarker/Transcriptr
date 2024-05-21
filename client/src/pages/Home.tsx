import Upload from "../components/Upload";

function Home() {
  return (
    <div className="flex flex-col w-full h-full items-start justify-center px-20">
      <h6 className="py-2 text-sm">Start By Pasting A Video URL</h6>
      <Upload />
    </div>
  );
}

export default Home;
