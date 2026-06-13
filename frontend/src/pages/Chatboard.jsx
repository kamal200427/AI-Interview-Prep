import Navbar from "../components/Navbar";
import "./ChatBoard.css";
import { useLocation } from "react-router-dom";
import {
  askPlatformQuestion,
  askSubjectQuestion
} from "../services/ChatApi";

import {
  Bot,
  Send,
  Mic,
  Paperclip,
  Plus,
  Copy,
  ThumbsUp,
  ThumbsDown,
  Volume2,
  Bell,
  MoreVertical,
  Check,
} from "lucide-react";
import { useRef, useState } from "react";


export default function ChatBoard() {
const location = useLocation();

const chatType =location.state?.type || "platform";
const subject = location.state?.subject || "";
const [messages, setMessages] = useState([]);
const [input, setInput] = useState("");
const [loading, setLoading] = useState(false);
const [copiedIndex, setCopiedIndex] = useState(null);
// console.log("inside the chatbord",subject);
const [isListening, setIsListening] = useState(false);
const recognitionRef = useRef(null);


const handleSend = async () => {

  if (!input.trim()) return;

  const userMessage = {
    role: "user",
    content: input,
    time: new Date().toLocaleTimeString(),
  };

  setMessages((prev) => [
    ...prev,
    userMessage,
  ]);

  const question = input;

  setInput("");

  setLoading(true);

  try {

    let result;

    if (chatType === "subject") {

      result =
        await askSubjectQuestion(
          subject,
          question
        );
        console.log(result);
        

    } else {

      result =
        await askPlatformQuestion(
          question
        );
        console.log(result);
        
    }

    const botMessage = {
      role: "assistant",
      content:
        result.answer ||
        result.response ||
        JSON.stringify(result),
      time: new Date().toLocaleTimeString(),
    };

    setMessages((prev) => [
      ...prev,
      botMessage,
    ]);

  } catch (error) {

    setMessages((prev) => [
      ...prev,
      {
        role: "assistant",
        content:
          "Sorry, something went wrong.",
        time: new Date().toLocaleTimeString(),
      },
    ]);

  } finally {
    setLoading(false);
  }
};

const copyMessage = (
  text,
  index
) => {

  navigator.clipboard.writeText(text);

  setCopiedIndex(index);

  setTimeout(() => {
    setCopiedIndex(null);
  }, 2000);
};
const speak = (text) => {
  const speech =
    new SpeechSynthesisUtterance(text);
  window.speechSynthesis.speak(
    speech
  );
};

const startListening = () => {
  const SpeechRecognition =
    window.SpeechRecognition ||
    window.webkitSpeechRecognition;

  if (!SpeechRecognition) {
    alert(
      "Speech Recognition is not supported in your browser."
    );
    return;
  }

  const recognition =
    new SpeechRecognition();

  recognition.lang = "en-US";

  recognition.continuous = false;

  recognition.interimResults = true;

  recognitionRef.current = recognition;

  recognition.onstart = () => {
    setIsListening(true);
  };

  recognition.onresult = (event) => {

    let transcript = "";

    for (
      let i = 0;
      i < event.results.length;
      i++
    ) {
      transcript +=
        event.results[i][0].transcript;
    }

    setInput(transcript);
  };

  recognition.onerror = (event) => {
    console.log(event.error);
    setIsListening(false);
  };

  recognition.onend = () => {
    setIsListening(false);
  };

  recognition.start();
};

const stopListening = () => {

  if (recognitionRef.current) {

    recognitionRef.current.stop();

    setIsListening(false);
  }

};
  return (
    <div className="chat-page">

      {/* Navbar */}
       <Navbar/>

      {/* Main */}
      <div className="chat-wrapper">

        <div className="chat-card">

          {/* Header */}
          <div className="chat-header">

            <div className="mentor-info">

              <div className="mentor-icon">
                <Bot size={30} />
              </div>

              <div>
                <h2 className="mentor-title">
                  AI Interview Mentor
                </h2>

                <p className="mentor-subtitle">
                  Ask anything about project as well as  DSA, DBMS, OS,
                  CN, OOPS, Java and more...
                </p>
              </div>

            </div>

            <div className="header-actions">

              <button className="new-chat-btn" onClick={() => {
               setMessages([]);
               }}>
                <Plus size={18} />
                New Chat
              </button>
              
              <button className="icon-btn">
                <MoreVertical size={18} />
              </button>

            </div>

          </div>

          {/* Chat Body */}
          <div className="chat-body">

            <div className="today-tag">
              Today
            </div>

            {/* User Message &AI massage */}
                {messages.map((msg, index) => (

       msg.role === "user" ? (

         <div
         key={index}
         className="user-message-row"
         >
      <div className="user-message">

        <p>{msg.content}</p>

        <div className="message-time">
          {msg.time}
        </div>

      </div>
    </div>

  ) : (

    <div
      key={index}
      className="ai-message-row"
    >

      <div className="ai-avatar">
        <Bot size={20}/>
      </div>

      <div className="ai-content">

        <div className="ai-message">
          {msg.content}
        </div>

        <div className="message-actions">

          <button
     className="action-btn"
      onClick={() =>
         copyMessage(
          msg.content,
          index
         )
       }
        >

      {copiedIndex === index ? (
       <Check size={18}/>
      ) : (
       <Copy size={18}/>
      )}

    </button>

          <button>
            <ThumbsUp size={18}/>
          </button>

          <button>
            <ThumbsDown size={18}/>
          </button>

          <button onClick={() =>
           speak(msg.content)
           }>
            <Volume2 size={18}/>
          </button>
            </div>
          </div>
          </div>
       )

          ))}

             </div>
          {/* Footer */}
          <div className="chat-footer">

            <div className="chat-input-box">

              {/* <button className="attach-btn">
                <Paperclip size={18} />
              </button> */}

              <button
          className={`attach-btn ${
          isListening ? "mic-active" : ""
             }`}
       onClick={() => {

    if (isListening) {
      stopListening();
    } else {
      startListening();
    }

  }}
>
     <Mic size={18} />
      </button>
              <input
                type="text"
                value={input}
                placeholder="Type or Speak your question..."
                onChange={(e) =>
             setInput(e.target.value)
            }
          onKeyDown={(e) => {
         if (e.key === "Enter") {
           handleSend();
         }
         }}
              />
              {isListening && (
  <span className="listening-text">
    🎤 Listening...
     </span>
    )}

              <button className="send-btn"  onClick={handleSend}>
                <Send size={20} />
              </button>

            </div>

            <p className="footer-note">
              AI responses can make mistakes.
              Please verify important information.
            </p>

          </div>

        </div>

      </div>

    </div>
  );
}