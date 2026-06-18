import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { User } from "lucide-react";

import Sidebar from "../components/Sidebar";
import { getUser, updateUser } from "../services/SignInApi";

import "../static/Profile.css";

export default function Profile() {

  const navigate = useNavigate();

  const [profile, setProfile] =
    useState({
      name: "",
      email: "",
      picture: "",
      phone: "",
      college: "",
      degree: "",
      graduation_year: "",
      github: "",
      linkedin: "",
      bio: ""
    });

  useEffect(() => {
    console.log("hello");
    

    const loadUser =
      async () => {

        try {

          const user =
            JSON.parse(
              localStorage.getItem(
                "user"
              )
            );

          const data =
            await getUser(
              user.email
            );
            console.log(data);
            
          setProfile(
            data.user
          );

        }
        catch(error){

          console.log(error);

        }
      };

    loadUser();

  }, []);

  const handleChange =
    (e) => {

      setProfile({
        ...profile,
        [e.target.name]:
        e.target.value
      });

    };

  const handleSave =
    async () => {

      try {

        await updateUser(
          profile
        );

        alert(
          "Profile Updated"
        );

      }
      catch(error){

        console.log(error);

      }

    };

  return (

    <div className="profile-container">

        <div className="profile-page">

          <h1>
            Profile
          </h1>

          <div className="profile-card">

            <div className="profile-top">

              {
                profile.picture ?

                (
                  <img
                    src={
                      profile.picture
                    }
                    alt="profile"
                    className="profile-image"
                  />
                )

                :

                (
                  <div
                    className="profile-placeholder"
                  >
                    <User size={40}/>
                  </div>
                )
              }
              
              <h2>
                {profile.name}
              </h2>
              <p>
                {profile.email}
              </p>

            </div>

            <div className="profile-form">

              <div className="field-group">

                <label>
                  Phone
                </label>

                <input
                  type="text"
                  name="phone"
                  value={
                    profile.phone || ""
                  }
                  onChange={
                    handleChange
                  }
                />

              </div>

              <div className="field-group">

                <label>
                  College
                </label>

                <input
                  type="text"
                  name="college"
                  value={
                    profile.college || ""
                  }
                  onChange={
                    handleChange
                  }
                />

              </div>

              <div className="field-group">

                <label>
                  Degree
                </label>

                <input
                  type="text"
                  name="degree"
                  value={
                    profile.degree || ""
                  }
                  onChange={
                    handleChange
                  }
                />

              </div>

              <div className="field-group">

                <label>
                  Graduation Year
                </label>

                <input
                  type="text"
                  name="graduation_year"
                  value={
                    profile.graduation_year || ""
                  }
                  onChange={
                    handleChange
                  }
                />

              </div>

              <div className="field-group">

                <label>
                  GitHub
                </label>

                <input
                  type="text"
                  name="github"
                  value={
                    profile.github || ""
                  }
                  onChange={
                    handleChange
                  }
                />

              </div>

              <div className="field-group">

                <label>
                  LinkedIn
                </label>

                <input
                  type="text"
                  name="linkedin"
                  value={
                    profile.linkedin || ""
                  }
                  onChange={
                    handleChange
                  }
                />

              </div>

              <div className="field-group">

                <label>
                  Bio
                </label>

                <textarea
                  rows="4"
                  name="bio"
                  value={
                    profile.bio || ""
                  }
                  onChange={
                    handleChange
                  }
                />

              </div>

              <div className="profile-actions">

                <button
                  className="btn btn-primary"
                  onClick={
                    handleSave
                  }
                >
                  Save Profile
                </button>

                <button
                  className="btn btn-outline"
                  onClick={() =>
                    navigate(-1)
                  }
                >
                  Back
                </button>

              </div>

            </div>

          </div>

        </div>


    </div>

  );
}