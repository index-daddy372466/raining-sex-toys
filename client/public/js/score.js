import scoreData from "../../func/scoreData.js";
import genereateScoreCards from "../../func/generateScoreCards.js";
// scores page - send scores data
let scores = await scoreData();
console.log(scores)
let userScores = [...scores.user]//.sort((a, b) => a.score_id - b.score_id); // array of scores from user
console.log(userScores)
userScores.map(obj=>{
  obj.worst = scores.worst.score;
})
// generate score cards
genereateScoreCards(userScores);
let userScoreData = [
    !scores.best.score?'no-data':scores.best.score,
    scores.worst.score,
    userScores[userScores.length-1].average,
    userScores.length,
  ],
  sidebar = ["best", "worst", "average", "attempts"];
// iterate through sidebar & set each element's text to userScoreData[index]
sidebar.forEach((bar, index) => {
  let element = document.getElementById(`${bar}-score`);
  element.textContent = userScoreData[index];
});

const filterWrapper = document.getElementById('filter-wrapper')
const scoreContainer = document.getElementById('container-scores-parent');
filterWrapper.style = `top:${scoreContainer.getBoundingClientRect().y-65}px`