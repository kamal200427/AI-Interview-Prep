const API_URL = "http://127.0.0.1:8000";

export const getExamResults = async (userID) => {
  const response = await fetch(`${API_URL}/exam-results/${userID}`);

  if (!response.ok) {
    throw new Error("Failed to fetch exam results");
  }

  return await response.json();
};