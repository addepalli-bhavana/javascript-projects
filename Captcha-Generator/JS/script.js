// reference to html elements
const captchaTextElement = document.getElementById("captcha-text");
const reloadBtnElement = document.getElementById("reload-btn");
const inputCaptchaElement = document.getElementById("input-captcha");
const checkBtnElement = document.getElementById("check-btn");
const statusTextElement = document.getElementById("status-text");

// declaration and assignment of variables
const allCaptchaTextCharacters = [
  "A",
  "B",
  "C",
  "D",
  "E",
  "F",
  "G",
  "H",
  "I",
  "J",
  "K",
  "L",
  "M",
  "N",
  "O",
  "P",
  "Q",
  "R",
  "S",
  "T",
  "U",
  "V",
  "W",
  "X",
  "Y",
  "Z",
  "a",
  "b",
  "c",
  "d",
  "e",
  "f",
  "g",
  "h",
  "i",
  "j",
  "k",
  "l",
  "m",
  "n",
  "o",
  "p",
  "q",
  "r",
  "s",
  "t",
  "u",
  "v",
  "w",
  "x",
  "y",
  "z",
  0,
  1,
  2,
  3,
  4,
  5,
  6,
  7,
  8,
  9,
];

// function to generate a new captcha
const generateNewCaptcha = () => {
  captchaTextElement.innerText = "";
  for (let i = 0; i < 6; i++) {
    const randomCharacter =
      allCaptchaTextCharacters[
        Math.floor(Math.random() * allCaptchaTextCharacters.length)
      ];
    captchaTextElement.innerText =
      captchaTextElement.innerText + randomCharacter;
  }
};

// function to clear input, captcha, status text fields
const removeContent = () => {
  inputCaptchaElement.value = "";
  statusTextElement.classList.add("hide");
};

// function to check if the entered captcha correct
const checkCaptcha = () => {
  const inputCaptchaValue = inputCaptchaElement.value;
  if (!inputCaptchaValue.trim()) {
    alert("Please enter the characters you see in the image.");
    return;
  }
  statusTextElement.classList.remove("hide");
  if (inputCaptchaValue === captchaTextElement.innerText) {
    statusTextElement.style.color = "#1b8ed1";
    statusTextElement.innerText = "Captcha Verified! You are not a robot. 😊";
    setTimeout(() => {
      removeContent();
      generateNewCaptcha();
    }, 3000);
  } else {
    statusTextElement.style.color = "#ff0000";
    statusTextElement.innerText = "Captcha Mismatch. Please try again! 🤖";
  }
};

// generates initial captcha on page load
document.addEventListener("DOMContentLoaded", generateNewCaptcha);

// event listener for check button
checkBtnElement.addEventListener("click", checkCaptcha);

// event listener for reload button
reloadBtnElement.addEventListener("click", () => {
  removeContent();
  generateNewCaptcha();
});
