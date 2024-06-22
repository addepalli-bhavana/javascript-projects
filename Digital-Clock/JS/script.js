// reference to html elements
const dayNumberElement = document.getElementById("day-number");
const monthElement = document.getElementById("month");
const yearElement = document.getElementById("year");
const dayNameElement = document.getElementById("day-name");
const hourElement = document.getElementById("hour");
const minuteElement = document.getElementById("minute");
const secondElement = document.getElementById("second");
const periodElement = document.getElementById("period");

// function to update digital clock
const updateDigitalClock = () => {
  const formatHour = (hour) => {
    if (hour === 0) return 12;
    if (hour > 12) return hour - 12;
    return hour;
  };
  const pad = (number, digits) => {
    let n = number.toString();
    while (n.length < digits) {
      n = "0" + n;
    }
    return n;
  };
  const now = new Date();
  dayNumberElement.innerText = pad(now.getDate(), 2);
  monthElement.innerText = now.toLocaleString("default", { month: "long" });
  yearElement.innerText = now.getFullYear();
  dayNameElement.innerText = now.toLocaleString("default", { weekday: "long" });
  hourElement.innerText = pad(formatHour(now.getHours()), 2);
  minuteElement.innerText = pad(now.getMinutes(), 2);
  secondElement.innerText = pad(now.getSeconds(), 2);
  periodElement.innerText = hour >= 12 ? "PM" : "AM";
};

// updates digital clock immediately on page load and then subsequently updates digital clock every second
document.addEventListener("DOMContentLoaded", () => {
  updateDigitalClock();
  setInterval(updateDigitalClock, 1000);
});
