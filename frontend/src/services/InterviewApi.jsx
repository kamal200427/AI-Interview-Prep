const API_URL = "http://127.0.0.1:8000";

/*
=====================================================
Common Request Function
=====================================================
*/

const request = async (endpoint, options = {}) => {
  try {
    const response = await fetch(`${API_URL}${endpoint}`, {
      headers: {
        "Content-Type": "application/json",
      },
      ...options,
    });

    const data = await response.json();

    if (!response.ok) {
      throw data;
    }

    return data;
  } catch (error) {
    console.error(error);
    throw (
      error || {
        message: "Something went wrong.",
      }
    );
  }
};

/* =====================================================
   Start Interview
===================================================== */

export const startInterview = async ({
  mode,
    role,
    difficulty,
    experience_years,
}) => {
  return request("/interview/start", {
    method: "POST",
    body: JSON.stringify({
      mode,
       role,
      difficulty,
      experience_years
    }),
  });
};

/* =====================================================
   Submit Answer
===================================================== */

export const submitAnswer = async ({
  uid,
  answer,
}) => {

  return request("/interview/chat", {

    method: "POST",

    body: JSON.stringify({

      uid,

      answer,

    }),

  });

};

/* =====================================================
   Get Final Report
===================================================== */

export const getInterviewReport = async (session_id) => {
  return request(`/interview/result/${session_id}`);
};

/* =====================================================
   Finish Interview
===================================================== */

export const finishInterview = async (session_id) => {
  return request(`/interview/end/${session_id}`, {
    method: "POST",
  });
};

/* =====================================================
   Interview History
===================================================== */

export const getInterviewHistory = async (user_id) => {
  return request(`/interview/history/${user_id}`);
};

/* =====================================================
   Skip Question
===================================================== */

export const skipQuestion = async ({
  session_id,
  question_id,
}) => {
  return request("/interview/skip", {
    method: "POST",
    body: JSON.stringify({
      session_id,
      question_id,
    }),
  });
};

/* =====================================================
   Retry Interview
===================================================== */

export const retryInterview = async (session_id) => {
  return request(`/interview/retry/${session_id}`, {
    method: "POST",
  });
};

/* =====================================================
   Default Export
===================================================== */

const InterviewApi = {
  startInterview,
  submitAnswer,
  getInterviewReport,
  finishInterview,
  getInterviewHistory,
  skipQuestion,
  retryInterview,
};

export default InterviewApi;