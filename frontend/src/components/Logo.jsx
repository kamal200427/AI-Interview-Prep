import {
  BrainCircuit,
  Mic,
  BookOpen
} from "lucide-react";

import "../static/Logo.css";

export default function Logo() {
  return (
    <div className="speechx-logo">

      <div className="speechx-icon">

        <BrainCircuit
          size={28}
          className="brain-icon"
        />

        <Mic
          size={14}
          className="mic-icon"
        />

        <BookOpen
          size={18}
          className="book-icon"
        />

      </div>

      <div className="speechx-text">

        <h2>
          Speech
          <span>X</span>
        </h2>

        <p>
          AI Interview Preparation
        </p>

      </div>

    </div>
  );
}