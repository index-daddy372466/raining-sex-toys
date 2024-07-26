import startGame from "./func/startGame.js";
import readySetGo from "./func/readySetGo.js";
import playGame from "./func/playGame.js";
import scoreBoard from './func/scoreBoard.js'



// scoreboard tile transition on load (enter game)
let board = document.querySelectorAll(".scoreboard-list-item");
let arr = [...board];
window.addEventListener("load", (e) => {
  console.log(arr)
  arr.forEach((block, idx) => {
    setTimeout(() => {
      arr[idx].classList.add("hide-blocks");
      arr[idx].classList.add("show-blocks");
      console.log(arr[idx])
    }, 275 * (idx + 1));
  });
});
const logout = document.querySelectorAll('.link-link')
// console.log(score_items);
const spaceship = document.getElementById("spaceship-container"),
  start = document.getElementById("start-btn"),
  holes = document.querySelectorAll(".list-item>div"),
  warning = document.getElementById("warning"),
  level_element = document.getElementById("level"),
  dildos = await fetch("/game/svgs")
    .then((r) => r.json())
    .then((d) => {
      return d.list;
    });

// set level to 0;
level_element.textContent = 0;
let warnHeight = 1.9;

// set empty array
let posi = [];

// position the warning bar
warning.style.top = `${window.innerHeight / warnHeight}px`;

// get (x,y) position of current holes in ship
// push (x,y) position into "posi" array
holes.forEach((hole, idx) => {
  let position = { x: undefined, y: undefined };
  position.x = holes[idx].getBoundingClientRect().x;
  position.y = holes[idx].getBoundingClientRect().y;
  posi.push(position);
});

// start the game
startGame(
  start,
  spaceship,
  dildos,
  posi,
  readySetGo,
  playGame,
  level_element.textContent,
);

scoreBoard(document.querySelector('.scoreboard-list-container'))