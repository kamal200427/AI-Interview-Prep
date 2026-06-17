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

 

export const saveResource=async(resource)=>{
  // console.log("resources",response);

  const response=await fetch(
    `${API_URL}/resource/select`,
    {
      method:"POST",

      headers:{
        "Content-Type":"application/json"
      },

      body:JSON.stringify(resource)
    }
  );
  
  const result = await response.json();
  console.log(
  JSON.stringify(result, null, 2)
);
if (!response.ok) {
    throw new Error("Failed");
  }
   
return result;
};


export const getUserResources=async(userId)=>{

  const response=await fetch(
    `${API_URL}/resource/user/${userId}`
  );

  return response.json();
};