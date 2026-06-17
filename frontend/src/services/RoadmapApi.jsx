const API_URL = "http://127.0.0.1:8000";

export const getRoadmap = async (
  email
) => {

  const response = await fetch(
    `${API_URL}/roadmap/${email}`
  );

  if (!response.ok) {
    throw new Error(
      "Failed to load roadmap"
    );
  }

  return await response.json();
};