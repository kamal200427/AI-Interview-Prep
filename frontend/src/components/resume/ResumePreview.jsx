import React from "react";
import {
    Mail,
    Phone,
    MapPin,
    User
} from "lucide-react";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import "./ResumePreview.css";
const ResumePreview = ({ resume }) => {

    return (

        <div className="preview-paper"   id="resume-preview">

            {/* ================= HEADER ================= */}

            <div className="preview-header">

                <div className="preview-profile">

                    {
                        resume.picture ?

                        <img
                            src={resume.picture}
                            alt={resume.name}
                            className="preview-avatar"
                        />

                        :

                        <div className="preview-avatar placeholder">

                            <User size={40} />

                        </div>

                    }

                    <div>

                        <h1>

                            {resume.name || "Your Name"}

                        </h1>

                        <h3>

                            {resume.role || "Software Engineer"}

                        </h3>

                    </div>

                </div>

            </div>

            {/* ================= CONTACT ================= */}

            <div className="preview-contact">

                {
                    resume.email &&

                    <div className="contact-item">

                        <Mail size={15} />

                        <span>{resume.email}</span>

                    </div>

                }

                {
                    resume.phone &&

                    <div className="contact-item">

                        <Phone size={15} />

                        <span>{resume.phone}</span>

                    </div>

                }

                {
                    resume.location &&

                    <div className="contact-item">

                        <MapPin size={15} />

                        <span>{resume.location}</span>

                    </div>

                }

                {
                    resume.github &&

                    <div className="contact-item">

                        <FaGithub size={15} />

                        <span>{resume.github}</span>

                    </div>

                }

                {
                    resume.linkedin &&

                    <div className="contact-item">

                        <FaLinkedin size={15} />

                        <span>{resume.linkedin}</span>

                    </div>

                }

            </div>

            {/* ================= SUMMARY ================= */}

            <div className="preview-section">

                <h2>

                    Professional Summary

                </h2>

                <div className="section-line"></div>

                <p>

                    {
                        resume.summary ||

                        "Write a short professional summary describing your experience, strengths, career goals and technical expertise."

                    }

                </p>

            </div>

            {/* ================= SKILLS ================= */}

            <div className="preview-section">

                <h2>

                    Technical Skills

                </h2>

                <div className="section-line"></div>

                <div className="skills-container">

    {
        resume.programming?.length > 0 && (

            <div className="skill-category">

                <h4>Programming</h4>

                <div className="skill-tags">

                    {

                        resume.programming.map((skill, index) => (

                            <span
                                className="preview-skill"
                                key={index}
                            >
                                {skill}
                            </span>

                        ))

                    }

                </div>

            </div>

        )
    }

    {
        resume.web?.length > 0 && (

            <div className="skill-category">

                <h4>Web Development</h4>

                <div className="skill-tags">

                    {

                        resume.web.map((skill, index) => (

                            <span
                                className="preview-skill"
                                key={index}
                            >
                                {skill}
                            </span>

                        ))

                    }

                </div>

            </div>

        )
    }

    {
        resume.database?.length > 0 && (

            <div className="skill-category">

                <h4>Database</h4>

                <div className="skill-tags">

                    {

                        resume.database.map((skill, index) => (

                            <span
                                className="preview-skill"
                                key={index}
                            >
                                {skill}
                            </span>

                        ))

                    }

                </div>

            </div>

        )
    }

    {
        resume.machineLearning?.length > 0 && (

            <div className="skill-category">

                <h4>Machine Learning</h4>

                <div className="skill-tags">

                    {

                        resume.machineLearning.map((skill, index) => (

                            <span
                                className="preview-skill"
                                key={index}
                            >
                                {skill}
                            </span>

                        ))

                    }

                </div>

            </div>

        )
    }

</div>
{/* ================= EDUCATION ================= */}

<div className="preview-section">

    <h2>

        Education

    </h2>

    <div className="section-line"></div>

    {

        resume.education?.length > 0 ?

        resume.education.map((edu, index) => (

            <div
                className="education-card"
                key={index}
            >

                <h3>

                    {edu.degree}

                </h3>

                <h4>

                    {edu.college}

                </h4>

                <span>

                    {edu.startYear} - {edu.endYear}

                </span>

                {

                    edu.cgpa && (

                        <p>

                            CGPA : {edu.cgpa}

                        </p>

                    )

                }

            </div>

        ))

        :

        <p className="placeholder">

            Education details will appear here.

        </p>

    }

</div>
{/* ================= PROJECTS ================= */}

<div className="preview-section">

    <h2>

        Projects

    </h2>

    <div className="section-line"></div>

    {

        resume.projects?.length > 0 ?

        resume.projects.map((project, index) => (

            <div
                className="project-card"
                key={index}
            >

                <h3>

                    {project.title}

                </h3>

                <p>

                    {project.description}

                </p>

                {

                    project.techStack && (

                        <div className="tech-stack">

                            {

                                project.techStack.split(",").map((tech, i) => (

                                    <span
                                        className="preview-skill"
                                        key={i}
                                    >
                                        {tech.trim()}
                                    </span>

                                ))

                            }

                        </div>

                    )

                }

            </div>

        ))

        :

        <p className="placeholder">

            Projects will appear here.

        </p>

    }

</div>
{/* ================= INTERNSHIPS ================= */}

<div className="preview-section">

    <h2>

        Internship

    </h2>

    <div className="section-line"></div>

    {

        resume.internships?.length > 0 ?

        resume.internships.map((internship, index) => (

            <div
                className="project-card"
                key={index}
            >

                <h3>

                    {internship.role}

                </h3>

                <h4>

                    {internship.company}

                </h4>

                <p>

                    {internship.description}

                </p>

            </div>

        ))

        :

        <p className="placeholder">

            Internship experience will appear here.

        </p>

    }

</div>
{/* Certificates */}
{resume.certificates?.length > 0 && (
    <section className="resume-section">
        <h2>Certificates</h2>

        <ul>
            {resume.certificates.map((certificate, index) => (
                <li key={index}>
                    {certificate}
                </li>
            ))}
        </ul>
    </section>
)}
   {/* Achievements */}
{resume.achievements?.length > 0 && (
    <section className="resume-section">
        <h2>Achievements</h2>

        <ul>
            {resume.achievements.map((achievement, index) => (
                <li key={index}>
                    {achievement}
                </li>
            ))}
        </ul>
    </section>
)}
{/* Hobbies */}
{resume.hobbies?.length > 0 && (
    <section className="resume-section">
        <h2>Hobbies</h2>

        <ul>
            {resume.hobbies.map((hobby, index) => (
                <li key={index}>
                    {hobby}
                </li>
            ))}
        </ul>
    </section>
)}
         </div>

        </div>

    );

};

export default ResumePreview;