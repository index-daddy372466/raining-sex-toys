import renderSec from './renderSec.js'

export default async function scoreBoard(board) {
  const token = await fetch("/game/token")
    .then((r) => r.json())
    .then((d) => renderSec(d.token));
  if (!board || (board && board.length < 2)) return null;
  let arr = [...board.children];
  let id = token.identity;
  // fetch scores by user id
  if (board.children.length > 2) {
    await fetch("/read/psql/review/scores/" + id)
      .then((r) => r.json())
      .then((data) => {
        console.log(data.data);
        let scores = data.data[0];
        let attemptData = data.attempts | 0;

        // fetch top  
        if (arr[0]) {
          let topScore = arr[0];
          topScore.children[1].textContent = scores.best | 0;
        }
        // fetch average score
        if (arr[3]) {
          let avgScore = arr[2];
          avgScore.children[1].textContent = scores.average | 0;
        }

        //   fetch attempts
        if (arr[2]) {
          let attempts = arr[3];
          attempts.children[1].textContent = attemptData | 0;
        }
      });
  }
}
