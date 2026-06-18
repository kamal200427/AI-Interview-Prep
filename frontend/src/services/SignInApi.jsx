const API_URL = "http://127.0.0.1:8000";

export const saveUser = async (userData) => {
  try {
    const response = await fetch(
      `${API_URL}/user/register`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      }
    );

    return await response.json();
  } catch (error) {
    console.error(error);
  }
};


export const getUser =
async (email) => {

  const response =
    await fetch(
      `${API_URL}/user/${email}`
    );

  if (!response.ok) {

    throw new Error(
      "Failed to fetch user"
    );

  }

  return await response.json();
};

export const updateUser =
async (profile) => {

  const response =
    await fetch(
      "http://127.0.0.1:8000/user/update",
      {
        method:"PUT",

        headers:{
          "Content-Type":
          "application/json"
        },

        body:
        JSON.stringify(
          profile
        )
      }
    );

  return await response.json();
};