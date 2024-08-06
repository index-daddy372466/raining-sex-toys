import levelUp from "./levelUp.js";
let nav = document.getElementById("nav-container");
let footer = document.getElementById("footer-wrapper")
export default function startGame(
  btn,
  ship,
  dildos,
  posi,
  readySetGo,
  playGame,
  level,
  board,
  level_container
) {
  // prepare style for start button once clickes
  const btn_clicked = `background:#333;color:rgb(42, 170, 138);border:none;`;
  // click button to start game
  btn.onclick = async (e) => {
    // remove level picker
    level_container.classList.add('disappear')
    let arr = [...board.children];

    if (arr.length > 1) {
      let attempts = arr.filter((x) =>
        /Attempts/gi.test(x.children[0].textContent)
      );
      attempts[0].children[1].textContent =
        +attempts[0].children[1].textContent + 1;
    }
    // hide navigation
    nav.style.display = "none";
    footer.parentElement.style = "display:none";
    // no pointer events
    e.target.classList.add("no-pointer");

    // ready set go on button
    readySetGo(e.target, btn_clicked, level);

    setTimeout(() => {
      // 1. button disappears
      if (e.target.classList.contains("appear")) {
        e.target.classList.remove("appear");
        e.target.classList.add("disappear");
      }
    }, 2250);
    // 2. spaceship drops down after button disappears
    setTimeout(() => {
      if (ship.classList.contains("bye-spaceship")) {
        // console.log(true);
        ship.classList.remove("bye-spaceship");
        ship.classList.add("hi-spaceship");

        // 3. spawn dildos from ship
        playGame(dildos, posi, e.target, ship);
      }
    }, 2750);
  };
}
