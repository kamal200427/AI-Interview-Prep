const API_URL = "http://127.0.0.1:8000";

// Send OTP
export const sendOtpApi = async (email) => {

    const response = await fetch(
        `${API_URL}/auth/send-otp`,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email,
            }),
        }
    );

    return await response.json();
};

// Verify OTP
export const verifyOtpApi = async (email, otp) => {

    const response = await fetch(
        `${API_URL}/auth/verify-otp`,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email,
                otp,
            }),
        }
    );

    return await response.json();
};

// Get User
export const getUser = async (email) => {

    const response = await fetch(
        `${API_URL}/user/${email}`
    );

    return await response.json();
};