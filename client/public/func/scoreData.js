import renderSec from './renderSec.js'
const token = await fetch("/game/token")
  .then((r) => r.json())
  .then((d) => renderSec(d.token));
const condition = {};
condition.best = "best";
condition.worst = "worst";
let id = token.identity;
// all scores
let all = await fetch("/scores/all")
    .then((r) => r.json())
    .then((d) => d.data),
  // scores by current user
  user = await fetch(`/scores/users/${id}`)
    .then((r) => r.json())
    .then((d) => d.data),
  // best score
  best = await fetch(`/scores/spectrum/${id}/${condition.best}`)
    .then((r) => r.json())
    .then((d) => d.data),
  // worst score
  worst = await fetch(`/scores/spectrum/${id}/${condition.worst}`)
    .then((r) => r.json())
    .then((d) => d.data),
  results = { all, user, best, worst };

// console.log(id)
export default async function scoreData() {
  return results;
}
