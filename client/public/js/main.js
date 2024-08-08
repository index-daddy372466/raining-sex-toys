import startGame from "../../func/startGame.js";
import readySetGo from "../../func/readySetGo.js";
import playGame from "../../func/playGame.js";
import scoreBoard from "../../func/scoreBoard.js";

// scoreboard tile transition on load (enter game)
let board = document.querySelectorAll(".scoreboard-list-item");
let scoreboard = document.querySelector(".scoreboard-list-container")
let level_container = document.getElementById('level-choice-container')
let level_lis = document.querySelectorAll('.level-list > li ')
let arr = [...board];
let currentLevel;
// console.log(arr)
window.addEventListener("load", (e) => {
  // console.log(arr);
  arr.forEach((block, idx) => {
    // console.log(block)
    setTimeout(() => {
      block.classList.remove("hide-blocks");
      block.classList.add("show-blocks");
    }, 275 * (idx + 1));
  });
});

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
//edit: removing textcontent to prevent mobile blur
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


scoreBoard(scoreboard);

// level picker
setTimeout(()=>{
  level_lis.forEach((li,index)=>{
    li.onclick=e=>{
      // invalid number correction-handler
      if(+e.target.textContent != level_lis[index]){
          console.log(e.target.textContent)
          e.target.textContent = index + 1;
      }
      level_container.classList.add('level-picker-picked')
      setTimeout(() => {
        level_container.classList.remove('level-picker-picked')
      }, 300);
      currentLevel = e.target.textContent
      level_element.textContent = currentLevel
      // start the game
      startGame(
        start,
        spaceship,
        dildos,
        posi,
        readySetGo,
        playGame,
        currentLevel,
        scoreboard,
        level_container
      );
    }
      // start the game
      startGame(
        start,
        spaceship,
        dildos,
        posi,
        readySetGo,
        playGame,
        currentLevel,
        scoreboard,
        level_container
      );
  })
  level_container.classList.add('drop-down-picker')
},250)
  


console.log(window.navigator.userAgent)
if(/(linux|iphone|windows phone)/gi.test(window.navigator.userAgent)){
  document.getElementById('index-body').style = 'background:#fff'
}

