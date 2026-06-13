import { useEffect, useState } from "react";
import { Flag, ChevronLeft, ChevronRight } from "lucide-react";
import { getQuestions } from "../services/ExamApi";
import FloatingAIBot from "../components/FloatingAIBot";

const SUBJECTS = [
  "DSA",
  "DBMS",
  "Operating System",
  "Computer Network",
  "OOPS",
  "C Programming",
  "C++",
  "Java",
  "Python",
  "JavaScript",
  "SQL",
  "Machine Learning",
  "Deep Learning",
  "Artificial Intelligence",
  "NLP",
  "Computer Vision",
  "Generative AI",
  "Cloud Computing",
  "System Design",
  "Software Engineering",
   
];

export default function Exam() {
  const [selected, setSelected] = useState(null);
  const [answeredQuestions, setAnsweredQuestions] = useState([]);
  const [quiz, setQuiz] = useState([]);
const [currentIndex, setCurrentIndex] = useState(0);
const [flaggedQuestions, setFlaggedQuestions] = useState([]);
 const [questionData, setQuestionData] = useState({
  subject: "",
  question_no: 0,
  total_questions: 0,
  score: 0,
  question: "",
  options: [],
});
  const [loading, setLoading] = useState(true);
  const [submitted, setSubmitted] = useState(false);
  const [isCorrect, setIsCorrect] = useState(null);
const [subject, setSubject] = useState("DBMS");
  useEffect(() => {
    fetchQuestion();
  }, []);
 const fetchQuestion = async () => {
  try {
    const data = await getQuestions(subject);
    console.log(data);
    setQuiz(data.quiz); 
     setCurrentIndex(0);
    setSelected(null);
    setAnsweredQuestions([]);
    const firstQuestion = data.quiz[0];

    setQuestionData({
      subject: subject,
      question_no: 1,
      total_questions: data.quiz.length,
      score: 0,
      question: firstQuestion.question,
      options: firstQuestion.options,
      correct_option: firstQuestion.correct_option,
    });

    setLoading(false);
  } catch (error) {
    console.log(error);
    setLoading(false);
  }
};

const previousQuestion = () => {
  if (currentIndex > 0) {
    const prev = currentIndex - 1;

    setCurrentIndex(prev);

    setQuestionData({
      subject: subject,
      question_no: prev + 1,
      total_questions: quiz.length,
      score: questionData.score,
      question: quiz[prev].question,
      options: quiz[prev].options,
      correct_option: quiz[prev].correct_option,
    });

    setSelected(null);
  }
};

const skipQuestion = () => {
  if (currentIndex < quiz.length - 1) {
    const next = currentIndex + 1;

    setCurrentIndex(next);

    setQuestionData({
      ...questionData,
      question_no: next + 1,
      question: quiz[next].question,
      options: quiz[next].options,
      correct_option: quiz[next].correct_option,
    });

    setSelected(null);
  }
};

const flagQuestion = () => {
  if (!flaggedQuestions.includes(currentIndex + 1)) {
    setFlaggedQuestions([
      ...flaggedQuestions,
      currentIndex + 1,
    ]);
  }
};
const submitAnswer = () => {
  if (selected === null) {
    alert("Please select an option");
    return;
  }

  const correct =
    selected === questionData.correct_option;

  setIsCorrect(correct);
  setSubmitted(true);

  if (correct) {
    setQuestionData((prev) => ({
      ...prev,
      score: prev.score + 1,
    }));
  }
};
 if (loading) {
    return <h2>Loading Questions...</h2>;
  }

const cells = Array.from(
  { length: questionData.total_questions || 20 },
  (_, index) => ({
    n: index + 1,
    s:
      index === currentIndex
        ? "current"
        : answeredQuestions.includes(index + 1)
        ? "answered"
        : flaggedQuestions.includes(index + 1)
        ? "flagged"
        : ""
  })
);
  return (
    <>
    <div className="subject-wrapper">
    <div className="subject-selector">
  <label>Select Subject</label>

  <select
    value={subject}
    onChange={(e) => setSubject(e.target.value)}
    className="subject-dropdown"
  >
    {SUBJECTS.map((sub) => (
      <option key={sub} value={sub}>
        {sub}
      </option>
    ))}
  </select>

  <button
    className="btn btn-primary"
    onClick={() => {
      setLoading(true);
      fetchQuestion();
    }}
  >
    Load Questions
  </button>
</div>
    </div>
    <div className="exam-shell">
      
      {/* Map sidebar */}
      <aside className="exam-side">
        <h3>Examination Map</h3>
        <div className="sub">{questionData.total_questions} Questions Total</div>

        <div className="q-map">
          {cells.map((c) => (
            <div key={c.n} className={`q-cell ${c.s}`}>
              {c.n}
            </div>
          ))}
        </div>

        <div className="legend">
          <div className="lg">
            <span className="ld" style={{ background: "var(--green)" }} /> Answered
          </div>
          <div className="lg">
            <span className="ld" style={{ background: "var(--surface-3)" }} /> Unvisited
          </div>
          <div className="lg">
            <span className="ld" style={{ background: "var(--amber)" }} /> Flagged
          </div>
        </div>
      </aside>

      {/* Main */}
      <main className="exam-main">
        <div className="exam-card">
          <div className="q-meta">
  <span className="badge badge-muted">
    Question {questionData.question_no} of{" "}
    {questionData.total_questions}
  </span>

  <span
    className="muted"
    style={{ fontSize: 13, fontWeight: 600 }}
  >
    Score: {questionData.score} Points
  </span>
</div>

          <div className="exam-q">
       {questionData.question}
          </div>

        {questionData?.options?.map((o, i) => {
      let optionClass = "";

     if (submitted) {

    if (i === questionData.correct_option) {
      optionClass = "correct-option";
    }

    if (
      i === selected &&
      i !== questionData.correct_option
    ) {
      optionClass = "wrong-option";
    }
  }

  return (
    <div
      key={i}
      className={`option ${
         !submitted && selected === i ? "selected" : ""
      } ${optionClass}`}
      onClick={() =>
        !submitted && setSelected(i)
      }
    >
      <span className="radio" />
      {o}
    </div>
  );
})}
{submitted && (
  <div
    className={`answer-result ${
      isCorrect ? "correct" : "wrong"
    }`}
  >
    {isCorrect
      ? "✅ Correct Answer"
      : `❌ Wrong Answer. Correct Answer: ${
          questionData.options[
            questionData.correct_option
          ]
        }`}
  </div>
)}
          <div className="exam-foot">
            <div className="grp">
              {currentIndex > 0 && (
            <button
    className="btn btn-outline"
    onClick={previousQuestion}
         >
        <ChevronLeft size={16} />
       Previous
     </button>
        )}
              <button className="btn btn-ghost" onClick={skipQuestion}>Skip</button>
            </div>
            <div className="grp">
              <button className="btn btn-outline" onClick={flagQuestion}>
                <Flag size={15} /> Flag Question
              </button>
              <button
        className="btn btn-success"
        onClick={submitAnswer}
       disabled={submitted}
      >
       Submit
        </button>
              {currentIndex < quiz.length - 1 && (
              <button
          className="btn btn-primary"
          onClick={() => {
    if (currentIndex < quiz.length - 1) {
      const next = currentIndex + 1;

      setCurrentIndex(next);

    setQuestionData({
      subject: subject,
      question_no: next + 1,
      total_questions: quiz.length,
      score: questionData.score,
      question: quiz[next].question,
      options: quiz[next].options,
      correct_option: quiz[next].correct_option,
    });
    setSubmitted(false);
    setIsCorrect(null);
    setSelected(null);
  }
}}
            >
                Next Question <ChevronRight size={16} />
              </button>
             )}
            </div>
          </div>
        </div>
      </main>
      <FloatingAIBot subject={subject} />
    </div>
    </>
  );
}
