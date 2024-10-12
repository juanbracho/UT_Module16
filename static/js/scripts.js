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

// Function to toggle between different plot views
function switchPlotView(view) {
    const oilPlots = document.querySelectorAll('.oil-plot');
    const telePlots = document.querySelectorAll('.tele-plot');
    const combinedPlots = document.querySelectorAll('.combined-plot');
    const oilDesc = document.getElementById('oil-description');
    const teleDesc = document.getElementById('tele-description');
    const combinedDesc = document.getElementById('combined-description');
    const buttons = document.querySelectorAll('.plot-toggle-btn');

    // Hide all plots and descriptions first
    oilPlots.forEach(plot => plot.style.display = 'none');
    telePlots.forEach(plot => plot.style.display = 'none');
    combinedPlots.forEach(plot => plot.style.display = 'none');
    oilDesc.style.display = 'none';
    teleDesc.style.display = 'none';
    combinedDesc.style.display = 'none';
    buttons.forEach(btn => btn.classList.remove('active'));

    // Show the relevant plots and descriptions, and highlight the selected button
    if (view === 'oil') {
        oilPlots.forEach(plot => plot.style.display = 'block');
        oilDesc.style.display = 'block';
        document.getElementById('oil-btn').classList.add('active');
    } else if (view === 'tele') {
        telePlots.forEach(plot => plot.style.display = 'block');
        teleDesc.style.display = 'block';
        document.getElementById('tele-btn').classList.add('active');
    } else if (view === 'combined') {
        combinedPlots.forEach(plot => plot.style.display = 'block');
        combinedDesc.style.display = 'block';
        document.getElementById('combined-btn').classList.add('active');
    }
}

// Event listeners for the buttons
document.getElementById('oil-btn').addEventListener('click', () => switchPlotView('oil'));
document.getElementById('tele-btn').addEventListener('click', () => switchPlotView('tele'));
document.getElementById('combined-btn').addEventListener('click', () => switchPlotView('combined'));

// Set the default view to Oil plots when the page loads
window.onload = () => {
    switchPlotView('oil');  // Only the Oil sector plots will be shown on initial load
};
