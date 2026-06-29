import "../static/QuestionNavigator.css";

export default function QuestionNavigator({

    totalQuestions,

    currentIndex,

    answeredQuestions,

    flaggedQuestions,

    onJump

}) {

    const getClass = (index) => {

        const questionNo = index + 1;

        if (currentIndex === index) {

            return "current";

        }

        if (answeredQuestions.includes(questionNo)) {

            return "answered";

        }

        if (flaggedQuestions.includes(questionNo)) {

            return "flagged";

        }

        return "";

    };

    return (

        <aside className="question-sidebar">

            <h3>

                Question Palette

            </h3>

            <p>

                {totalQuestions} Questions

            </p>

            <div className="question-grid">

                {

                    Array.from({

                        length: totalQuestions

                    }).map((_, index) => (

                        <div

                            key={index}

                            className={`question-cell ${getClass(index)}`}

                            onClick={() => onJump(index)}

                        >

                            {index + 1}

                        </div>

                    ))

                }

            </div>

            <div className="palette-legend">

                <div>

                    <span className="legend-box current"/>

                    Current

                </div>

                <div>

                    <span className="legend-box answered"/>

                    Answered

                </div>

                <div>

                    <span className="legend-box flagged"/>

                    Flagged

                </div>

                <div>

                    <span className="legend-box"/>

                    Unvisited

                </div>

            </div>

        </aside>

    );

}