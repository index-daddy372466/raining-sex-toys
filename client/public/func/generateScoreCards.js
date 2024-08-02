export default function genereateScoreCards(cards){
    let scoresContainer = document.getElementById("scores-container");
    cards.forEach((card, index) => {
      // declare scorecard variables
      let li = document.createElement("li"),
        scorecard = document.createElement("div"),
        idContainer = document.createElement("div"),
        trackerID = document.createElement("h3"),
        scoreID = document.createElement("h3"),
        scoreContainer = document.createElement("div"),
        scoreActual = document.createElement("h3");
  
      // plug in classes
      li.classList.add("score-list-item");
      scorecard.classList.add("score-card");
      idContainer.classList.add("id-container");
      trackerID.classList.add("tracker-id-actual");
      scoreID.classList.add("id-actual");
      scoreContainer.classList.add("score-container");
  
      // append variables to their parent elements
      scoreContainer.appendChild(scoreActual);
      scoreActual.textContent = card.score;
      idContainer.appendChild(trackerID);
      trackerID.textContent = index + 1;
      idContainer.appendChild(scoreID);
      scoreID.textContent = `00${card.score_id}`;
      scorecard.appendChild(idContainer);
      scorecard.appendChild(scoreContainer);
      li.appendChild(scorecard);
      scoresContainer.appendChild(li);
    });
  };