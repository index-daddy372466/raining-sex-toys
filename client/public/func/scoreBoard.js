export default async function scoreBoard(board) {
  if(!board) return null
  let arr = [...board.children];
  let id = 2;
  // fetch scores by user id
  await fetch("/read/psql/review/scores/" + id)
    .then((r) => r.json())
    .then((data) => {
      let scores = data.data[0];
      let attemptData = data.attempts;
      console.log(attemptData)

      // fetch top score
      let topScore = arr[0];
      console.log(topScore);
      topScore.children[1].textContent = scores.best;

    //   fetch attempts
      let attempts = arr[2];
      console.log(attempts);
      attempts.children[1].textContent = attemptData
    //   attempts.textContent = attemptData

      // fetch average score
      let avgScore = arr[3];
      console.log(avgScore);
      avgScore.children[1].textContent = scores.average;
    });
}
