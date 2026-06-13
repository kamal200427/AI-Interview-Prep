const API_URL = "http://127.0.0.1:8000";

/*
--------------------------------------------------
1. Subject Knowledge Chat
Example:
"Explain Binary Search"
"Difference between TCP and UDP"
--------------------------------------------------
POST /subject/{subject}
--------------------------------------------------
*/

 export const askSubjectQuestion =
async (subject, query) => {

  const response = await fetch(
    `${API_URL}/content/${subject}`,
    {
      method: "POST",

      headers: {
        "Content-Type":
          "application/json",
      },

      body: JSON.stringify({
        query: query,
      }),
    }
  );

  return response.json();
};
/*
--------------------------------------------------
2. Project / Platform Assistant
Example:
"How do I take a mock interview?"
"Where can I find DBMS resources?"
--------------------------------------------------
POST /content/{subject}
--------------------------------------------------
*/

export const askPlatformQuestion = async (
  question
) => {
  try {
    const response = await fetch(
      `${API_URL}/overview/chatbot`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          query: question,
        }),
      }
    );

    if (!response.ok) {
      throw new Error("Failed to get answer");
    }

    return await response.json();
  } catch (error) {
    console.error(error);
    throw error;
  }
};