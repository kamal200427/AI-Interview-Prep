import {
  ChevronLeft,
  ChevronRight,
  Flag,
  Send,
  CheckCircle
} from "lucide-react";

import "../static/ExamControls.css";


export default function ExamControls({

  currentIndex,

  totalQuestions,

  submitted,

  onPrevious,

  onNext,

  onSkip,

  onFlag,

  onSubmit,

  onFinish

}) {

  const isLastQuestion =
    currentIndex === totalQuestions - 1;

  return (

    <div className="exam-controls">

      <div className="left-controls">

        <button

          className="btn btn-outline"

          onClick={onPrevious}

          disabled={currentIndex === 0}

        >

          <ChevronLeft size={16}/>

          Previous

        </button>

        <button

          className="btn btn-outline"

          onClick={onSkip}

        >

          Skip

        </button>

      </div>

      <div className="right-controls">

        <button

          className="btn btn-warning"

          onClick={onFlag}

        >

          <Flag size={16}/>

          Flag

        </button>

        {

          !submitted && (

            <button

              className="btn btn-success"

              onClick={onSubmit}

            >

              <Send size={16}/>

              Submit

            </button>

          )

        }

        {

          !isLastQuestion ? (

            <button

              className="btn btn-primary"

              onClick={onNext}

            >

              Next

              <ChevronRight size={16}/>

            </button>

          ) : (

            <button

              className="btn btn-danger"

              onClick={onFinish}

            >

              <CheckCircle size={16}/>

              Finish Exam

            </button>

          )

        }

      </div>

    </div>

  );

}