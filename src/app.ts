let audioSuccess = new Audio("../mp3/success.mp3");

const arrow: HTMLElement = document.getElementById("arrow")!;
const tapDiv: HTMLElement = document.getElementById("tapDiv")!;
const startButton: HTMLElement = document.getElementById("start")!;
const circle: HTMLElement = document.getElementById("circle")!;
const tapCircle: HTMLElement = document.getElementById("tapCircle")!;
let printScore = document.getElementById("score")!;
let printArrow = document.getElementById("printArrow");
let selectArrows = document.getElementById("selectArrows");
// Difficulty level
// Initial variables to set the game
let speed; // speed in MS
let scoreArray = []; // score
let arrows = 5; // how many arrows

// Randomize arrows

const randomize = () => {
  return Math.round(Math.random() * (40 - 37) + 37);
};

// Create new arrow
const createArrows = (speed) => {
  console.log(selectArrows.value);
  console.log([speed, arrows]);
  for (let i = 0; i < arrows; i++) {
    let newTapDiv = document.createElement("div");
    let newTapCircle = document.createElement("div");
    let newArrow = document.createElement("div");
    // Create new tapDiv
    newTapDiv.setAttribute("id", "tapDiv");
    newTapDiv.setAttribute("class", "tapDiv");
    // Create new TapCricle
    newTapCircle.setAttribute("id", "tapCircle");
    newTapCircle.setAttribute("class", "tapCircle");
    newTapCircle.setAttribute("data-id", i);
    // Create new Arrow
    newArrow.setAttribute("class", `arrow d${randomize()}`);
    newArrow.setAttribute("id", "arrow");
    // Append divs
    circle.appendChild(newTapDiv);
    newTapDiv.appendChild(newTapCircle);
    newTapCircle.appendChild(newArrow);
    newTapDiv.style.transition = `all 0.2s linear 0s, margin ${speed}ms linear 0s`;
  }
};

// Initialize difficulty level
const easy = document.getElementById("easy").addEventListener("click", () => {
  speed = 5500;
  createArrows(speed);
  console.log("easy");
});
const medium = document
  .getElementById("medium")
  .addEventListener("click", () => {
    speed = 4500;
    createArrows(speed);
    console.log("medium");
  });
const hard = document.getElementById("hard").addEventListener("click", () => {
  speed = 3500;
  createArrows(speed);
  console.log("hard");
});

// Arrays of arrow parent divs
let tapCircleAll;
let tapDivAll;
// Display/Send arrows one by one on the right side of the screen
const displayArrows = (speed) => {
  tapCircleAll = document.querySelectorAll(".tapCircle");
  tapDivAll = document.querySelectorAll(".tapDiv")!;
  console.log(tapDivAll);
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

// ----------------------
// Start Button
startButton.addEventListener("click", () => {
  displayArrows(speed);
});
let arrayTapDiv = [];

// Check if arrow pressed
window.addEventListener("keydown", (action) => {
  if (action.keyCode < 37 || action.keyCode > 40) return;
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
    if (action.keyCode == arrowCode && el < 15 && el > -5) {
      if (!scoreArray.includes(i)) scoreArray.push(i);
      console.log(scoreArray);
      tapSuccess(i);
      hasFailed = false;
      return;
    }
  });
  // if Fail
  if (hasFailed) {
    circle.style.background = "rgba(255, 0, 0, 0.507)";
    setTimeout(() => {
      circle.style.background = "";
    }, 100);
  }

  printScore.textContent = scoreArray.length;
});
selectArrows.addEventListener("change", () => {
  arrows = +selectArrows.value;
  printArrow.textContent = selectArrows.value;
});
printArrow.textContent = selectArrows.value;

// Computed data
// const computedTapDiv: CSSStyleDeclaration = getComputedStyle(tapDiv, null);
// const computedTapDivAll = getComputedStyle(tapDiv, null);
// const tapTransition = computedTapDiv.getPropertyValue("transition");
// console.log(tapTransition);
