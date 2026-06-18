const API_URL = "http://127.0.0.1:8000";

export const getCourseResources =
async (email) => {

  const response =
    await fetch(
      `${API_URL}/course/${email}`
    );

  return await response.json();
};

export const updateCompletion =
async (
  user_id,
  link,
  completion
) => {

  const response =
    await fetch(
      `${API_URL}/course/completion`,
      {
        method: "PUT",

        headers: {
          "Content-Type":
          "application/json"
        },

        body: JSON.stringify({
          user_id,
          link,
          completion
        })
      }
    );

  return await response.json();
};

export const markSubjectComplete =
async (
  userId,
  subject
) => {

  const response =
  await fetch(

    `${API_URL}/subject/complete?user_id=${userId}&subject=${subject}`,

    {
      method:"PUT"
    }
  );

  return await response.json();
};