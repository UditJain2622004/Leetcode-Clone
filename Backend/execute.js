import axios from "axios";

// const inputs = ["World", "Udit", "Jain"];

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const execute_params = {
  method: "POST",
  //   url: "https://judge0-ce.p.rapidapi.com/submissions/batch",
  //   params: {
  //     base64_encoded: "true",
  //   },
  headers: {
    "content-type": "application/json",
    "Content-Type": "application/json",
    "X-RapidAPI-Key": "b10063b6f7mshd920a35de930cd9p130a5djsncf74b05d49c2",
    // "X-RapidAPI-Key": "59feebeae6msh5e475fbaffe97dbp1386c8jsnabe7693918e8",
    "X-RapidAPI-Host": "judge0-ce.p.rapidapi.com",
  },
  //   data: {
  //     submissions: [
  //       {
  //         language_id: 71,
  //         source_code: "cHJpbnQoImhlbGxvIGZyb20gUHl0aG9uIikK",
  //       },
  //       {
  //         language_id: 71,
  //         source_code: "cHJpbnQoImhlbGxvIGZyb20gUHl0aG9uIikK",
  //       },
  //     ],
  //   },
};

const get_result_params = {
  method: "GET",
  //   url: "https://judge0-ce.p.rapidapi.com/submissions/batch?tokens=",
  // url: "https://judge0-ce.p.rapidapi.com/submissions/",
  //   params: {
  //     base64_encoded: "true",
  //     fields: "*",
  //   },
  headers: {
    "X-RapidAPI-Key": "b10063b6f7mshd920a35de930cd9p130a5djsncf74b05d49c2",
    // "X-RapidAPI-Key": "59feebeae6msh5e475fbaffe97dbp1386c8jsnabe7693918e8",
    "X-RapidAPI-Host": "judge0-ce.p.rapidapi.com",
    "Content-Type": "application/json",
  },
};

export const make_request = async (code_options, testCase, answer) => {
  try {
    code_options.expected_output = answer;
    code_options.stdin = testCase;
    const params = { ...execute_params };
    params.url = "https://judge0-ce.p.rapidapi.com/submissions/";
    params.data = code_options;
    const response = await axios.request(params);
    console.log(response.data);

    const params2 = { ...get_result_params };
    params2.url = `https://judge0-ce.p.rapidapi.com/submissions/${response.data.token}?base64_encoded=true`;

    let response2 = await axios.request(params2);
    while (response2.data.status.id == 1 || response2.data.status.id == 2) {
      response2 = await axios.request(params2);
    }
    console.log(response2.data);
  } catch (error) {
    console.error(error);
  }
};

export const make_batch_request = async (code_options, testCases, answers) => {
  try {
    const params = { ...execute_params };
    params.url = "https://judge0-ce.p.rapidapi.com/submissions/batch";
    const submissions = testCases.map((el, i) => {
      return { ...code_options, stdin: el, expected_output: answers[i] };
    });
    params.data = {};
    params.data.submissions = submissions;

    // console.log(params.data);

    const response = await axios.request(params);

    // console.log(response.data);
    const params2 = { ...get_result_params };
    params2.url = "https://judge0-ce.p.rapidapi.com/submissions/batch?tokens=";
    for (const el in response.data) {
      params2.url += `${response.data[el].token},`;
    }
    params2.url = params2.url.slice(0, -1);
    // console.log(params2.url);
    params2.url += "&base64_encoded=true";

    await delay(1000);
    const response2 = await axios.request(params2);

    return response2.data;
    // let response2;
    // setTimeout(async function () {
    //   response2 = await axios.request(params2);
    //   return response2.data;
    // }, 1000);
    // let response2 = await axios.request(params2);
    // while (response2.data.status_id == 1 || response2.data.status_id == 2) {
    //   response2 = await axios.request(params2);
    // }
    // console.log(response2.data);
  } catch (error) {
    console.error(error);
  }
};

// *************************************************************// const authorize = {
//   method: "GET",
//   url: "https://ce.judge0.com/authorize",
//   //   params: {
//   //     base64_encoded: "true",
//   //     fields: "*",
//   //   },
//   headers: {
//     // "X-RapidAPI-Key": "b10063b6f7mshd920a35de930cd9p130a5djsncf74b05d49c2",
//     "X-Auth-User": "a1133bc6-a0f6-46bf-a2d8-6157418c6fe2",
//     // "X-RapidAPI-Key": "59feebeae6msh5e475fbaffe97dbp1386c8jsnabe7693918e8",
//     // "X-RapidAPI-Host": "judge0-ce.p.rapidapi.com",
//     // "Content-Type": "application/json",
//   },
// };
// const temp = {
//   method: "GET",
//   url: "https://ce.judge0.com/submissions/?base64_encoded=false&fields=status,language,time&page=4&per_page=2",
//   //   params: {
//   //     base64_encoded: "true",
//   //     fields: "*",
//   //   },
//   headers: {
//     // "X-RapidAPI-Key": "b10063b6f7mshd920a35de930cd9p130a5djsncf74b05d49c2",
//     "X-RapidAPI-Key": "59feebeae6msh5e475fbaffe97dbp1386c8jsnabe7693918e8",
//     "X-RapidAPI-Host": "judge0-ce.p.rapidapi.com",
//     "Content-Type": "application/json",
//   },
// };

// const make_request2 = async () => {
//   try {
//     // const params = { ...options }; // Create a new object based on options

//     const auth = await axios.request(authorize);
//     const response = await axios.request(temp);
//     console.log(response.data);
//   } catch (error) {
//     console.error(error);
//   }
// };
// make_request2();
