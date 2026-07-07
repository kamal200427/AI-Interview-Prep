import React from "react";
import {
  User,
  Mail,
  GraduationCap,
  Briefcase,
  Github,
  Linkedin,
  Edit3,
} from "lucide-react";

import Card from "../common/Card";
import Button from "../common/Button";
import "./DashbordComponent.css";

const ProfileCard = ({ user, onEdit }) => {
  if (!user) return null;

  return (
    <Card
      title="Profile"
      subtitle="Your learning profile"
      className="profile-card"
    >
      <div className="profile-card-content">

        <div className="profile-card-top">

          <div className="profile-avatar-wrapper">

            {user.picture ? (
              <img
                src={user.picture}
                alt={user.name}
                className="profile-card-avatar"
              />
            ) : (
              <div className="profile-card-placeholder">
                <User size={34} />
              </div>
            )}

          </div>

          <div className="profile-basic-info">

            <h2>{user.name || "Student"}</h2>

            <p>{user.email}</p>

            <span className="profile-profession">
              {user.profession || "Career Not Selected"}
            </span>

          </div>

        </div>

        <div className="profile-divider"></div>

        <div className="profile-details">

          <div className="profile-row">

            <Mail size={18} />

            <span>{user.email || "Not Available"}</span>

          </div>

          <div className="profile-row">

            <GraduationCap size={18} />

            <span>{user.college || "Not Added"}</span>

          </div>

          <div className="profile-row">

            <Briefcase size={18} />

            <span>{user.degree || "Not Added"}</span>

          </div>

          <div className="profile-row">

            <Github size={18} />

            <span>{user.github || "Not Added"}</span>

          </div>

          <div className="profile-row">

            <Linkedin size={18} />

            <span>{user.linkedin || "Not Added"}</span>

          </div>

        </div>

        <div className="profile-completion">

          <div className="profile-progress-top">

            <span>Profile Completion</span>

            <strong>{user.completion || 80}%</strong>

          </div>

          <div className="profile-progress-bar">

            <div
              className="profile-progress-fill"
              style={{
                width: `${user.completion || 80}%`,
              }}
            ></div>

          </div>

        </div>

        <div className="profile-card-actions">

          <Button
            variant="primary"
            icon={<Edit3 size={17} />}
            onClick={onEdit}
          >
            Edit Profile
          </Button>

        </div>

      </div>
    </Card>
  );
};

export default ProfileCard;