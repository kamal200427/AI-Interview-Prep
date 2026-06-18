const API_URL = "http://127.0.0.1:8000";

export const getRoadmap = async (
  email,
  profession
) => {

  const response = await fetch(
    `${API_URL}/home/roadmap`,
    {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({
        email,
        profession,
      }),
    }
  );

  if (!response.ok) {
    throw new Error("Failed to load roadmap");
  }

  return await response.json();
};



export const getSavedRoadmap =
async (email) => {

  const response =
    await fetch(
      `http://127.0.0.1:8000/home/roadmap/user/${email}`
    );

  if (!response.ok) {
    throw new Error(
      "Failed to load saved roadmap"
    );
  }

  return await response.json();
};