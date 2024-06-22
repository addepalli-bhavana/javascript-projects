// reference to html elements
const questionsElement = document.querySelectorAll(".question");
const minusBtnsElement = document.querySelectorAll(".minus-btn");
const plusBtnsElement = document.querySelectorAll(".plus-btn");

// event listener for plus buttons
plusBtnsElement.forEach((plusBtn) => {
  plusBtn.addEventListener("click", (e) => {
    questionsElement.forEach((question) => {
      question.classList.remove("show");
    });
    e.currentTarget.closest(".question").classList.add("show");
  });
});

// event listener for minus buttons
minusBtnsElement.forEach((minusBtn) => {
  minusBtn.addEventListener("click", (e) => {
    e.currentTarget.closest(".question").classList.remove("show");
  });
});
