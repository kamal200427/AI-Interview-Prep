import { Link, NavLink } from "react-router-dom";
import {
  LayoutGrid,
  BookOpen,
  ClipboardList,
  FolderOpen,
  MessagesSquare,
  Code2,
} from "lucide-react";

export default function Sidebar() {
  return (
    <aside className="sidebar">
      <div className="side-course">
        <span className="ic">
          <Code2 size={18} />
        </span>
        <div>
          <div className="t">Web Development</div>
          <div className="s">Full Stack Track</div>
        </div>
      </div>

      <nav className="side-nav">
        <NavLink to="/dashboard">
          <LayoutGrid size={17} /> Overview
        </NavLink>
        <NavLink to="/course">
          <BookOpen size={17} /> Modules
        </NavLink>
        <NavLink to="/exam">
          <ClipboardList size={17} /> Assignments/Moodle Test
        </NavLink>
        <NavLink to="/library">
          <FolderOpen size={17} /> Resources
        </NavLink>
        <NavLink to="/interview">
          <MessagesSquare size={17} /> Discussions
        </NavLink>
      </nav>

      <div className="side-foot">
        <Link to="/course" className="btn btn-primary btn-block">
          Resume Learning
        </Link>
      </div>
    </aside>
  );
}
