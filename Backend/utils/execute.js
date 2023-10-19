import axios from "axios";

const execute_params = {
  method: "POST",
  //   url: "https://judge0-ce.p.rapidapi.com/submissions/batch",
  //   url: "https://judge0-ce.p.rapidapi.com/submissions/",
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
  // url: "https://judge0-ce.p.rapidapi.com/submissions/batch?tokens=",
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

const create_submission_req = (code_options, testCases) => {
  const options = { ...execute_params };
  options.url = "https://judge0-ce.p.rapidapi.com/submissions/batch";
  const submissions = Object.keys(testCases).map((el) => {
    return { ...code_options, stdin: el, expected_output: testCases[el] };
  });
  options.data = {};
  options.data.submissions = submissions;
  return options;
};

const get_result_req = (response) => {
  const options = { ...get_result_params };
  options.url = "https://judge0-ce.p.rapidapi.com/submissions/batch?tokens=";
  for (const el in response.data) {
    options.url += `${response.data[el].token},`;
  }
  options.url = options.url.slice(0, -1);
  options.url += "&base64_encoded=true";
  return options;
};

export const make_batch_request = async (code_options, testCases) => {
  try {
    //prettier-ignore
    const create_submission_options = create_submission_req(code_options,testCases);

    const response = await axios.request(create_submission_options);

    const get_result_options = get_result_req(response);

    let result = await axios.request(get_result_options);

    //prettier-ignore
    while (result.data.submissions.some((res) => res.status.id === 1 || res.status.id === 2)) {
      result = await axios.request(get_result_options);
    }

    return result.data;
  } catch (error) {
    console.error(error);
  }
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
    // console.log(response2.data);
  } catch (error) {
    console.error(error);
  }
};
