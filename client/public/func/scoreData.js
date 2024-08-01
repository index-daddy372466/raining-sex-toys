const token = await fetch("/game/token")
  .then((r) => r.json())
  .then((d) => d.token);
const condition = {};
condition.best = "best";
condition.worst = "worst";

let id = token.identity;
// console.log(id)
export default async function scoreData() {
  // all scores
  let scores = await fetch("/scores/all")
      .then((r) => r.json())
      .then((d) => d.data),
    // scores by current user
    userScores = await fetch(`/scores/users/${id}`)
      .then((r) => r.json())
      .then((d) => d.data),
    // best score
    bestScore = await fetch(`/scores/spectrum/${id}/${condition.best}`)
      .then((r) => r.json())
      .then((d) => d.data),
    // worst score
    worstScore = await fetch(`/scores/spectrum/${id}/${condition.worst}`)
      .then((r) => r.json())
      .then((d) => d.data);

  return { all: scores, user: userScores, best: bestScore, worst: worstScore };
}
