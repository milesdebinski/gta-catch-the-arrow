"use strict";
console.log("connected");
const arrow = document.getElementById("arrow");
const testBtn = document.getElementById("test");
testBtn.addEventListener("click", () => {
  arrow.style.margin = "0px 0px 0px -300px";
  arrow.style.transition = "all 3s linear 0s";
  console.log("TEST");
});
