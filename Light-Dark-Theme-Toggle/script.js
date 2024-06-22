const themeToggleBtnElement = document.getElementById("theme-toggle-btn");

// Toggle "dark-mode" class on body when theme toggle button is clicked
themeToggleBtnElement.addEventListener("click", () => {
  document.documentElement.classList.toggle('dark-theme');
});
