import * as core from "@actions/core";
import * as github from "@actions/github";

function validateState(value: string) {
  if (
    value === "error" ||
    value === "failure" ||
    value === "inactive" ||
    value === "in_progress" ||
    value === "queued" ||
    value === "pending" ||
    value === "success"
  ) {
    return value;
  }
  throw new TypeError("Invalid state value");
}

function validateDeploymentId(value: string) {
  const number = Number(value);
  if (!isNaN(number)) return number;
  throw new TypeError("Invalid deployment_id, should be a number");
}

export async function main() {
  const { repo } = github.context;
  const token = core.getInput("token");
  const client = github.getOctokit(token);

  await client.request(
    "POST /repos/{owner}/{repo}/deployments/{deployment_id}/statuses",
    {
      owner: repo.owner,
      repo: repo.repo,
      deployment_id: validateDeploymentId(core.getInput("deployment_id")),
      state: validateState(core.getInput("state")),
      log_url: core.getInput("log_url"),
      description: core.getInput("description"),
      environment: core.getInput("environment") as
        | "production"
        | "staging"
        | "qa",
      environment_url: core.getInput("environment_url"),
    }
  );
}

main().catch((err) => core.setFailed(err));
