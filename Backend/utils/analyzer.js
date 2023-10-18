import Submission from "../models/submissionModel.js";

export const check_answer = async (results, language_id) => {
  let correct = 0;
  let response;
  for (const result in results) {
    // console.log(results[result]);
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
        id: el.status.id,
        message: message ? atob(message) : message,
        compile_output: compile_output ? atob(compile_output) : compile_output,
        stderr: stderr ? atob(stderr) : stderr,
        stdout: stdout ? atob(stdout) : stdout,
      };
      break;
    }
  }

  if (correct == results.length) {
    const { time, memory, status } = results[0];
    const accepted_submissions = await Submission.find({ id: 3, language_id });
    let time_count = 0;
    let memory_count = 0;
    for (let i = 0; i < accepted_submissions.length; i++) {
      if (time * 1 <= accepted_submissions[i].time) time_count += 1;
      if (memory * 1 <= accepted_submissions[i].memory) memory_count += 1;
    }
    const time_status = (time_count / accepted_submissions.length) * 100 || 0;
    const memory_status =
      (memory_count / accepted_submissions.length) * 100 || 0;
    response = {
      total_cases: results.length,
      passed_cases: correct,
      description: status.description,
      id: status.id,
      success: true,
      time,
      memory,
      time_status: time_status.toFixed(2),
      memory_status: memory_status.toFixed(2),
    };
  }

  return response;
};
