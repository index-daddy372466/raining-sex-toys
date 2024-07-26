export default async function scoreBoard(board) {
  if (!board || (board && board.length < 2)) return null;
  let arr = [...board.children];
  let id = 2;
  // fetch scores by user id
  if (board.length > 2) {
    await fetch("/read/psql/review/scores/" + id)
      .then((r) => r.json())
      .then((data) => {
        let scores = data.data[0];
        let attemptData = data.attempts;
        console.log(attemptData);

        // fetch top score
        if (arr[0]) {
          let topScore = arr[0];
          console.log(topScore);
          topScore.children[1].textContent = scores.best;
        }

        //   fetch attempts
        if (arr[2]) {
          let attempts = arr[2];
          console.log(attempts);
          attempts.children[1].textContent = attemptData;
          //   attempts.textContent = attemptData
        }

        // fetch average score
        if (arr[3]) {
          let avgScore = arr[3];
          console.log(avgScore);
          avgScore.children[1].textContent = scores.average;
        }
      });
  }
}
