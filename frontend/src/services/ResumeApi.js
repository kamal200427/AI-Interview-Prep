const API = "http://127.0.0.1:8000/resume";

export const getResumeData = async (userId) => {
    try {
        const response = await fetch(`${API}/${userId}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });

        if (!response.ok) {
            throw new Error(`HTTP Error: ${response.status}`);
        }

        return await response.json();
    } catch (error) {
        console.error("Error fetching resume data:", error);
        throw error;
    }
};
export const createResume = async (email, resumeData) => {

    const response = await fetch(`${API}/${email}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(resumeData),
    });
    console.log(await response.json());   // <-- Add this
    if (!response.ok) {
        throw new Error(`HTTP Error: ${response.status}`);
    }

    return await response.json();
};
export const updateResume = async (userId, resumeData) => {
    try {
        const response = await fetch(`${API}/${userId}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(resumeData),
        });
            console.log(await response.json());   // <-- Add this
        if (!response.ok) {
            throw new Error(`HTTP Error: ${response.status}`);
        }

        return await response.json();
    } catch (error) {
        console.error("Error updating resume:", error);
        throw error;
    }
};
export const deleteResume = async (userId) => {
    try {
        const response = await fetch(`${API}/${userId}`, {
            method: "DELETE",
        });

        if (!response.ok) {
            throw new Error(`HTTP Error: ${response.status}`);
        }

        return await response.json();
    } catch (error) {
        console.error("Error deleting resume:", error);
        throw error;
    }
};
