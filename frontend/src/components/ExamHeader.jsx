import "../static/ExamHeader.css";

export default function ExamHeader({

    examType,

    subject,

    currentQuestion,

    totalQuestions,

    score

}) {

    return (

        <div className="exam-header">

            <div>

                <h1>

                    Moodle Assessment

                </h1>

                <p className="exam-subtitle">

                    {

                        examType === "single"

                        ? `${subject} Mock Test`

                        : "Multiple Subject Mock Test"

                    }

                </p>

            </div>

            <div className="exam-info">

                <div className="info-box">

                    <span className="info-label">

                        Subject

                    </span>

                    <span className="info-value">

                        {

                            examType === "single"

                            ? subject

                            : currentQuestion?.subject

                        }

                    </span>

                </div>

                <div className="info-box">

                    <span className="info-label">

                        Question

                    </span>

                    <span className="info-value">

                        {currentQuestion} / {totalQuestions}

                    </span>

                </div>

                <div className="info-box">

                    <span className="info-label">

                        Score

                    </span>

                    <span className="info-value green">

                        {score}

                    </span>

                </div>

            </div>

        </div>

    );

}