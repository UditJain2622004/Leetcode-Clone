export const execute = async (code, questionID) => {
  try {
    console.log(code);
    const response = await fetch(
      `http://localhost:3000/questions/submit/${questionID}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(code),
        // code,
      }
    );
    console.log(response);
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error.message);
    return {
      status: "requestFail",
      error: "Something Went Wrong.",
    };
  }
};
