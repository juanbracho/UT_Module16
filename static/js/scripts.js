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
window.onload = function() {
    loadSavedTheme();

    // Set default section on page load
    switchSection('oil');
};

// Function to toggle between different sections (Oil, Telecom, Combined)
function switchSection(view) {
    const sections = {
        oil: 'oil-section',
        tele: 'tele-section',
        combined: 'combined-section'
    };
    
    const buttons = document.querySelectorAll('.plot-toggle-btn');

    // Hide all sections and remove 'active' class from buttons
    for (const section in sections) {
        document.getElementById(sections[section]).style.display = 'none';
    }
    buttons.forEach(btn => btn.classList.remove('active'));

    // Show the relevant section and highlight the selected button
    document.getElementById(sections[view]).style.display = 'block';
    document.getElementById(`${view}-btn`).classList.add('active');
}

// Initialize the Tabulator tables after the DOM content is fully loaded
document.addEventListener("DOMContentLoaded", function() {
    // Initialize Oil ROI Tabulator Table
    var oilRoiTable = new Tabulator("#oil-roi-table", {
        ajaxURL: "/oil_roi_data",
        layout: "fitColumns",
        height: "100px",
        placeholder: "No Data Available",
        columns: [
            { title: "Company", field: "Company", width: 150 },
            { title: "2020Q1", field: "2020Q1", formatter: "money", formatterParams: { symbol: "$" } },
            { title: "2020Q2", field: "2020Q2", formatter: "money", formatterParams: { symbol: "$" } },
            { title: "2020Q3", field: "2020Q3", formatter: "money", formatterParams: { symbol: "$" } },
            { title: "2020Q4", field: "2020Q4", formatter: "money", formatterParams: { symbol: "$" } },
            { title: "2021Q1", field: "2021Q1", formatter: "money", formatterParams: { symbol: "$" } },
            { title: "2021Q2", field: "2021Q2", formatter: "money", formatterParams: { symbol: "$" } },
            { title: "2021Q3", field: "2021Q3", formatter: "money", formatterParams: { symbol: "$" } },
            { title: "2021Q4", field: "2021Q4", formatter: "money", formatterParams: { symbol: "$" } }
        ]
    });

    // Initialize Telecom ROI Tabulator Table
    var teleRoiTable = new Tabulator("#tele-roi-table", {
        ajaxURL: "/tele_roi_data",
        layout: "fitColumns",
        height: "100px",
        placeholder: "No Data Available",
        columns: [
            { title: "Company", field: "Company", width: 150 },
            { title: "2020Q1", field: "2020Q1", formatter: "money", formatterParams: { symbol: "$" } },
            { title: "2020Q2", field: "2020Q2", formatter: "money", formatterParams: { symbol: "$" } },
            { title: "2020Q3", field: "2020Q3", formatter: "money", formatterParams: { symbol: "$" } },
            { title: "2020Q4", field: "2020Q4", formatter: "money", formatterParams: { symbol: "$" } },
            { title: "2021Q1", field: "2021Q1", formatter: "money", formatterParams: { symbol: "$" } },
            { title: "2021Q2", field: "2021Q2", formatter: "money", formatterParams: { symbol: "$" } },
            { title: "2021Q3", field: "2021Q3", formatter: "money", formatterParams: { symbol: "$" } },
            { title: "2021Q4", field: "2021Q4", formatter: "money", formatterParams: { symbol: "$" } }
        ]
    });

    // Initialize Combined ROI Tabulator Table
    var combinedRoiTable = new Tabulator("#combined-roi-table", {
        ajaxURL: "/combined_roi_data",
        layout: "fitColumns",
        height: "200px",
        placeholder: "No Data Available",
        columns: [
            { title: "Company", field: "Company", width: 150 },
            { title: "2020Q1", field: "2020Q1", formatter: "money", formatterParams: { symbol: "$" } },
            { title: "2020Q2", field: "2020Q2", formatter: "money", formatterParams: { symbol: "$" } },
            { title: "2020Q3", field: "2020Q3", formatter: "money", formatterParams: { symbol: "$" } },
            { title: "2020Q4", field: "2020Q4", formatter: "money", formatterParams: { symbol: "$" } },
            { title: "2021Q1", field: "2021Q1", formatter: "money", formatterParams: { symbol: "$" } },
            { title: "2021Q2", field: "2021Q2", formatter: "money", formatterParams: { symbol: "$" } },
            { title: "2021Q3", field: "2021Q3", formatter: "money", formatterParams: { symbol: "$" } },
            { title: "2021Q4", field: "2021Q4", formatter: "money", formatterParams: { symbol: "$" } }
        ]
    });
});