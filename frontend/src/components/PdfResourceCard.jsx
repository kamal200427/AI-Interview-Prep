import "./PdfResourceCard.css";
import {
  FileText,
  Download,
  CheckCircle,
  Eye
} from "lucide-react";
import { useState } from "react";
import { saveResource } from "../services/ResourceApi";

export default function PdfResourceCard({
  title,
  link,
  thumbnail,
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

      await saveResource({
        user_id: user.email,
        subject,
        resource_type: "pdf",
        title,
        link
      });

      setSaved(true);

    } catch (error) {

      console.log(error);

    }
  };
console.log("SUBJECT =", subject);
  return (

    <div
      className={`book-card ${
        saved ? "book-selected" : ""
      }`}
    >

      <div
        className="book-cover"
        onClick={() =>
          window.open(link, "_blank")
        }
      >

        <div className="book-spine" />

        {thumbnail ? (

          <img
            src={thumbnail}
            alt={title}
            className="book-image"
          />

        ) : (

          <>
            <FileText size={70} />

            <h4 className="cover-title">
              {title}
            </h4>

            <span>
              PDF Resource
            </span>
          </>

        )}

        <div className="book-overlay">

          <Eye size={40}/>

          <span>
            View PDF
          </span>

        </div>

      </div>

      <div className="book-content">

        <div className="pdf-actions">

          <button
            className="view-btn"
            onClick={() =>
              window.open(link, "_blank")
            }
          >
            <Eye size={16}/>
            View
          </button>

          <button
            className="pdf-download-btn"
            onClick={() =>
              window.open(link, "_blank")
            }
          >
            <Download size={16}/>
            Download
          </button>

        </div>

      </div>

      <button
        className={`add-btn ${
          saved ? "saved" : ""
        }`}
        onClick={handleSave}
        disabled={saved}
      >

        {saved ? (
          <>
            <CheckCircle size={18}/>
            Added
          </>
        ) : (
          <>
            <Download size={16}/>
            Add Resource
          </>
        )}

      </button>

    </div>
  );
}