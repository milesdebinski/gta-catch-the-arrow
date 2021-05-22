const audioSuccess = new Audio("../mp3/success.mp3");
const arrow = document.getElementById("arrow");
const tapDiv = document.getElementById("tapDiv");
const startButton = document.getElementById("start");
const circle = document.getElementById("circle");
const tapCircle = document.getElementById("tapCircle");
let selectArrows = document.getElementById("selectArrows");

// Initial variables to set the game
let speed; // speed of an arrow - default medium 5500 speed
let arrows = 5; // default number of arrows
let scoreArray = []; // score array
// show_score
let show_score = document.getElementById("show_score");
const show_help = document.getElementById("show_help");
const data = document.getElementById("data");
// Randomize arrows
const randomize = () => {
  return Math.round(Math.random() * (40 - 37) + 37);
};
// Create array of arrows
const createArrows = (speed) => {
  for (let i = 0; i < arrows; i++) {
    let newTapDiv = document.createElement("div");
    let newTapCircle = document.createElement("div");
    let newArrow = document.createElement("div");
    // Create new tapDiv - parent element
    newTapDiv.setAttribute("id", "tapDiv");
    newTapDiv.setAttribute("class", "tapDiv");
    // Create new tapCricle
    newTapCircle.setAttribute("id", "tapCircle");
    newTapCircle.setAttribute("class", "tapCircle");
    newTapCircle.setAttribute("data-id", i);
    // Create new arrow
    newArrow.setAttribute("class", `arrow d${randomize()}`); // and randomize the direction
    newArrow.setAttribute("id", "arrow");
    // Append divs
    circle.appendChild(newTapDiv);
    newTapDiv.appendChild(newTapCircle);
    newTapCircle.appendChild(newArrow);
    newTapDiv.style.transition = `all 0.2s linear 0s, margin ${speed}ms linear 0s`;
  }
};
// Initialize difficulty level using buttons
const easy = document.getElementById("easy").addEventListener("click", () => {
  speed = 7000;
  createArrows(speed);
  console.log("easy");
});
const medium = document
  .getElementById("medium")
  .addEventListener("click", () => {
    speed = 5500;
    createArrows(speed);
    console.log("medium");
  });
const hard = document.getElementById("hard").addEventListener("click", () => {
  speed = 4000;
  createArrows(speed);
  console.log("hard");
});
// Initialize difficulty level manualy (at bottom of the file)

// Arrays of arrows
let tapCircleAll;
let tapDivAll;
// true if endgame stage
let endGame = true;
// Display/Send arrows one by one on the right side of the screen
const displayArrows = (speed) => {
  tapCircleAll = document.querySelectorAll(".tapCircle");
  tapDivAll = document.querySelectorAll(".tapDiv");
  // ENDGAME
  setTimeout(() => {
    // make sure to show the score
    setTimeout(() => {
      show_score.style.opacity = "1";
    }, 350);
    show_score.style.opacity = "1";
    endGame = true;
    setTimeout(() => {
      if (uiStart) data.style.display = "flex";
      show_score.style.opacity = "0";
    }, 3000);
    console.log(tapDivAll);
    tapDivAll.forEach((el) => (el.style.marginLeft = "600px"));
    console.log("end game!");
    return;
  }, speed * 0.8 + (speed / 9) * arrows);
  // Show arrows on the right
  tapDivAll.forEach((el, i) => {
    setTimeout(() => {
      // display arrow
      el.style.opacity = "1";
      el.style.marginLeft = "-300px";
      setTimeout(() => {
        // hide arrow after they travel to the left side of the screen
        el.style.opacity = "0";
      }, speed * 0.8);
    }, (i * speed) / 9);
  });
};
// Manual start - invoce at the bottom of this file!
// or use start button
const manualStart = (manualSpeed, manualArrows) => {
  data.style.display = "none";
  setTimeout(() => {
    arrows = manualArrows;
    speed = manualSpeed;
    createArrows(speed);
    scoreArray = [];
    endGame = false;
    displayArrows(speed);
  }, 1000);
};
let uiStart;
// Start Button
startButton.addEventListener("click", () => {
  uiStart = true;
  scoreArray = [];
  endGame = false;
  data.style.display = "none";
  displayArrows(speed);
});
let arrayTapDiv = [];
// Check if arrow pressed
window.addEventListener("keydown", (action) => {
  if (action.keyCode < 37 || action.keyCode > 40) {
    console.log("boom");
    if (!endGame) {
      show_help.style.opacity = "1";
      setTimeout(() => {
        show_help.style.opacity = "0";
      }, 400);
    }
    return;
  }
  let hasFailed = true;
  if (arrayTapDiv) arrayTapDiv = [];
  tapDivAll.forEach((el) => {
    arrayTapDiv.push(
      +getComputedStyle(el, null)
        .getPropertyValue("margin")
        .split(" ")[3]
        .replace("px", "")
    );
  });
  // tap Success
  const tapSuccess = (index) => {
    audioSuccess.play();
    tapCircleAll[index].style.background = "var(--tap-circle-success)";
    setTimeout(() => {
      tapCircleAll[index].style.background = "";
    }, 670);
  };
  arrayTapDiv.forEach((el, i) => {
    // Assign arrow code to variable
    let arrowCode = tapDivAll[i]
      .querySelector(".arrow")
      .className.split(" ")[1]
      .replace("d", "");
    // if Success
    if (action.keyCode == arrowCode && el < 17 && el > -5) {
      if (!scoreArray.includes(i)) scoreArray.push(i);
      tapSuccess(i);
      hasFailed = false;
      return;
    }
  });
  // if Fail
  if (hasFailed && !endGame) {
    scoreArray.pop();
    circle.style.background = "rgba(255, 0, 0, 0.507)";
    setTimeout(() => {
      circle.style.background = "";
    }, 100);
  }

  // Show Score
  if (!endGame) {
    show_score.textContent = scoreArray.length;
    // show score in the circle
    setTimeout(() => {
      show_score.style.opacity = "1";
      setTimeout(() => {
        show_score.style.opacity = "0";
      }, 300);
    }, 50);
  }
});
// update option list with arrows
selectArrows.addEventListener("change", () => {
  arrows = +selectArrows.value;
  console.log(selectArrows.value);
});

//
//
//
//
// set speed to:
// easy 7000,
// medium 5500 or
// hard 4000 to set game difficulty.
// Start your game manualStart(speed, number of arrows)
manualStart(5500, 20);
// COMMENT OUT manualStart() if you want to use UI buttons!
//
//
//
