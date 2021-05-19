const arrow: HTMLElement = document.getElementById("arrow")!;
const tapDiv: HTMLElement = document.getElementById("tapDiv")!;
const startButton: HTMLElement = document.getElementById("start")!;
const circle: HTMLElement = document.getElementById("circle")!;
const tapCircle: HTMLElement = document.getElementById("tapCircle")!;

// Computed data
const computedTapDiv: CSSStyleDeclaration = getComputedStyle(tapDiv, null);

// How many arrows to create
let arrows = 5;
// Create new arrows
const createArrows = () => {
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
    newArrow.setAttribute("class", "arrow left");
    newArrow.setAttribute("id", "arrow");
    // Append divs
    circle.appendChild(newTapDiv);
    newTapDiv.appendChild(newTapCircle);
    newTapCircle.appendChild(newArrow);
  }
};
// create arrows & create array of arrows
createArrows();
let tapDivAll = document.querySelectorAll(".tapDiv")!;
// console.log(circle);

// Display/Send arrows one by one
const displayArrows = () => {
  console.log(tapDivAll);

  // function doScaledTimeout(i) {
  //   setTimeout(function() {
  //     alert(i);
  //   }, i * 5000);
  // }

  tapDivAll.forEach((el, i) => {
    setTimeout(() => {
      el.style.opacity = "1";
      el.style.marginLeft = "-300px";
      setTimeout(() => {
        el.style.opacity = "0"; // how to fix this
      }, 4500);
      console.log("boom");
    }, i * 3000);
  });
};

// ----------------------
// Start Button
startButton.addEventListener("click", () => {
  // tapCircle.style.marginLeft = "-300px";
  // tapDiv.style.opacity = "1"; // how to fix this
  displayArrows();
  // hide the arrows
});

// space 32
// arrow left	37
// arrow up	38
// arrow right	39
// arrow down	40

//
// check for every element of the array!
//
//
//
//
// Check if Success or Fail
window.addEventListener("keydown", (action) => {
  let acLeft: number = +computedTapDiv
    .getPropertyValue("margin")
    .split(" ")[3]
    .replace("px", "");
  console.log(acLeft);
  // Check if Success
  if (action.keyCode === 37 && acLeft < 30 && acLeft > -5) {
    tapCircle.style.background = "var(--tap-circle-success)";
    setTimeout(() => {
      tapCircle.style.background = "";
    }, 670);
    // if wrong arrow or wrong time - Fail
  } else if (
    action.keyCode === 37 ||
    action.keyCode === 38 ||
    action.keyCode === 39 ||
    action.keyCode === 40
  ) {
    circle.style.background = "rgba(255, 0, 0, 0.507)";
    setTimeout(() => {
      circle.style.background = "";
    }, 100);
  }
});
