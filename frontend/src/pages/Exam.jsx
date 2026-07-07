import { useEffect, useState, useCallback, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import Sidebar from "../components/Sidebar";
import FloatingAIBot from "../components/FloatingAIBot";

import ExamHeader from "../components/ExamHeader";
import ExamTimer from "../components/ExamTimer";
import QuestionNavigator from "../components/QuestionNavigator";
import QuestionCard from "../components/QuestionCard";
import ExamControls from "../components/ExamControls";

import {
  getQuestions,
  getMultipleQuestions,
  createExamSession,
  saveAnswer,
  finishExam,
} from "../services/ExamApi";

import "../static/Exam.css";

export default function Exam() {
  const navigate = useNavigate();
  const { state } = useLocation();

  const {
    type = "single",
    subject = "",
    subjects = [],
  } = state || {};
console.log("Exam Render");
  // -----------------------------
  // States
  // -----------------------------
  const [quiz, setQuiz] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  const [selected, setSelected] = useState(null);
  const [submitted, setSubmitted] = useState(false);

  const [score, setScore] = useState(0);

  const [answeredQuestions, setAnsweredQuestions] = useState([]);
  const [flaggedQuestions, setFlaggedQuestions] = useState([]);

  const [sessionId, setSessionId] = useState(null);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const hasLoaded = useRef(false);

  // 30 Minutes
  const [timeLeft, setTimeLeft] = useState(30 * 60);

  // -----------------------------
  // Current Question
  // -----------------------------
  const currentQuestion =
  currentIndex >= 0 &&
  currentIndex < quiz.length
    ? quiz[currentIndex]
    : null;

  // -----------------------------
  // Load Question
  // -----------------------------
  const loadQuestion = 
    (index) => {
      if (index === undefined ||
        index === null ||
        index < 0 ||
        index >= quiz.length) return;

      setCurrentIndex(index);
      setSelected(null);
      setSubmitted(false);
    };
useEffect(() => {
    console.log("Quiz updated:", quiz.length);
    if (quiz.length > 0) {
        console.log("First question id:", quiz[0].id);
    }
}, [quiz]);
  // -----------------------------
  // Load Exam
  // -----------------------------
  
  const loadExam = async () => {
    try {
          console.log("loadExam called");
      setLoading(true);
      setError("");

      let response;

      if (type === "single") {
        response = await getQuestions(subject);
      } else {
        response = await getMultipleQuestions(subjects);
      }

      if (
        !response ||
        !response.quiz ||
        response.quiz.length === 0
      ) {
        setError("No questions found.");
        setLoading(false);
        return;
      }
console.log("Before setQuiz", response.quiz[0].id);

      setQuiz(response.quiz);
      console.log(response.quiz);
      console.log("length",response.quiz.length);
      
      setCurrentIndex(0);
      setSelected(null);
      setSubmitted(false);

      const user = JSON.parse(
        localStorage.getItem("user")
      );

      if (!user) {
        navigate("/login");
        return;
      }

      const session =
        await createExamSession({
          user_id: user.email,
          subject:
            type === "single"
              ? subject
              : subjects.join(", "),
          total_questions:
            response.quiz.length,
        });

      setSessionId(session.session_id);

      setLoading(false);
    } catch (err) {
      console.error(err);

      setError(
        "Failed to load exam. Please try again."
      );

    }
    finally{
      setLoading(false);
    }
  };
      
  // -----------------------------
  // Initial Load
  // -----------------------------
  useEffect(() => {
        console.log("useEffect executed");
      if (hasLoaded.current) return;
      hasLoaded.current = true;
    loadExam();
  }, []);
// useEffect(() => {
//         console.log("useEffect executed");
// 
//     loadQuestion();
//   }, [quiz]);
  // -----------------------------
  // Timer
  // -----------------------------
  useEffect(() => {
    if (loading) return;

    if (timeLeft <= 0) return;

    const interval = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [loading, timeLeft]);

  // -----------------------------
  // Auto Finish When Time Ends
  // -----------------------------
  useEffect(() => {
    if (!loading && timeLeft === 0) {
      handleFinishExam();
    }
  }, [timeLeft, loading]);

  // -----------------------------
  // Previous Question
  // -----------------------------
  const previousQuestion = () => {
    if (currentIndex === 0) return;

    loadQuestion(currentIndex - 1);
  };

  // -----------------------------
  // Next Question
  // -----------------------------
  const nextQuestion = () => {
    if (currentIndex >= quiz.length - 1) return;

    loadQuestion(currentIndex + 1);
  };

  // -----------------------------
  // Skip Question
  // -----------------------------
  const skipQuestion = () => {
    nextQuestion();
  };

  // -----------------------------
  // Jump to Question
  // -----------------------------
  const jumpQuestion = (index) => {
    if (index < 0 || index >= quiz.length) return;

    loadQuestion(index);
  };

  // -----------------------------
  // Flag / Unflag Question
  // -----------------------------
  const flagQuestion = () => {
    const questionNumber = currentIndex + 1;

    setFlaggedQuestions((prev) => {
      if (prev.includes(questionNumber)) {
        return prev.filter((q) => q !== questionNumber);
      }

      return [...prev, questionNumber];
    });
  };

  // -----------------------------
  // Submit Answer
  // -----------------------------
  const submitAnswer = async () => {
    if (!currentQuestion) return;

    if (selected === null) {
      alert("Please select an answer.");
      return;
    }

    try {
      const isCorrect =
        selected === currentQuestion.correct_option;

      await saveAnswer({
        session_id: sessionId,
        question_id: currentQuestion.id,
        selected_answer:
          currentQuestion.options[selected],
        is_correct: isCorrect,
      });

      if (isCorrect) {
        setScore((prev) => prev + 1);
      }

      setAnsweredQuestions((prev) => {
        const questionNumber = currentIndex + 1;

        if (prev.includes(questionNumber)) {
          return prev;
        }

        return [...prev, questionNumber];
      });

      setSubmitted(true);
    } catch (err) {
      console.error(err);
      alert("Unable to save your answer.");
    }
  };

  // -----------------------------
  // Finish Exam
  // -----------------------------
  const handleFinishExam = async () => {
    try {
      if (!sessionId) return;

      await finishExam(sessionId);

      navigate("/exam-result", {
        state: {
          subject,
          sessionId,
          score,
          totalQuestions: quiz.length,
          answeredQuestions,
          flaggedQuestions,
          timeTaken: 30 * 60 - timeLeft,
        },
      });
    } catch (err) {
      console.error(err);
      alert("Unable to finish exam.");
    }
  };

  // -----------------------------
  // Loading Screen
  // -----------------------------
  // if (loading) {
  //   return (
  //     <div className="loading-screen">
  //       <h2>Loading Exam...</h2>
  //     </div>
  //   );
  // }

  // -----------------------------
  // Error Screen
  // -----------------------------
  if (error) {
    return (
      <div className="loading-screen">
        <h2>{error}</h2>

        <button
          className="retry-btn"
          onClick={loadExam}
        >
          Retry
        </button>
      </div>
    );
  }

  // -----------------------------
  // Render
  // -----------------------------
  return (
    <div className="exam-page">
      {/* <Sidebar /> */}

      <main className="exam-main">
        <div className="exam-top">
        <ExamHeader
          examType={type}
          subject={
            type === "single"
              ? subject
              : subjects.join(", ")
          }
          currentQuestion={currentIndex + 1}
          totalQuestions={quiz.length}
          score={score}
        />

        <ExamTimer
          timeLeft={timeLeft}
        />
    </div>
        <div className="exam-layout">
          <QuestionNavigator
            totalQuestions={quiz.length}
            currentIndex={currentIndex}
            answeredQuestions={answeredQuestions}
            flaggedQuestions={flaggedQuestions}
            onJump={jumpQuestion}
          />

          <QuestionCard
            question={currentQuestion}
            questionNumber={currentIndex + 1}
            totalQuestions={quiz.length}
            selected={selected}
            submitted={submitted}
            onSelect={setSelected}
          />
        </div>

        <ExamControls
          currentIndex={currentIndex}
          totalQuestions={quiz.length}
          submitted={submitted}
          onPrevious={previousQuestion}
          onNext={nextQuestion}
          onSkip={skipQuestion}
          onFlag={flagQuestion}
          onSubmit={submitAnswer}
          onFinish={handleFinishExam}
        />
      </main>

{currentQuestion && (
        <FloatingAIBot
          subject={currentQuestion.subject}
        />
      )} 
    </div>
  );
}


