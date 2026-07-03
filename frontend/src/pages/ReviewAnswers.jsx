import { useEffect, useState } from "react";
import { getReviewExam } from "../services/ExamApi";
import { useLocation, useNavigate } from "react-router-dom";
import {
    CheckCircle,
    XCircle
} from "lucide-react";

import "../static/ReviewExam.css";

export default function ReviewExam(){
    const navigate = useNavigate();

    const { state } = useLocation();

    const { sessionId } = state;

    const [questions,setQuestions]=useState([]);

    const [loading,setLoading]=useState(true);
    const [subject, setSubject] = useState("");

    useEffect(()=>{

        async function loadReview(){
            
            const data=await getReviewExam(sessionId);
        console.log(data.question);
        console.log("sessionId",sessionId);
            setSubject(data.subject);
            setQuestions(data.questions);

            setLoading(false);

        }

        loadReview();

    },[]);

    if(loading){

        return <h2>Loading...</h2>;

    }

    return(

        <div className="review-container">

            <h1>

                Exam Review

            </h1>

            {

                questions.map((q,index)=>(

                    <div
                        key={q.id}
                        className="review-card"
                    >

                        <div className="review-header">

                            <h3>

                                Q{index+1}. {q.question}

                            </h3>

                            {

                                q.is_correct

                                ?

                                <CheckCircle
                                    color="#22c55e"
                                />

                                :

                                <XCircle
                                    color="#ef4444"
                                />

                            }

                        </div>

                        {

                            q.options.map((option,i)=>{

                                let cls="option";

                                if(option===q.correct_answer){

                                    cls+=" correct";

                                }

                                if(

                                    option===q.selected_answer &&

                                    option!==q.correct_answer

                                ){

                                    cls+=" wrong";

                                }

                                return(

                                    <div
                                        key={i}
                                        className={cls}
                                    >

                                        {option}

                                    </div>

                                );

                            })

                        }

                        <div className="answer-box">

                            <p>

                                <b>

                                    Your Answer :

                                </b>

                                {

                                    q.selected_answer ||

                                    "Not Answered"

                                }

                            </p>

                            <p>

                                <b>

                                    Correct Answer :

                                </b>

                                {

                                    q.correct_answer

                                }

                            </p>

                        </div>

                        {

                            q.explanation &&

                            <div className="explanation">

                                <h4>

                                    Explanation

                                </h4>

                                <p>

                                    {

                                        q.explanation

                                    }

                                </p>

                            </div>

                        }

                    </div>

                ))

            }
         <div className="review-buttons">

    <button
        className="dashboard-btn"
        onClick={() => navigate("/dashboard")}
    >
        Dashboard
    </button>

    <button
        className="retake-btn"
        onClick={() =>
            navigate("/exam", {
                state: {
                    type: "single",
                    subject: subject
                }
            })
        }
    >
        Retake Exam
    </button>

</div>

        </div>

    );

}