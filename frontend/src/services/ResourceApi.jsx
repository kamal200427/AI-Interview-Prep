const API_URL = "http://127.0.0.1:8000";

/*
=========================================
1. Search YouTube Playlists
=========================================
POST /search/youtube_video
=========================================
*/

export const searchYoutubeResources = async (query) => {
  try {
    const response = await fetch(
      `${API_URL}/search/youtube_video`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          query,
        }),
      }
    );

    if (!response.ok) {
      throw new Error("Failed to search YouTube resources");
    }

    const data = await response.json();

    return data.response || [];
  } catch (error) {
    console.error("YouTube Search Error:", error);
    throw error;
  }
};

/*
=========================================
2. Search PDF Resources
=========================================
POST /search/pdf_book_resource
=========================================
*/

export const searchPdfResources = async (query) => {
  try {
    const response = await fetch(
      `${API_URL}/search/pdf_book_resource`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          query,
        }),
      }
    );

    if (!response.ok) {
      throw new Error("Failed to search PDF resources");
    }

    const data = await response.json();

    return data.response || [];
  } catch (error) {
    console.error("PDF Search Error:", error);
    throw error;
  }
};

/*
=========================================
3. Combined Search
=========================================
Library Page will use this
=========================================
*/

export const searchResources = async (query) => {
  try {
    const [youtube, pdfs] =
      await Promise.all([
        searchYoutubeResources(query),
        searchPdfResources(query),
      ]);

    return {
      youtube,
      pdfs,
    };
  } catch (error) {
    console.error(error);
    throw error;
  }
};

 

 

export const saveResources = async (
  resource
) => {

  const response =
    await fetch(
      `${API_URL}/resource/select`,
      {
        method: "POST",
        headers: {
          "Content-Type":
            "application/json"
        },
        body: JSON.stringify(
          resource
        )
      }
    );

  return await response.json();
};

 export const removeResource =
async (user_id, link) => {

  const response =
    await fetch(
      `http://127.0.0.1:8000/resource/remove?user_id=${user_id}&link=${encodeURIComponent(link)}`,
      {
        method: "DELETE"
      }
    );

  return await response.json();
};
export const checkResource =
  async (
    user_id,
    link
  ) => {

    const response =
      await fetch(
        `${API_URL}/resource/check`,
        {
          method: "POST",
          headers: {
            "Content-Type":
              "application/json"
          },
          body: JSON.stringify({
            user_id,
            link
          })
        }
      );

    return await response.json();
};