const make_request = async (url, method, body) => {
  try {
    const options = {
      method,
      headers: {
        "Content-Type": "application/json",
      },
    };
    if (body) options.body = body;
    const response = await fetch(url, options);
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

export const execute = async (code, questionID) => {
  const response = await make_request(
    `http://localhost:3000/questions/submit/${questionID}`,
    "POST",
    JSON.stringify(code)
  );

  return response;
};
export const getAllQuestions = async () => {
  const response = make_request("http://localhost:3000/questions", "GET");
  return response;
};
export const getAQuestion = async (id) => {
  const response = make_request(`http://localhost:3000/questions/${id}`, "GET");
  return response;
};

export const getProfile = async (id) => {
  const response = make_request(`http://localhost:3000/users/${id}`, "GET");
  return response;
};
export const login = async (formdata) => {
  const response = make_request(
    `http://localhost:3000/auth/login`,
    "POST",
    JSON.stringify(formdata)
  );
  return response;
};
export const signup = async (formdata) => {
  const response = make_request(
    "http://localhost:3000/auth/signup",
    "POST",
    JSON.stringify(formdata)
  );
  return response;
};

export const logout = async (formdata) => {
  const response = make_request("http://localhost:3000/auth/logout", "GET");
  return response;
};
