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

// Function to toggle between different sections (Oil, Telecom, Combined)
function switchSection(view) {
    const sections = document.querySelectorAll('.section');
    const buttons = document.querySelectorAll('.plot-toggle-btn');
    
    // Hide all sections and remove 'active' class from buttons
    sections.forEach(section => section.style.display = 'none');
    buttons.forEach(btn => btn.classList.remove('active'));

    // Show the relevant section and highlight the selected button
    if (view === 'oil') {
        document.getElementById('oil-section').style.display = 'block';
        document.getElementById('oil-btn').classList.add('active');
    } else if (view === 'tele') {
        document.getElementById('tele-section').style.display = 'block';
        document.getElementById('tele-btn').classList.add('active');
    } else if (view === 'combined') {
        document.getElementById('combined-section').style.display = 'block';
        document.getElementById('combined-btn').classList.add('active');
    }
}


window.onload = function() {
    // Your existing event listeners and code
    var toggleBtn = document.getElementById('oil-btn');  // Example element
    if (toggleBtn) {
        toggleBtn.addEventListener('click', function() {
            // Event listeners for section toggle buttons
document.getElementById('oil-btn').addEventListener('click', () => switchSection('index'));
document.getElementById('tele-btn').addEventListener('click', () => switchSection('tele'));
document.getElementById('combined-btn').addEventListener('click', () => switchSection('combined'));

        });
    }
};


// Set the default section to Oil on page load
window.onload = () => {
    switchSection('index');
};

window.onload = function() {
    document.addEventListener("DOMContentLoaded", function() {
        // Initialize Oil ROI Tabulator Table
        var oilRoiTable = new Tabulator("#oil-roi-table", {
            ajaxURL: "/oil_roi_data",  // The endpoint for the data
            layout: "fitColumns",      // Fit columns to the available width
            height: "250px",           // Set height for the table
            placeholder: "No Data Available",  // Placeholder if no data is found
            columns: [
                {title: "Company", field: "Company", width: 150},  // Company on the left
                {title: "2020Q1", field: "2020Q1", formatter: "money", formatterParams: {symbol: "$"}},
                {title: "2020Q2", field: "2020Q2", formatter: "money", formatterParams: {symbol: "$"}},
                {title: "2020Q3", field: "2020Q3", formatter: "money", formatterParams: {symbol: "$"}},
                {title: "2020Q4", field: "2020Q4", formatter: "money", formatterParams: {symbol: "$"}},
                {title: "2021Q1", field: "2021Q1", formatter: "money", formatterParams: {symbol: "$"}},
                {title: "2021Q2", field: "2021Q2", formatter: "money", formatterParams: {symbol: "$"}},
                {title: "2021Q3", field: "2021Q3", formatter: "money", formatterParams: {symbol: "$"}},
                {title: "2021Q4", field: "2021Q4", formatter: "money", formatterParams: {symbol: "$"}},
            ]
        });

        // Initialize Telecom ROI Tabulator Table
        var teleRoiTable = new Tabulator("#tele-roi-table", {
            ajaxURL: "/tele_roi_data",  // The endpoint for the data
            layout: "fitColumns",      // Fit columns to the available width
            height: "250px",           // Set height for the table
            placeholder: "No Data Available",  // Placeholder if no data is found
            columns: [
                {title: "Company", field: "Company", width: 150},  // Company on the left
                {title: "2020Q1", field: "2020Q1", formatter: "money", formatterParams: {symbol: "$"}},
                {title: "2020Q2", field: "2020Q2", formatter: "money", formatterParams: {symbol: "$"}},
                {title: "2020Q3", field: "2020Q3", formatter: "money", formatterParams: {symbol: "$"}},
                {title: "2020Q4", field: "2020Q4", formatter: "money", formatterParams: {symbol: "$"}},
                {title: "2021Q1", field: "2021Q1", formatter: "money", formatterParams: {symbol: "$"}},
                {title: "2021Q2", field: "2021Q2", formatter: "money", formatterParams: {symbol: "$"}},
                {title: "2021Q3", field: "2021Q3", formatter: "money", formatterParams: {symbol: "$"}},
                {title: "2021Q4", field: "2021Q4", formatter: "money", formatterParams: {symbol: "$"}},
            ]
        });

        // Initialize Combined ROI Tabulator Table
        var combinedRoiTable = new Tabulator("#combined-roi-table", {
            ajaxURL: "/combined_roi_data",  // The endpoint for the data
            layout: "fitColumns",      // Fit columns to the available width
            height: "250px",           // Set height for the table
            placeholder: "No Data Available",  // Placeholder if no data is found
            columns: [
                {title: "Company", field: "Company", width: 150},  // Company on the left
                {title: "2020Q1", field: "2020Q1", formatter: "money", formatterParams: {symbol: "$"}},
                {title: "2020Q2", field: "2020Q2", formatter: "money", formatterParams: {symbol: "$"}},
                {title: "2020Q3", field: "2020Q3", formatter: "money", formatterParams: {symbol: "$"}},
                {title: "2020Q4", field: "2020Q4", formatter: "money", formatterParams: {symbol: "$"}},
                {title: "2021Q1", field: "2021Q1", formatter: "money", formatterParams: {symbol: "$"}},
                {title: "2021Q2", field: "2021Q2", formatter: "money", formatterParams: {symbol: "$"}},
                {title: "2021Q3", field: "2021Q3", formatter: "money", formatterParams: {symbol: "$"}},
                {title: "2021Q4", field: "2021Q4", formatter: "money", formatterParams: {symbol: "$"}},
            ]
        });
    });
}