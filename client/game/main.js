import startGame from "./func/startGame.js";
import readySetGo from "./func/readySetGo.js";
import playGame from "./func/playGame.js";

// import shootDildo from "../func/shootDildo.js";
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

// set empty array
let posi = [];

// position the warning bar
warning.style.top = `${window.innerHeight - window.innerHeight / 3}px`;

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
  level_element.textContent
);