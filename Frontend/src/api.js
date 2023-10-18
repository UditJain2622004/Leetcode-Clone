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
        // user: JSON.stringify(user),
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
export const getAllQuestions = async () => {
  try {
    const response = await fetch(`http://localhost:3000/questions`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    // console.log(response);
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
export const getAQuestion = async (id) => {
  try {
    const response = await fetch(`http://localhost:3000/questions/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    // console.log(response);
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
export const getProfile = async (id) => {
  try {
    const response = await fetch(`http://localhost:3000/users/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
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
export const login = async (formdata) => {
  try {
    const response = await fetch(`http://localhost:3000/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formdata),
    });
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
export const signup = async (formdata) => {
  try {
    const response = await fetch(`http://localhost:3000/auth/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formdata),
    });
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
export const logout = async (formdata) => {
  try {
    const response = await fetch(`http://localhost:3000/auth/logout`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
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
