import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import InterviewSetup from "../components/interview/InterviewSetup";
import InterviewLoading from "../components/interview/InterviewLoading";
import InterviewHeader from "../components/interview/InterviewHeader";
import AIAvatar from "../components/interview/AIAvatar/AIAvatar";
import AIQuestionCard from "../components/interview/AIQuestionCard";
import CountdownTimer from "../components/interview/CountdownTimer";
import VoiceRecorder from "../components/interview/VoiceRecorder";
import LiveTranscript from "../components/interview/LiveTranscript";
import AnswerAnalysis from "../components/interview/AnswerAnalysis";
import InterviewSummary from "../components/interview/InterviewSummary";

import "../static/MockInterview.css";

import {
    startInterview,
    submitAnswer,
    getInterviewReport,
} from "../services/InterviewApi";

import { getSavedRoadmap } from "../services/RoadmapApi";

const TOTAL_QUESTIONS = 5;

export default function MockInterview() {
    
    const navigate = useNavigate();

    const [step, setStep] = useState("setup");

    const [sessionId, setSessionId] = useState(null);

    const [questionIndex, setQuestionIndex] = useState(1);

    const [question, setQuestion] = useState("");

    const [transcript, setTranscript] = useState("");

    const [analysis, setAnalysis] = useState(null);

    const [report, setReport] = useState(null);

    const [phase, setPhase] = useState("speaking");

    const [Profession, setProfession] = useState("");

    const [interviewConfig, setInterviewConfig] = useState({

        role: "",

        mode: "",

        difficulty: "",

        duration: 15,

        experience: "",

    });

    const user = JSON.parse(localStorage.getItem("user"));

    useEffect(() => {

        loadData();

    }, []);

    async function loadData(){

        try{

            if(!user?.email) return;

            const roadmapData = await getSavedRoadmap(user.email);

            if(roadmapData?.profession){

                setProfession(roadmapData.profession);

            }

        }

        catch(err){

            console.log(err);

        }

    }

const handleRetry = () => {

    setSessionId(null);

    setQuestion("");

    setQuestionIndex(1);

    setTranscript("");

    setAnalysis(null);

    setReport(null);

    setPhase("speaking");

    setStep("setup");

};

const handleDashboard = () => {

    navigate("/dashboard");

};
const handleDownload = () => {

    const data = {

        report,

        interviewConfig,

    };

    const blob = new Blob(

        [JSON.stringify(data, null, 2)],

        {

            type: "application/json",

        }

    );

    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");

    a.href = url;

    a.download = "Interview_Report.json";

    a.click();

    URL.revokeObjectURL(url);

};
    //------------------------------------------
    // Start Interview
    //------------------------------------------

    const handleStartInterview = async(formData)=>{

        try{

            setInterviewConfig({

                role:formData.role,

                mode:formData.mode,

                difficulty:formData.difficulty,

                duration:formData.duration,

                experience:formData.experience_years,

            });

            setStep("loading");

            const res = await startInterview(formData);

            setSessionId(res.uid);

            setQuestion(res.response);

            setQuestionIndex(1);
            setTimeout(() => {
            setPhase("speaking");
            },300);
            setStep("interview");

        }

        catch(err){

            console.log(err);

            setStep("setup");

        }

    }

    //------------------------------------------
    // Submit Answer
    //------------------------------------------

    const handleAnswerSubmit = async(answer)=>{

        try{

            setPhase("thinking");

            const res = await submitAnswer({

                uid:sessionId,

                answer,

            });
            if (res.completed) {
            const report = await getInterviewReport(sessionId);
            setReport(report);
            setStep("summary");
            return;
            }
            setAnalysis(res);

            if(questionIndex==TOTAL_QUESTIONS){
                            setTimeout(async () => {
                const report = await getInterviewReport(sessionId);

                setReport(report);

                setStep("summary");
                },3000);

                return;

            }

            setTimeout(()=>{

                setQuestionIndex((prev)=>prev+1);

                setQuestion(res.next_question);

                setTranscript("");

                setAnalysis(null);

                setPhase("speaking");

            },3000);

        }

        catch(err){

            console.log(err);

        }

    }

    //------------------------------------------

    if(step==="setup"){

        return(

            <InterviewSetup

                profession={Profession}

                onStart={handleStartInterview}

            />

        );

    }

    if(step==="loading"){

        return <InterviewLoading/>;

    }

    if(step==="summary"){

        return(

            <InterviewSummary

                report={report}
                onRetry={handleRetry}
                onDashboard={handleDashboard}
                onDownload={handleDownload}

            />

        );

    }

    //------------------------------------------

    return(

<div className="mock-page">

    <div className="mock-container">

        <InterviewHeader

            interviewConfig={interviewConfig}

            currentQuestion={questionIndex}

            totalQuestions={TOTAL_QUESTIONS}

        />

        <div className="mock-main-grid">

            {/* LEFT COLUMN */}

            <div className="left-column">

                <AIAvatar

                    status={phase}

                    questionText={question}

                    userTranscript={transcript}

                    onSpeechEnd={()=>setPhase("prepare")}

                />

                <VoiceRecorder

                    recording={phase==="recording"}
                    autoStop={true}
                    autoStopSeconds={60}
                    onTranscriptChange={(text)=>setTranscript(text)}

                    onTranscriptComplete={handleAnswerSubmit}

                />

            </div>

            {/* RIGHT COLUMN */}

            <div className="right-column">

                <AIQuestionCard

                    question={question}

                    current={questionIndex}

                    total={TOTAL_QUESTIONS}

                />
                {phase==="prepare" && (
                <CountdownTimer
                duration={10}
                running={phase === "prepare"}
                title="Think before answering..."
                onComplete={() => setPhase("recording")}
                />
                )}
                <LiveTranscript

                    transcript={transcript}

                    isRecording={phase==="recording"}

                    isProcessing={phase==="thinking"}

                />

            </div>

        </div>

        {analysis && (

            <div className="analysis-section">

                <AnswerAnalysis

                    analysis={analysis}

                />

            </div>

        )}

    </div>

</div>

    );

}