"use strict";
console.log("connected");
const arrow = document.getElementById("arrow");
const testBtn = document.getElementById("test");
const circle = document.getElementById("circle");
// Computed data
const computedArrow = getComputedStyle(arrow, null);
// console.log(computedArrow.getPropertyValue("margin"));
// console.log(arrow.style.margin);
testBtn.addEventListener("click", () => {
    arrow.style.transition = "all 3s linear 0s;";
    arrow.style.marginLeft = "-300px";
    // console.log("TEST");
});
// space 32
// arrow left	37
// arrow up	38
// arrow right	39
// arrow down	40
window.addEventListener("keydown", (action) => {
    let acLeft = +computedArrow
        .getPropertyValue("margin")
        .split(" ")[3]
        .replace("px", "");
    if (action.keyCode === 37 && acLeft < 30 && acLeft > -5) {
        circle.style.background = "rgba(255, 255, 255, 0.5)";
        console.log(acLeft);
        setTimeout(() => {
            circle.style.background = "";
        }, 100);
    }
    else if (action.keyCode === 37) {
        circle.style.background = "red";
        console.log(acLeft);
        setTimeout(() => {
            circle.style.background = "";
        }, 100);
    }
});
