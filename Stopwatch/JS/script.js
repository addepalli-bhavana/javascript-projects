// reference to html elements
const startBtnElement = document.getElementById("start-btn");
const resetBtnElement = document.getElementById("reset-btn");
const pauseBtnElement = document.getElementById("pause-btn");
const millisecondElement = document.getElementById("millisecond");
const secondElement = document.getElementById("second");
const minuteElement = document.getElementById("minute");
const hourElement = document.getElementById("hour");

// 
let millisecond = 0;
let second = 0;
let minute = 0;
let hour = 0;
let timeRef;

// function to format time values with leading zeros
const format = (time) => {
  return time < 10 ? "0" + time : time;
};

// function to update stopwatch
const updateStopwatch = () => {
  millisecondElement.innerText = format(millisecond);
  secondElement.innerText = format(second);
  minuteElement.innerText = format(minute);
  hourElement.innerText = format(hour);
};

// function to start the stopwatch
const startStopWatch = () => {
  timeRef = setInterval(() => {
    millisecond++;
    if (millisecond === 100) {
      millisecond = 0;
      second++;
    }
    if (second === 60) {
      second = 0;
      minute++;
    }
    if (minute === 60) {
      minute = 0;
      hour++;
    }
    updateStopwatch();
  }, 10);
};

// event listener for start button
startBtnElement.addEventListener("click", () => {
  startBtnElement.classList.add("disable");
  pauseBtnElement.classList.remove("disable");
  startStopWatch();
});

// event listener for pause button
pauseBtnElement.addEventListener("click", () => {
  if (startBtnElement.classList.contains("disable")) {
    startBtnElement.classList.remove("disable");
    pauseBtnElement.classList.add("disable");
    clearInterval(timeRef);
  }
});

// event listener for reset button
resetBtnElement.addEventListener("click", () => {
  startBtnElement.classList.remove("disable");
  pauseBtnElement.classList.remove("disable");
  clearInterval(timeRef);
  millisecond = 0;
  second = 0;
  minute = 0;
  hour = 0;
  updateStopwatch();
});
