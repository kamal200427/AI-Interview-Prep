import { Link, NavLink } from "react-router-dom";
import {
  User,
  LogOut,
  LayoutGrid,
  BookOpen,
  ClipboardList,
  FolderOpen,
  MessagesSquare,
  Code2,
} from "lucide-react";
import { useEffect,useState } from "react";
import {getSavedRoadmap} from "../services/RoadmapApi";
import {
  useNavigate
} from "react-router-dom";

import {
  getUser
} from "../services/SignInApi";

export default function Sidebar() {
  const navigate =
useNavigate();

const [userData,setUserData] =
useState(null);

const [profession,setProfession] =
useState("");
const [showProfile,setShowProfile] =
useState(false);

const user =
JSON.parse(
  localStorage.getItem("user")
);

  useEffect(() => {

  const loadData =
  async () => {

    try{

      if(!user?.email)
        return;

      const roadmapData =
      await getSavedRoadmap(
        user.email
      );

      setProfession(
        roadmapData.profession
      );

      const profileData =
      await getUser(
        user.email
      );

      setUserData(
        profileData.user
      );

    }
    catch(error){

      console.log(error);

    }
  };

  loadData();

},[]);
const handleLogout = () => {

  localStorage.removeItem(
    "user"
  );

  localStorage.removeItem(
    "isLoggedIn"
  );

  localStorage.removeItem(
    "profession"
  );

  navigate("/");

};
  return (
    <aside className="sidebar">
      <div className="side-course">
        <span className="ic">
          <Code2 size={18} />
        </span>
        <div>
          <div className="t">
  {profession ||
   "No Profession"}
</div>

<div className="s">
  Current Career Path
</div>
        </div>
      </div>

      <nav className="side-nav">
        <NavLink to="/dashboard">
          <LayoutGrid size={17} /> Overview
        </NavLink>
        <NavLink to="/roadmaps">
          <LayoutGrid size={17} /> Roadmaps
        </NavLink>
        <NavLink to="/library">
          <FolderOpen size={17} /> Resources
        </NavLink>
        <NavLink to="/course">
          <BookOpen size={17} /> Modules
        </NavLink>
        <NavLink to="/exam">
          <ClipboardList size={17} /> Assignments/Moodle Test
        </NavLink>
        
        <NavLink to="/interview">
          <MessagesSquare size={17} /> Discussions
        </NavLink>
      </nav>

      <div
 className="profile-section"
 onClick={() =>
 setShowProfile(
   !showProfile
 )}
>

 {userData?.picture ? (

   <img
    src={userData.picture}
    alt="profile"
    className="profile-avatar"
   />

 ) : (

   <div
    className="profile-avatar-placeholder"
   >
     <User size={22}/>
   </div>

 )}

 <div>

   <div
    className="profile-name"
   >
    {userData?.name}
   </div>

   <div
    className="profile-email"
   >
    {userData?.email}
   </div>

 </div>

</div>
 {
  showProfile && (
    <div className="profile-tooltip">

      <div className="profile-header">

        {userData?.picture ? (
          <img
            src={userData.picture}
            alt="profile"
            className="tooltip-avatar"
          />
        ) : (
          <div className="tooltip-avatar-placeholder">
            <User size={28} />
          </div>
        )}

        <div>
          <h3>
            {userData?.name || "User"}
          </h3>

          <p>
            {userData?.email}
          </p>
        </div>

      </div>

      <div className="profile-info">

        <div className="info-row">
          <span>📞 Phone</span>
          <span>
            {userData?.phone || "Not Added"}
          </span>
        </div>

        <div className="info-row">
          <span>🎓 College</span>
          <span>
            {userData?.college || "Not Added"}
          </span>
        </div>

        <div className="info-row">
          <span>💼 Degree</span>
          <span>
            {userData?.degree || "Not Added"}
          </span>
        </div>

        <div className="info-row">
          <span>🔗 GitHub</span>
          <span>
            {userData?.github || "Not Added"}
          </span>
        </div>

        <div className="info-row">
          <span>💼 LinkedIn</span>
          <span>
            {userData?.linkedin || "Not Added"}
          </span>
        </div>

      </div>

      <div className="profile-actions">

        <button
          className="btn btn-primary"
          onClick={() =>{
            navigate("/profile")
          
            console.log("ki");
      }
          }
        >
          Edit Profile
        </button>

        <button
          className="btn btn-outline"
          onClick={handleLogout}
        >
          <LogOut size={16} />
          Logout
        </button>

      </div>

    </div>
  )
}
    </aside>
  );
}
