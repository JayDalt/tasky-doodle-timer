import { FolderIcon, ClockIcon, BookOpenIcon } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

export const Sidebar = () => {
  const location = useLocation();
  
  const isActive = (path: string) => location.pathname === path;
  
  return (
    <div className="w-64 h-screen glass fixed left-0 top-0 p-6 animate-slide-in">
      <h1 className="text-2xl font-semibold mb-8">Mindful Tasks</h1>
      <nav className="space-y-2">
        <Link to="/" className={`nav-item flex items-center gap-2 ${isActive("/") ? "bg-primary text-white" : ""}`}>
          <FolderIcon className="w-5 h-5" />
          Projects
        </Link>
        <Link to="/timer" className={`nav-item flex items-center gap-2 ${isActive("/timer") ? "bg-primary text-white" : ""}`}>
          <ClockIcon className="w-5 h-5" />
          Timer
        </Link>
        <Link to="/notes" className={`nav-item flex items-center gap-2 ${isActive("/notes") ? "bg-primary text-white" : ""}`}>
          <BookOpenIcon className="w-5 h-5" />
          Notes
        </Link>
      </nav>
    </div>
  );
};