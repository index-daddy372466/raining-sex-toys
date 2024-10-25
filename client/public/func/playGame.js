import getWaves from "./getWaves.js";
import levelUp from "./levelUp.js";
import postFetch from "./postFetch.js";
import renderSec from './renderSec.js'
let board = document.querySelectorAll(".scoreboard-list-item");
let nav = document.getElementById("nav-container");
let footer = document.getElementById("footer-wrapper");
const modolu = 20;
const isMobile = /(linux|iphone|windows phone)/gi.test(navigator.userAgent);
let percentages = [.50,.45,.40];
let interval_speed = percentages[Math.floor(Math.random()*percentages.length)]
export default function playGame(arr, posi, btn, ship) {
  const warning = document.getElementById("warning"),
    hole = document.querySelector(".list-item>div"),
    holes_container = document.getElementById("holes-container"),
    genRandomDildo = () => {
      let random = arr[Math.floor(Math.random() * arr.length)];
      return random;
    },
    // generate the dildo & spawn from random hole
    generateDildo = (posi) => {
      let img = new Image();
      let blob = new Blob([genRandomDildo()], { type: "image/svg+xml" });
      img.src = URL.createObjectURL(blob);
      img.classList.add("new-image");
      img.setAttribute('z-index',[...new Array(10).fill('').map((_,i)=>(i+1)+899)][Math.floor(Math.random()*10)])
      img.style = `left:${
        [
          posi[Math.floor(Math.random() * posi.length)].x +
            hole.clientWidth / 2.5,
          posi[Math.floor(Math.random() * posi.length)].x +
            hole.clientWidth / 2,
          posi[Math.floor(Math.random() * posi.length)].x +
            hole.clientWidth / 1.5,
        ][Math.floor(Math.random() * 3)]
      }px;top:${posi[0].y + 100}px;`;
      document.body.appendChild(img);
    },
    generateHole = () => {
      // <li class="holes item list-item">
      //   <div id="exit-hole" class="circle circle-hole hole-circle"></div>
      // </li>;
      let newHole = document.createElement("li");
      newHole.classList.add("list-item");
      let div = document.createElement("div");
      div.classList.add("list-item>div");
      newHole.appendChild(div);
      holes_container.appendChild(newHole);
      // add new position to posi array
      let position = { x: undefined, y: undefined };
      position.x = div.getBoundingClientRect().x;
      position.y = div.getBoundingClientRect().y;
      posi.push(position);

      posi.map((pos) => {
        return {
          x: posi.reduce((a, b) => Number(a.x) + Number(b.x)) / posi.length,
          y: pos.y,
        };
      });
      document.querySelectorAll(".new-image").forEach((img) => {
        img.style.width = posi[0].x + "px";
        img.style.height = posi[0].x + "px";
      });
    },
    resetHoles = (container) => {
      let children = [...container.children];
      children.forEach((child) => {
        if (!child.classList.contains("holes")) {
          child.parentElement.removeChild(child);
        }
      });
      return;
    };
    let level = +document.getElementById("level").textContent,
    current_wave = getWaves(level),
    current_speed =  level < 1 ? 5 : 5 + ((.5*(level))%modolu),
    copy_wave = current_wave,
    genisDone = false,
    gen,
    interval;
  // dildo manager
  const manageDildo = {
    moveImg: (images) => {
      const warning_boundary = warning.getBoundingClientRect().y;
      images.forEach((pic, index) => {
        let c = pic.getBoundingClientRect().y;
        setInterval(() => {
          c += current_speed;
          pic.style.top = c + "px";
        }, (125));
        if (pic.getBoundingClientRect().y >= warning_boundary) {
          manageDildo.flashWarning();
        }
      });
    },
    shootImg: (images) => {
     for (let i = 0; i < images.length; i++) {
        if(!isMobile){
          images[i].onclick = (e) => {
            copy_wave -= 1;
            // // console.log(copy_wave);
            e.target.classList.add("shoot-load");
            if ([...board].length > 0) {
              let current = [...board].filter((x) =>
                /current/g.test(x.children[0].textContent)
              );
  
              if (current) {
                current[0].children[1].textContent =
                  +current[0].children[1].textContent + 1;
              } else {
                return null;
              }
            }
          };
        } else {
          images[i].ontouchstart = (e) => {
            e.preventDefault()
            e.target.dispatchEvent(new Event('click'))
            copy_wave -= 1;
            // // console.log(copy_wave);
            e.target.classList.add("shoot-load");
            if ([...board].length > 0) {
              let current = [...board].filter((x) =>
                /current/g.test(x.children[0].textContent)
              );
  
              if (current) {
                current[0].children[1].textContent =
                  +current[0].children[1].textContent + 1;
              } else {
                return null;
              }
            }
          };
        }
        images[i].ondrag = (e) => {
          e.preventDefault()
        } 
        images[i].ondragstart = (e) => {
          e.preventDefault()
        } 
        images[i].ondragend = (e) => {
          e.preventDefault()
        } 
      }
    },
    flashWarning: () => {
      warning.classList.add("warning-animate");
      setTimeout(() => {
        warning.classList.remove("warning-animate");
      }, 500);
      return;
    },
    gameOver: async (images) => {
      let container = document.getElementById("holes-container");
      // reset holes back to 3
      resetHoles(container);

      setTimeout(() => {
        warning.classList.add("appear");
        warning.classList.remove("disappear");
      }, 750);
      const revertStyle = `height: 20px;
  width: 200px;
  padding: 2rem;
  border-radius: 12px;
  border: 3px dotted #f00;
  display: Flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-family: "Franklin Gothic Medium", "Arial Narrow", Arial, sans-serif;
  transition: 0.25s;
  font-size: 25px;`;
      nav.style.display = "block";
      footer.parentElement.style = "display:block";

      images.forEach((img) => img.classList.add("shoot-load"));
      ship.classList.remove("hi-spaceship");
      ship.classList.add("bye-spaceship");
      btn.classList.remove("disappear");
      btn.textContent = "Start";
      btn.classList.add("appear");
      btn.classList.remove("no-pointer");
      btn.style = revertStyle;
      warning.classList.remove("appear");
      warning.classList.add("disappear");
      
      let current = [...board].filter((x) =>
        /current/gi.test(x.children[0].textContent)
      );

      if ([...board].length > 1) {
        let avg = [...board].filter((x) =>
          /average/gi.test(x.children[0].textContent)
        );

        // define token
        const token = await fetch("/game/token")
          .then((r) => r.json())
          .then((d) => renderSec(d.token));
        let id = token.identity;
        let bestScore = +[...board][0].children[1].textContent;
        let currScore = +current[0].children[1].textContent;
        let avgCurr = await fetch("/read/psql/review/scores/" + id)
          .then((r) => r.json())
          .then((d) => {
            let nums = [...d.data].map((n) => +n.score),
              sum = nums.reduce((a, b) => a + b) + currScore,
              result = Math.round(sum / (d.attempts + 1));
            return result;
          });
        avg[0].children[1].textContent = isNaN(avgCurr) ? currScore : avgCurr;

        if (currScore > bestScore) {
          let bestScoreUrl = "/update/score/" + id;
          // best score is current score
          await postFetch(bestScoreUrl, { best: currScore, score: currScore })
            .then((r) => r.json())
            .then((d) => {
              return d.score;
            });
        } else {
          // let id = token.identity;
          // best score is still top Score
          let bestScoreUrl = "/update/score/" + id;
          await postFetch(bestScoreUrl, { best: bestScore, score: currScore })
            .then((r) => r.json())
            .then((d) => {
              return d.score;
            });
        }
      }

      window.location.reload()
    },
  };

  // Gameplay!
  interval = setInterval(
    async () => {
      // if wave is done, then clear interval
      if (genisDone == true) {
        clearInterval(gen);
      }
      // generate dildos if wave is not done
      gen = !genisDone ? generateDildo(posi) : null;

      // grab all dildos
      let images1 = document.querySelectorAll(".new-image");
      // move dildos downward
      manageDildo.moveImg(images1);
      // shoot dildos
      manageDildo.shootImg(images1);
      // if 1 dildo is out of bounds
      images1.forEach((image) => {
        let currentY = image.getBoundingClientRect().y;
        if (currentY > window.innerHeight) {
          current_speed = 5;
          // clear interval
          clearInterval(interval);
          // remove dildos
          manageDildo.gameOver(images1);
          // garbage collection
          images1.forEach((img) => img.remove());
        }
      });

      // if all dildos pass in wave
      if (images1.length == current_wave) {
        // dildo generation is done on wave
        genisDone = true;
        if (copy_wave == 0) {
          if (+document.getElementById("level").textContent % 2 == 0) {
            generateHole();
          }
          await levelUp();
          // increate speed by 2.5 after each wave
          current_speed += 2.5;
          copy_wave = getWaves(+document.getElementById("level").textContent);
          current_wave = copy_wave;
          // dildo generation is false
          genisDone = false;
          // garbage collection
          images1.forEach((img) => img.remove());
        }
      }
    },
    +document.getElementById("level").textContent % 2 == 0 &&
      +document.getElementById("level").textContent < 1
      ? 1000
      : interval_speed * (1000 - (+document.getElementById("level").textContent % modolu))
  );
}
