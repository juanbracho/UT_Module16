// Get the button and add an event listener for theme toggle
const themeToggleBtn = document.getElementById('theme-toggle');

// Function to switch themes
function switchTheme() {
    document.body.classList.toggle('light-theme');

    // Save the current theme in localStorage
    if (document.body.classList.contains('light-theme')) {
        localStorage.setItem('theme', 'light');
    } else {
        localStorage.setItem('theme', 'dark');
    }
}

// Check for saved theme preference
function loadSavedTheme() {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'light') {
        document.body.classList.add('light-theme');
    }
}

// Event listener for the theme toggle button
themeToggleBtn.addEventListener('click', switchTheme);

// Load the saved theme on page load
window.onload = loadSavedTheme;
