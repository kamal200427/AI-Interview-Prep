import "./YoutubeResourceCard.css";
import { PlayCircle, CheckCircle } from "lucide-react";
import { useEffect, useState } from "react";
import {
  saveResources,
  removeResource,
  checkResource
}
from "../services/ResourceApi";


export default function YoutubeResourceCard({
  title,
  channel,
  duration,
  link,
  subject
}) {

  const [saved, setSaved] =
    useState(false);

  const handleSave = async (e) => {

    e.stopPropagation();

    try {

      const user = JSON.parse(
        localStorage.getItem("user")
      );
      if(saved){

      await removeResource(
        user.email,
        link
      );

      setSaved(false);

      return;
    }
      await saveResources({
        user_id: user.email,
        subject,
        resource_type: "youtube",
        title,
        link,
        thumbnail,
        channel_name: channel
      });

      setSaved(true);

    } catch(err) {

      console.log(err);

    }
  };
  
  const getYoutubeThumbnail = (url) => {
  try {
    const videoId =
      url.split("v=")[1]?.split("&")[0];

    return `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
  } catch {
    return "/youtube-placeholder.png";
  }
};
const thumbnail =
    getYoutubeThumbnail(link);

  useEffect(() => {

  const checkSaved =
  async () => {

    try{

      const user =
      JSON.parse(
        localStorage.getItem(
          "user"
        )
      );

      if(!user) return;

      const result =
      await checkResource(
        user.email,
        link
      );

      setSaved(
        result.saved
      );

    }
    catch(error){

      console.log(error);

    }

  };

  checkSaved();

}, [link]);
  return (

    <div
      className={`yt-card ${
        saved ? "yt-selected" : ""
      }`}
    >

      {/* Thumbnail */}

      <div
        className="yt-thumbnail"
        onClick={() =>
          window.open(
            link,
            "_blank"
          )
        }
      >

        <img
          src={thumbnail}
          alt={title}
        />

        <div className="yt-overlay">

          <PlayCircle size={65} />

        </div>

      </div>

      {/* Info */}

      <div className="yt-info">

        <h4>{title}</h4>

        <p>{channel}</p>

        {duration && (
          <span>{duration}</span>
        )}

      </div>

      {/* Button */}
       <button
  className={`yt-save-btn ${
    saved ? "saved" : ""
  }`}
  onClick={handleSave}
>
  {
    saved
    ?
    <>
      <CheckCircle size={18}/>
      Added
    </>
    :
    <>
      + Add Resource
    </>
  }
</button>
    </div>
  );
}