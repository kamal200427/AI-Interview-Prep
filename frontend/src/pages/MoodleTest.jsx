import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import Sidebar from "../components/Sidebar";

import {
    getCompletedSubjects
} from "../services/CourseModuleApi";

import "../static/MoodleTest.css";

export default function MoodleTest() {

    const navigate = useNavigate();

    const [examType, setExamType] =
        useState("single");

    const [subjects, setSubjects] =
        useState([]);

    const [selectedSubject,
        setSelectedSubject] =
        useState("");

    const [selectedSubjects,
        setSelectedSubjects] =
        useState([]);

    useEffect(() => {

        loadSubjects();

    }, []);

    const loadSubjects =
        async () => {

            const user =
                JSON.parse(
                    localStorage.getItem("user")
                );

            const data =
                await getCompletedSubjects(
                    user.email
                );

            setSubjects(
                data.subjects
            );

            if (data.subjects.length) {

                setSelectedSubject(
                    data.subjects[0]
                );

            }

        };

    const toggleSubject =
        (subject) => {

            if (
                selectedSubjects.includes(subject)
            ) {

                setSelectedSubjects(

                    selectedSubjects.filter(

                        s => s !== subject

                    )

                );

            }

            else {

                setSelectedSubjects([

                    ...selectedSubjects,

                    subject

                ]);

            }

        };

    const startExam = () => {

        if (
            examType === "single"
        ) {

            navigate("/exam", {

                state: {

                    type: "single",

                    subject:
                        selectedSubject

                }

            });

            return;

        }

        if (

            selectedSubjects.length === 0

        ) {

            alert(

                "Select at least one subject."

            );

            return;

        }

        navigate("/exam", {

            state: {

                type: "multiple",

                subjects:
                    selectedSubjects

            }

        });

    };

    return (

        <div className="app-shell">

            <Sidebar />

            <main className="app-main">

                <h1>

                    Moodle Assessment

                </h1>

                <p>

                    Practice AI-generated MCQs
                    based on your completed
                    roadmap subjects.

                </p>

                <div className="moodle-card">

                    <h2>

                        Select Exam Type

                    </h2>

                    <label>

                        <input

                            type="radio"

                            checked={
                                examType === "single"
                            }

                            onChange={() =>
                                setExamType(
                                    "single"
                                )
                            }

                        />

                        Single Subject Exam

                    </label>

                    <label>

                        <input

                            type="radio"

                            checked={
                                examType === "multiple"
                            }

                            onChange={() =>
                                setExamType(
                                    "multiple"
                                )
                            }

                        />

                        Multiple Subject Exam

                    </label>

                </div>

                {

                    examType === "single"

                    ?

                    (

                        <div className="moodle-card">

                            <h2>

                                Select Subject

                            </h2>

                            <select

                                value={
                                    selectedSubject
                                }

                                onChange={(e) =>

                                    setSelectedSubject(
                                        e.target.value
                                    )

                                }

                            >

                                {

                                    subjects.map(

                                        subject => (

                                            <option

                                                key={subject}

                                                value={subject}

                                            >

                                                {subject}

                                            </option>

                                        )

                                    )

                                }

                            </select>

                        </div>

                    )

                    :

                    (

                        <div className="moodle-card">

                            <h2>

                                Select Subjects

                            </h2>

                            <div className="subject-grid">

                                {

                                    subjects.map(

                                        subject => (

                                            <label

                                                key={subject}

                                                className="subject-checkbox"

                                            >

                                                <input

                                                    type="checkbox"

                                                    checked={

                                                        selectedSubjects.includes(

                                                            subject

                                                        )

                                                    }

                                                    onChange={() =>

                                                        toggleSubject(

                                                            subject

                                                        )

                                                    }

                                                />

                                                {subject}

                                            </label>

                                        )

                                    )

                                }

                            </div>

                        </div>

                    )

                }

                <div className="moodle-card">

                    <h2>

                        Exam Information

                    </h2>

                    <ul>

                        <li>

                            20 Questions

                        </li>

                        <li>

                            30 Minutes

                        </li>

                        <li>

                            No Negative Marking

                        </li>

                        <li>

                            AI Generated Questions

                        </li>

                        <li>

                            Instant Result &
                            Analytics

                        </li>

                    </ul>

                </div>

                <button

                    className="btn btn-primary start-btn"

                    onClick={startExam}

                >

                    Start Exam

                </button>

            </main>

        </div>

    );

}