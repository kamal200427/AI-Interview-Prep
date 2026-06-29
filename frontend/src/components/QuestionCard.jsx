import "../static/QuestionCard.css";
import {
  CheckCircle,
  XCircle,
  BookOpen
} from "lucide-react";

export default function QuestionCard({

  question,

  questionNumber,

  totalQuestions,

  selected,

  submitted,

  onSelect

}) {

  if (!question) return null;

  return (

    <div className="question-card">

      {/* Header */}

      <div className="question-header">

        <div>

          <span className="question-count">

            Question {questionNumber} / {totalQuestions}

          </span>

          <h2 className="question-title">

            {question.question}

          </h2>

        </div>

        <div className="question-subject">

          {question.subject}

        </div>

      </div>

      {/* Difficulty */}

      <div className="difficulty-row">

        <span className={`difficulty difficulty-${question.difficulty?.toLowerCase() || "medium"}`}>

          {question.difficulty || "Medium"}

        </span>

      </div>

      {/* Options */}

      <div className="option-list">

        {question.options.map((option, index) => {

          let className = "option-card";

          if (!submitted && selected === index) {

            className += " selected";

          }

          if (submitted) {

            if (index === question.correct_option) {

              className += " correct";

            }

            else if (selected === index) {

              className += " wrong";

            }

          }

          return (

            <div

              key={index}

              className={className}

              onClick={() => {

                if (!submitted) {

                  onSelect(index);

                }

              }}

            >

              <input

                type="radio"

                name={`question-${question.id}`}

                checked={selected === index}

                readOnly

              />

              <span>

                {option}

              </span>

            </div>

          );

        })}

      </div>

      {/* Result */}

      {

        submitted && (

          <div className="answer-result">

            {

              selected === question.correct_option

              ?

              <div className="correct-answer">

                <CheckCircle size={20}/>

                Correct Answer

              </div>

              :

              <div className="wrong-answer">

                <XCircle size={20}/>

                Wrong Answer

              </div>

            }

          </div>

        )

      }

      {/* Correct Answer */}

      {

        submitted && (

          <div className="correct-box">

            <h4>

              Correct Answer

            </h4>

            <p>

              {

                question.options[

                  question.correct_option

                ]

              }

            </p>

          </div>

        )

      }

      {/* Explanation */}

      {

        submitted && question.explanation && (

          <div className="explanation-box">

            <div className="exp-title">

              <BookOpen size={18}/>

              Explanation

            </div>

            <p>

              {question.explanation}

            </p>

          </div>

        )

      }

    </div>

  );

}