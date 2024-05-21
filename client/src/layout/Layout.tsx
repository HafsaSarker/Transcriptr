import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";

export default function Layout() {
  return (
    <div>
      <div
        data-theme="dark"
        className="h-screen w-screen flex flex-col items-start justify-start"
      >
        <div className="w-screen">
          <Navbar />
        </div>
        <Outlet />
      </div>
    </div>
  );
}
