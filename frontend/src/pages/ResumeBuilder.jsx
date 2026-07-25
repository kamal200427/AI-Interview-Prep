import React, { useEffect, useState } from "react";
import "../static/ResumeBuilder.css";
// import { getResumeData } from "../services/ResumeApi";
import ResumePreview from "../components/resume/ResumePreview";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import {
    getResumeData,
    createResume,
    updateResume,
    deleteResume
} from "../services/ResumeApi";
const ResumeBuilder = () => {

    const user = JSON.parse(localStorage.getItem("user"));
console.log(user.email);

    const [loading, setLoading] = useState(true);

    const [resume, setResume] = useState({

        // Personal Info

        name: "",

        email: "",

        phone: "",

        location: "",

        github: "",

        linkedin: "",

        role: "",

        picture: "",

        // Summary

        summary: "",

        // Skills

        programming: [],

        web: [],

        database: [],

        machineLearning: [],
        education: [],

        projects: [],

        internships: [],
        certificates: [],
        achievements: [],
        hobbies: [],

        template: "modern"

    });
const [programmingSkill, setProgrammingSkill] = useState("");
const [webSkill, setWebSkill] = useState("");
const [databaseSkill, setDatabaseSkill] = useState("");
const [mlSkill, setMlSkill] = useState("");

// const user = JSON.parse(localStorage.getItem("user"));
// console.log(user.id);

    useEffect(() => {

        loadResume();

    }, []);

    const loadResume = async () => {

        try {

            const response = await getResumeData(user.email);

            setResume({

                name: response.name || "",

                email: response.email || "",

                phone: response.phone || "",

                github: response.github || "",

                linkedin: response.linkedin || "",

                location: response.location || "",

                role: response.role || "",

                picture: response.picture || "",

                summary: response.summary || "",

                programming: response.programming || [],

                web: response.web || [],

                database: response.database || [],

                machineLearning: response.machineLearning || [],
                education: response.education || [],
                projects: response.projects || [],
                internships: response.internships || [],
                certificates: response.certificates || [],
                achievements: response.achievements || [],
                hobbies: response.hobbies || [],

                template: response.template || "modern"

            });

        } catch (err) {

            console.log(err);

        } finally {

            setLoading(false);

        }

    };
const addSkill = (category, value) => {

    if (!value.trim()) return;

    setResume(prev => ({

        ...prev,

        [category]: [...prev[category], value.trim()]

    }));

};

const removeSkill = (category, index) => {

    setResume(prev => ({

        ...prev,

        [category]: prev[category].filter((_, i) => i !== index)

    }));

};
const addEducation = () => {

    setResume(prev => ({

        ...prev,

        education: [

            ...prev.education,

            {

                degree: "",

                college: "",

                startYear: "",

                endYear: "",

                cgpa: ""

            }

        ]

    }));

};

const addProject = () => {

    setResume(prev => ({

        ...prev,

        projects: [

            ...prev.projects,

            {

                title: "",

                description: "",

                techStack: ""

            }

        ]

    }));

};

const addInternship = () => {

    setResume(prev => ({

        ...prev,

        internships: [

            ...prev.internships,

            {

                role: "",

                company: "",

                description: ""

            }

        ]

    }));

};
 const addAchievement = () => {
    setResume({
        ...resume,
        achievements: [...resume.achievements, ""]
    });
};
const updateAchievement = (index, value) => {
    const updatedAchievements = [...resume.achievements];
    updatedAchievements[index] = value;

    setResume({
        ...resume,
        achievements: updatedAchievements
    });
};
const removeAchievement = (index) => {
    const updatedAchievements = resume.achievements.filter(
        (_, i) => i !== index
    );

    setResume({
        ...resume,
        achievements: updatedAchievements
    });
};
const addHobby = () => {
    setResume({
        ...resume,
        hobbies: [...resume.hobbies, ""]
    });
};
const updateHobby = (index, value) => {
    const updatedHobbies = [...resume.hobbies];
    updatedHobbies[index] = value;

    setResume({
        ...resume,
        hobbies: updatedHobbies
    });
};
const removeHobby = (index) => {
    const updatedHobbies = resume.hobbies.filter(
        (_, i) => i !== index
    );

    setResume({
        ...resume,
        hobbies: updatedHobbies
    });
};
const addCertificate = () => {
    setResume({
        ...resume,
        certificates: [...resume.certificates, ""]
    });
};
const updateCertificate = (index, value) => {
    const updatedCertificates = [...resume.certificates];
    updatedCertificates[index] = value;

    setResume({
        ...resume,
        certificates: updatedCertificates
    });
};
const updateArrayField = (section, index, field, value) => {

    setResume(prev => {

        const updated = [...prev[section]];

        updated[index][field] = value;

        return {

            ...prev,

            [section]: updated

        };

    });

};
const downloadResume = async () => {

    const input = document.getElementById("resume-preview");

    const canvas = await html2canvas(input, {

        scale: 2,

        useCORS: true,

        backgroundColor: "#ffffff"

    });

    const imgData = canvas.toDataURL("image/png");

    const pdf = new jsPDF({

        orientation: "portrait",

        unit: "mm",

        format: "a4"

    });

    const pdfWidth = pdf.internal.pageSize.getWidth();

    const pdfHeight =
        (canvas.height * pdfWidth) / canvas.width;

    pdf.addImage(

        imgData,

        "PNG",

        0,

        0,

        pdfWidth,

        pdfHeight

    );

    pdf.save(`${resume.name || "Resume"}.pdf`);

};

    const handleChange = (e) => {

        const { name, value } = e.target;

        setResume(prev => ({

            ...prev,

            [name]: value

        }));

    };
const handleSaveResume = async () => {

    try {

        const response = await getResumeData(user.email);

        if (response) {
    await updateResume(user.email, resume);
} else {
    await createResume(user.email, resume);
}

    } catch {

        await createResume(user.email, resume);

        alert("Resume created successfully.");

    }

};
const handleDeleteResume = async () => {

    const confirmDelete = window.confirm(
        "Are you sure you want to delete your resume?"
    );

    if (!confirmDelete) return;

    try {

        await deleteResume(user.email);

        alert("Resume deleted successfully.");

        loadResume();

    } catch (error) {

        console.error(error);

        alert("Unable to delete resume.");

    }

};

    if (loading) {

        return (

            <div className="resume-loading">

                Loading Resume...

            </div>

        );

    }

    return (

        <div className="resume-page">

            <div className="resume-header">

                <div>

                    <h1>Resume Builder</h1>

                    <p>Create a professional ATS-friendly resume.</p>

                </div>

            </div>

            <div className="resume-container">

                {/* Left Side */}

                <div className="resume-form">

                    {/* Personal Information */}

                    <div className="resume-card">

                        <h2>Personal Information</h2>

                        <div className="form-grid">

                            <div className="form-group">

                                <label>Name *</label>

                                <input
                                    type="text"
                                    name="name"
                                    value={resume.name}
                                    onChange={handleChange}
                                />

                            </div>

                            <div className="form-group">

                                <label>Email *</label>

                                <input
                                    type="email"
                                    name="email"
                                    value={resume.email}
                                    onChange={handleChange}
                                />

                            </div>

                            <div className="form-group">

                                <label>Phone</label>

                                <input
                                    type="text"
                                    name="phone"
                                    value={resume.phone}
                                    onChange={handleChange}
                                />

                            </div>

                            <div className="form-group">

                                <label>Location</label>

                                <input
                                    type="text"
                                    name="location"
                                    value={resume.location}
                                    onChange={handleChange}
                                />

                            </div>

                            <div className="form-group">

                                <label>GitHub</label>

                                <input
                                    type="text"
                                    name="github"
                                    value={resume.github}
                                    onChange={handleChange}
                                />

                            </div>

                            <div className="form-group">

                                <label>LinkedIn</label>

                                <input
                                    type="text"
                                    name="linkedin"
                                    value={resume.linkedin}
                                    onChange={handleChange}
                                />

                            </div>

                            <div className="form-group">

                                <label>Job Role</label>

                                <input
                                    type="text"
                                    name="role"
                                    value={resume.role}
                                    onChange={handleChange}
                                />

                            </div>

                        </div>

                    </div>
                                        {/* Professional Summary */}

                    <div className="resume-card">

                        <h2>Professional Summary</h2>

                        <textarea className="professionsummary"

                            rows="7"

                            placeholder="Write your professional summary..."

                            name="summary"

                            value={resume.summary}

                            onChange={handleChange}

                        />

                    </div>
                                        {/* Skills */}

                     {/* Skills */}

<div className="resume-card">

    <h2>Programming Skills</h2>

    <div className="skill-input">

        <input

            type="text"

            value={programmingSkill}

            placeholder="Add Programming Skill"

            onChange={(e) => setProgrammingSkill(e.target.value)}

            onKeyDown={(e) => {

                if (e.key === "Enter") {

                    e.preventDefault();

                    addSkill("programming", programmingSkill);

                    setProgrammingSkill("");

                }

            }}

        />

        <button

            type="button"

            onClick={() => {

                addSkill("programming", programmingSkill);

                setProgrammingSkill("");

            }}

        >

            Add

        </button>

    </div>

    <div className="skill-list">

        {resume.programming.map((skill, index) => (

            <div className="skill-chip" key={index}>

                {skill}

                <span

                    onClick={() => removeSkill("programming", index)}

                >

                    ✕

                </span>

                    </div>

                ))}

                </div>

                </div>

                </div>
                <div className="resume-card">

    <h2>Web Development</h2>

    <div className="skill-input">

        <input

            value={webSkill}

            placeholder="React, HTML..."

            onChange={(e)=>setWebSkill(e.target.value)}

            onKeyDown={(e)=>{

                if(e.key==="Enter"){

                    e.preventDefault();

                    addSkill("web",webSkill);

                    setWebSkill("");

                }

            }}

        />

        <button

            type="button"

            onClick={()=>{

                addSkill("web",webSkill);

                setWebSkill("");

            }}

        >

            Add

        </button>

    </div>

    <div className="skill-list">

        {

            resume.web.map((skill,index)=>(

                <div className="skill-chip" key={index}>

                    {skill}

                    <span

                        onClick={()=>removeSkill("web",index)}

                    >

                        ✕

                    </span>

                </div>

            ))

        }

    </div>

</div>
<div className="resume-card">

    <h2>Database</h2>

    <div className="skill-input">

        <input

            value={databaseSkill}

            placeholder="SQLite"

            onChange={(e)=>setDatabaseSkill(e.target.value)}

            onKeyDown={(e)=>{

                if(e.key==="Enter"){

                    e.preventDefault();

                    addSkill("database",databaseSkill);

                    setDatabaseSkill("");

                }

            }}

        />

        <button

            type="button"

            onClick={()=>{

                addSkill("database",databaseSkill);

                setDatabaseSkill("");

            }}

        >

            Add

        </button>

    </div>

    <div className="skill-list">

        {

            resume.database.map((skill,index)=>(

                <div className="skill-chip" key={index}>

                    {skill}

                    <span

                        onClick={()=>removeSkill("database",index)}

                    >

                        ✕

                    </span>

                </div>

            ))

        }

    </div>

</div>
<div className="resume-card">

    <h2>Machine Learning</h2>

    <div className="skill-input">

        <input

            value={mlSkill}

            placeholder="TensorFlow"

            onChange={(e)=>setMlSkill(e.target.value)}

            onKeyDown={(e)=>{

                if(e.key==="Enter"){

                    e.preventDefault();

                    addSkill("machineLearning",mlSkill);

                    setMlSkill("");

                }

            }}

        />

        <button

            type="button"

            onClick={()=>{

                addSkill("machineLearning",mlSkill);

                setMlSkill("");

            }}

        >

            Add

        </button>

    </div>

    <div className="skill-list">

        {

            resume.machineLearning.map((skill,index)=>(

                <div className="skill-chip" key={index}>

                    {skill}

                    <span

                        onClick={()=>removeSkill("machineLearning",index)}

                    >

                        ✕

                    </span>

                </div>

            ))

        }

    </div>

</div>
<div className="resume-card">

    <h2>Education</h2>

    {

        resume.education.map((edu,index)=>(

            <div className="education-form" key={index}>

                <input
                    placeholder="Degree"
                    value={edu.degree}
                    onChange={(e)=>
                        updateArrayField(
                            "education",
                            index,
                            "degree",
                            e.target.value
                        )
                    }
                />

                <input
                    placeholder="College"
                    value={edu.college}
                    onChange={(e)=>
                        updateArrayField(
                            "education",
                            index,
                            "college",
                            e.target.value
                        )
                    }
                />

                <input
                    placeholder="Start Year"
                    value={edu.startYear}
                    onChange={(e)=>
                        updateArrayField(
                            "education",
                            index,
                            "startYear",
                            e.target.value
                        )
                    }
                />

                <input
                    placeholder="End Year"
                    value={edu.endYear}
                    onChange={(e)=>
                        updateArrayField(
                            "education",
                            index,
                            "endYear",
                            e.target.value
                        )
                    }
                />

                <input
                    placeholder="CGPA"
                    value={edu.cgpa}
                    onChange={(e)=>
                        updateArrayField(
                            "education",
                            index,
                            "cgpa",
                            e.target.value
                        )
                    }
                />

            </div>

        ))

    }

    <button     className="add-btn"
 onClick={addEducation}>

        + Add Education

    </button>

</div>
<div className="resume-card">

    <h2>Projects</h2>

    {

        resume.projects.map((project,index)=>(

            <div key={index}>
<div className="project-form">

                <input
                    placeholder="Project Title"
                    value={project.title}
                    onChange={(e)=>
                        updateArrayField(
                            "projects",
                            index,
                            "title",
                            e.target.value
                        )
                    }
                />

                <textarea
                    placeholder="Description"
                    value={project.description}
                    onChange={(e)=>
                        updateArrayField(
                            "projects",
                            index,
                            "description",
                            e.target.value
                        )
                    }
                />

                <input
                    placeholder="Tech Stack"
                    value={project.techStack}
                    onChange={(e)=>
                        updateArrayField(
                            "projects",
                            index,
                            "techStack",
                            e.target.value
                        )
                    }
                />
            </div>
            </div>

        ))

    }

    <button     className="add-btn"
 
    onClick={addProject}>

        + Add Project

    </button>

</div>
<div className="resume-card">

    <h2>Internship</h2>

    {

        resume.internships.map((intern,index)=>(

            <div key={index}>
                <div className="internship-form">
                <input
                    placeholder="Role"
                    value={intern.role}
                    onChange={(e)=>
                        updateArrayField(
                            "internships",
                            index,
                            "role",
                            e.target.value
                        )
                    }
                />

                <input
                    placeholder="Company"
                    value={intern.company}
                    onChange={(e)=>
                        updateArrayField(
                            "internships",
                            index,
                            "company",
                            e.target.value
                        )
                    }
                />

                <textarea
                    placeholder="Description"
                    value={intern.description}
                    onChange={(e)=>
                        updateArrayField(
                            "internships",
                            index,
                            "description",
                            e.target.value
                        )
                    }
                />
            </div>
            </div>

        ))

    }

    <button     className="add-btn"
 onClick={addInternship}>

        + Add Internship

    </button>

</div>
<div className="resume-card">
<h3>Certificates</h3>

{resume.certificates.map((item, index) => (
            <div className="dynamic-input" key={index}>
    <input
        type="text"
        placeholder="Enter the certificate Description"
        key={index}
        value={item}
        onChange={(e) => updateCertificate(index, e.target.value)}
    />
</div>
))
}

<button className="add-btn" onClick={addCertificate}>
    + Add Certificate
</button>
</div>
<div className="dynamic-section">
    <h3>Achievements</h3>

    {resume.achievements.map((achievement, index) => (
        <div className="dynamic-input" key={index}>
            <input
                type="text"
                placeholder="Enter Achievement"
                value={achievement}
                onChange={(e) =>
                    updateAchievement(index, e.target.value)
                }
            />

            <button
                type="button"
                className="remove-btn"
                onClick={() => removeAchievement(index)}
            >
                Remove
            </button>
        </div>
    ))}

    <button
        type="button"
        className="add-btn"
        onClick={addAchievement}
    >
        + Add Achievement
    </button>
</div>
<div className="dynamic-section">
    <h3>Hobbies</h3>

    {resume.hobbies.map((hobby, index) => (
        <div className="dynamic-input" key={index}>
            <input
                type="text"
                placeholder="Enter Hobby"
                value={hobby}
                onChange={(e) =>
                    updateHobby(index, e.target.value)
                }
            />

            <button
                type="button"
                className="remove-btn"
                onClick={() => removeHobby(index)}
            >
                Remove
            </button>
        </div>
    ))}

    <button
        type="button"
        className="add-btn"
        onClick={addHobby}
    >
        + Add Hobby
    </button>
</div>
<div className="resume-actions">

    <button
        className="save-btn"
        onClick={handleSaveResume}
    >
        💾 Save Resume
    </button>

    <button
        className="delete-btn"
        onClick={handleDeleteResume}
    >
        🗑 Delete Resume
    </button>

    <button
        className="download-btn"
        onClick={downloadResume}
    >
        📄 Download Resume
    </button>

</div>
                                {/* Right Side */}

                <div className="resume-preview">

                    <ResumePreview

                        resume={resume}

                    />

                </div>

            </div>

        </div>

    );

};

export default ResumeBuilder;