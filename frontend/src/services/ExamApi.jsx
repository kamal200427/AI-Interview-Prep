const BASE_URL = "http://127.0.0.1:8000";

export const getQuestions = async (subject) => {
  try {
    const response = await fetch(
      `${BASE_URL}/question/${subject}`,
      { 
         method: "POST"
        }
    );

    if (!response.ok) {
      throw new Error("Failed to fetch questions");
    }

    const data = await response.json();

    return data;
  } catch (error) {
    console.error("Error fetching questions:", error);
    throw error;
  }
};

export const getMultipleQuestions =
async(subjects)=>{

const response =
await fetch(

`${BASE_URL}/exam/questions`,

{

method:"POST",

headers:{

"Content-Type":
"application/json"

},

body:JSON.stringify({

subjects

})

}

);

return response.json();

}


export const getMultipleExam =
async (subjects) => {

    const response =
    await fetch(

        `${BASE_URL}/exam/multiple`,

        {

            method:"POST",

            headers:{

                "Content-Type":

                "application/json"

            },

            body:JSON.stringify({

                subjects

            })

        }

    );

    return await response.json();

};

export const saveAnswer =
async (
data

)=>{

const response =
await fetch(

`${BASE_URL}/save-answer`,

{

method:"POST",

headers:{

"Content-Type":
"application/json"

},

body:JSON.stringify(data)

}

);

return await response.json();

};

export const finishExam =
async (
sessionId
)=>{

const response =
await fetch(

`${BASE_URL}/finish-exam`,

{

method:"POST",

headers:{

"Content-Type":
"application/json"

},

body:JSON.stringify({

 session_id: sessionId

})

}

);

return await response.json();

};

export const createExamSession = async(data)=>{

const res=

await fetch(

`${BASE_URL}/exam/session`,

{

method:"POST",

headers:{

"Content-Type":"application/json"

},

body:JSON.stringify(data)

}

);

return await res.json();

};



export const finishSession = async(data)=>{

const res=

await fetch(

`${BASE_URL}/exam/session`,

{

method:"PUT",

headers:{

"Content-Type":"application/json"

},

body:JSON.stringify(data)

}

);

return await res.json();

};

export const getReviewExam = async(session_id)=>{

    const res = await fetch(

        `${BASE_URL}/exam/review/${session_id}`

    );

    return await res.json();

};