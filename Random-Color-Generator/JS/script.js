// reference for html elements
const generateBtnElement = document.getElementById("generate-btn");
const clipboardBtnElement = document.getElementById("clipboard-btn");
const colorCodeElement = document.getElementById("color-code");
const colorContainerElement = document.getElementById("color-container");

// event listener for generate button
generateBtnElement.addEventListener("click", () => {
  const hexValues = "0123456789abcdef";
  let randomColor = "#";
  for (let i = 0; i < 6; i++) {
    randomColor = randomColor + hexValues[Math.floor(Math.random() * 16)];
  }
  document.body.style.backgroundColor = randomColor;
  colorContainerElement.style.backgroundColor = randomColor;
  colorCodeElement.innerText = randomColor;
});

// event listener for clipboard button
clipboardBtnElement.addEventListener("click", () => {
  const colorCode = colorCodeElement.innerText;
  navigator.clipboard.writeText(colorCode);
  clipboardBtnElement.classList.add("show-check");
  setTimeout(() => {
    clipboardBtnElement.classList.remove("show-check");
  }, 1500);
});
