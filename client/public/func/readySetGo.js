import levelUp from "./levelUp.js";
export default async function readySetGo(btn, clicked, levy) {
  // ready set go on startGame
  const words = ["ready", "set", "go"].map((w) => w.toUpperCase());
  await levelUp(levy);

  // iterate through words array
  words.forEach((w, idx) => {
    // set timeout
    setTimeout(() => {
      // start timeout with the first word in array
      btn.textContent = words[0];
      // plug in style for button
      btn.style = clicked;
      // btn's textContent = word
      btn.textContent = w;
    }, 500 * (idx + 1));
  });
}
