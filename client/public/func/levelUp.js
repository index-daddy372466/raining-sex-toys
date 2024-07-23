import postFetch from "./postFetch.js";
let level = 0;
const level_element = document.getElementById("level");

export default async function levelUp(levy) {
  console.log('level is going up')
  // level up
  // if levy exists, then level = levy
  if (levy) {
    level = +levy;
  }
  // add 1 level
  level += 1;
  console.log(level)
  let result;
  let dataObj = { wave: level };
  // (dynamic) post fetch for the current wave (integer) based on the level
  result = postFetch(`/game/level/:${level}`, dataObj)
    .then((r) => r.json())
    .then((d) => {
      console.log(d)
      level_element.textContent = d.wave;
      console.log(d.wave)
      return d.wave;
    });
  return result;
}
