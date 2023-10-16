const accepted = {
  stdout: "dHJ1ZQo=\n",
  time: "0.008",
  memory: 3212,
  stderr: null,
  token: "e626a835-b2a9-4f8d-a31b-883293efd028",
  compile_output: null,
  message: null,
  status: { id: 3, description: "Accepted" },
};

const wrongAnswer = {
  stdout: "dHJ1ZQo=\n",
  time: "0.008",
  memory: 3196,
  stderr: null,
  token: "d0e16d33-1546-42b9-8307-b4a45ad52cf1",
  compile_output: null,
  message: null,
  status: { id: 4, description: "Wrong Answer" },
};

const runTimeError = [
  {
    stdout: null,
    time: "0.009",
    memory: 3176,
    stderr:
      "ICBGaWxlICJzY3JpcHQucHkiLCBsaW5lIDUKICAgIGVsaWYgbnVtID4gMQog\n" +
      "ICAgICAgICAgICAgICBeClN5bnRheEVycm9yOiBpbnZhbGlkIHN5bnRheAo=\n",
    token: "454f1e2f-ae8e-4e33-aa24-e8ff5d2ba105",
    compile_output: null,
    message: "RXhpdGVkIHdpdGggZXJyb3Igc3RhdHVzIDE=\n",
    status: { id: 11, description: "Runtime Error (NZEC)" },
  },
  {
    stdout: null,
    time: "0.001",
    memory: 876,
    stderr:
      "cnVuLnNoOiBsaW5lIDE6ICAgICAzIEZsb2F0aW5nIHBvaW50IGV4Y2VwdGlv\n" +
      "bihjb3JlIGR1bXBlZCkgTERfTElCUkFSWV9QQVRIPS91c3IvbG9jYWwvZ2Nj\n" +
      "LTcuNC4wL2xpYjY0IC4vYS5vdXQK\n",
    token: "39d81220-2e5e-4bd3-b265-ef0569f85c8a",
    compile_output:
      "bWFpbi5jcHA6IEluIGZ1bmN0aW9uIOKAmGludCBtYWluKCnigJk6Cm1haW4u\n" +
      "Y3BwOjY6MTI6IHdhcm5pbmc6IGRpdmlzaW9uIGJ5IHplcm8gWy1XZGl2LWJ5\n" +
      "LXplcm9dCiAgICAgY291dDw8NS8wOwogICAgICAgICAgIH5efgo=\n",
    message: "RXhpdGVkIHdpdGggZXJyb3Igc3RhdHVzIDEzNg==\n",
    status: { id: 11, description: "Runtime Error (NZEC)" },
  },
];
export const check_answer = (results) => {
  let correct = 0;
  let response;
  for (const result in results) {
    console.log(results[result]);
    const el = results[result];
    if (el.status.id == 3) {
      correct = correct + 1;
      continue;
    } else {
      let { message, compile_output, stderr, stdout } = el;
      response = {
        success: false,
        total_cases: results.length,
        passed_cases: correct,
        description: el.status.description,
        message: message ? atob(message) : message,
        compile_output: compile_output ? atob(compile_output) : compile_output,
        stderr: stderr ? atob(stderr) : stderr,
        stdout: stdout ? atob(stdout) : stdout,
      };
      break;
    }
  }

  if (correct == results.length) {
    const { time, memory } = results[0];
    response = {
      success: true,
      time,
      memory,
    };
  }

  return response;
};
