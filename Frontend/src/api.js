export const execute = async (code) => {
  try {
    console.log(code);
    const response = await fetch("http://localhost:3000", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(code),
      code,
    });

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
