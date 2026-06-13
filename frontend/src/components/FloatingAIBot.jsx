import { useNavigate } from "react-router-dom";
import "./FloatingAIBot.css";

export default function FloatingAIBot({ subject = null }) {
  const navigate = useNavigate();
  console.log(subject);
  
  const openChat = () => {
    navigate("/chat", {
      state: {
        subject: subject
      }
    });

  };
  return (
    <div
      className="floating-bot"
      onClick={openChat}
      title="Ask AI Mentor"
    >
      <div className="bot-pulse"></div>

      <div className="robot">
        <div className="robot-head">
          <div className="eyes">
            <span></span>
            <span></span>
          </div>

          <div className="mouth"></div>
        </div>

        <div className="antenna"></div>
      </div>
    </div>
  );
}