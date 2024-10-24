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

// Refined JavaScript to hide the header title on scroll
document.addEventListener('DOMContentLoaded', function() {
    let lastScrollTop = 0;
    const header = document.querySelector('.header');
    const title = document.querySelector('.header-title');

    window.addEventListener('scroll', function () {
        let scrollTop = window.pageYOffset || document.documentElement.scrollTop;

        // If scrolling down, hide the title
        if (scrollTop > lastScrollTop) {
            header.classList.add('hide-title');
        } else {
            // If scrolling up, show the title
            header.classList.remove('hide-title');
        }
        lastScrollTop = scrollTop;
    });
});


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
    // Custom formatter to display percentages with two decimal places and a '%' symbol
    var percentageFormatter = function(cell, formatterParams, onRendered) {
        let value = cell.getValue();
        return value.toFixed(2) + "%";  // Format the value with two decimal places and add '%'
    };

    // Initialize Combined ROI Tabulator Table for yearly data
    var combinedRoiTable = new Tabulator("#combined-roi-table", {
        ajaxURL: "/yearly_roi_data", // Update URL to fetch yearly data
        layout: "fitColumns",
        height: "170px",
        placeholder: "No Data Available",
        columns: [
            { title: "Company", field: "Company", width: 150 },
            
            // Year 2020 columns
            { title: "2020 ROI ($)", field: "2020_ROI", formatter: "money", formatterParams: { symbol: "$" }, headerHozAlign: "center", hozAlign: "center" },
            { title: "2020 Percentage Change (%)", field: "2020_Percentage_Change", formatter: percentageFormatter, headerHozAlign: "center", hozAlign: "center" },  // Custom formatter for percentage
            
            // Year 2021 columns
            { title: "2021 ROI ($)", field: "2021_ROI", formatter: "money", formatterParams: { symbol: "$" }, headerHozAlign: "center", hozAlign: "center" },
            { title: "2021 Percentage Change (%)", field: "2021_Percentage_Change", formatter: percentageFormatter, headerHozAlign: "center", hozAlign: "center" }  // Custom formatter for percentage
        ]
    });

    // Initialize Telecom ROI Tabulator Table for yearly data
    var teleRoiTable = new Tabulator("#tele-roi-table", {
        ajaxURL: "/tele_yearly_roi_data", // Update URL to fetch Telecom data
        layout: "fitColumns",
        height: "170px",
        placeholder: "No Data Available",
        columns: [
            { title: "Company", field: "Company", width: 150 },
            
            // Year 2020 columns
            { title: "2020 ROI ($)", field: "2020_ROI", formatter: "money", formatterParams: { symbol: "$" }, headerHozAlign: "center", hozAlign: "center" },
            { title: "2020 Percentage Change (%)", field: "2020_Percentage_Change", formatter: percentageFormatter, headerHozAlign: "center", hozAlign: "center" },  // Custom formatter for percentage
            
            // Year 2021 columns
            { title: "2021 ROI ($)", field: "2021_ROI", formatter: "money", formatterParams: { symbol: "$" }, headerHozAlign: "center", hozAlign: "center" },
            { title: "2021 Percentage Change (%)", field: "2021_Percentage_Change", formatter: percentageFormatter, headerHozAlign: "center", hozAlign: "center" }  // Custom formatter for percentage
        ]
    });

    // Initialize Oil ROI Tabulator Table for yearly data
    var oilRoiTable = new Tabulator("#oil-roi-table", {
        ajaxURL: "/oil_yearly_roi_data", // Update URL to fetch Oil data
        layout: "fitColumns",
        height: "170px",
        placeholder: "No Data Available",
        columns: [
            { title: "Company", field: "Company", width: 150 },
            
            // Year 2020 columns
            { title: "2020 ROI ($)", field: "2020_ROI", formatter: "money", formatterParams: { symbol: "$" }, headerHozAlign: "center", hozAlign: "center" },
            { title: "2020 Percentage Change (%)", field: "2020_Percentage_Change", formatter: percentageFormatter, headerHozAlign: "center", hozAlign: "center" },  // Custom formatter for percentage
            
            // Year 2021 columns
            { title: "2021 ROI ($)", field: "2021_ROI", formatter: "money", formatterParams: { symbol: "$" }, headerHozAlign: "center", hozAlign: "center" },
            { title: "2021 Percentage Change (%)", field: "2021_Percentage_Change", formatter: percentageFormatter, headerHozAlign: "center", hozAlign: "center" }  // Custom formatter for percentage
        ]
    });
});


// Fetch cumulative ROI data for Combined and plot it using Chart.js
document.addEventListener("DOMContentLoaded", function() {
    // Define labels (quarters) for the chart
    const quarters = ["2020Q1", "2020Q2", "2020Q3", "2020Q4", "2021Q1", "2021Q2", "2021Q3", "2021Q4"];

    // Fetch cumulative ROI data from the backend
    fetch('/cumulative_roi_data')
        .then(response => response.json())
        .then(data => {
            console.log("Cumulative ROI Data:", data);  // Log fetched data to confirm

            // Prepare datasets for Chart.js
            const datasets = data.map(companyData => {
                return {
                    label: companyData.Company,
                    data: quarters.map(quarter => companyData[quarter]), // Map the quarter data
                    borderColor: getRandomColor(),
                    fill: false,
                    tension: 0.1
                };
            });

            // Create the cumulative ROI chart
            const ctx = document.getElementById('cumulativeRoiChart').getContext('2d');
            const cumulativeRoiChart = new Chart(ctx, {
                type: 'line',  // Line chart
                data: {
                    labels: quarters,  // Quarters as labels
                    datasets: datasets  // Datasets for each company
                },
                options: {
                    responsive: true,
                    plugins: {
                        title: {
                            display: true,
                            text: 'Cumulative ROI by Company'
                        }
                    },
                    scales: {
                        y: {
                            beginAtZero: true,
                            title: {
                                display: true,
                                text: 'Cumulative ROI ($)'
                            }
                        }
                    }
                }
            });
        })
        .catch(error => console.error("Error fetching cumulative ROI data:", error));

    // Function to generate random colors for the chart lines
    function getRandomColor() {
        const letters = '0123456789ABCDEF';
        let color = '#';
        for (let i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }
});

// Fetch cumulative ROI data for Oil and plot it using Chart.js
document.addEventListener("DOMContentLoaded", function() {
    // Define labels (quarters) for the chart
    const quarters = ["2020Q1", "2020Q2", "2020Q3", "2020Q4", "2021Q1", "2021Q2", "2021Q3", "2021Q4"];

    // Fetch cumulative ROI data specifically for the Oil sector
    fetch('/oil_roi_data')
        .then(response => response.json())
        .then(data => {
            console.log("Oil Cumulative ROI Data:", data);

            // Prepare datasets for Chart.js
            const datasets = data.map(companyData => {
                return {
                    label: companyData.Company,
                    data: quarters.map(quarter => companyData[quarter]), // Map the quarter data
                    borderColor: getRandomColor(),
                    fill: false,
                    tension: 0.1
                };
            });

            // Create the cumulative ROI chart for Oil
            const ctx = document.getElementById('oilRoiChart').getContext('2d');
            const cumulativeRoiChart = new Chart(ctx, {
                type: 'line',
                data: {
                    labels: quarters,
                    datasets: datasets
                },
                options: {
                    responsive: true,
                    plugins: {
                        title: {
                            display: true,
                            text: 'Cumulative ROI for Oil Companies'
                        }
                    },
                    scales: {
                        y: {
                            beginAtZero: true,
                            title: {
                                display: true,
                                text: 'Cumulative ROI ($)'
                            }
                        }
                    }
                }
            });
        })
        .catch(error => console.error("Error fetching Oil cumulative ROI data:", error));
    
    // Function to generate random colors for the chart lines
    function getRandomColor() {
        const letters = '0123456789ABCDEF';
        let color = '#';
        for (let i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }
});

// Fetch cumulative ROI data for Tele and plot it using Chart.js
document.addEventListener("DOMContentLoaded", function() {
    // Define labels (quarters) for the chart
    const quarters = ["2020Q1", "2020Q2", "2020Q3", "2020Q4", "2021Q1", "2021Q2", "2021Q3", "2021Q4"];

    // Fetch cumulative ROI data specifically for the Tele sector
    fetch('/tele_roi_data')
        .then(response => response.json())
        .then(data => {
            console.log("Tele Cumulative ROI Data:", data);

            // Prepare datasets for Chart.js
            const datasets = data.map(companyData => {
                return {
                    label: companyData.Company,
                    data: quarters.map(quarter => companyData[quarter]), // Map the quarter data
                    borderColor: getRandomColor(),
                    fill: false,
                    tension: 0.1
                };
            });

            // Create the cumulative ROI chart for Tele
            const ctx = document.getElementById('teleRoiChart').getContext('2d');
            const cumulativeRoiChart = new Chart(ctx, {
                type: 'line',
                data: {
                    labels: quarters,
                    datasets: datasets
                },
                options: {
                    responsive: true,
                    plugins: {
                        title: {
                            display: true,
                            text: 'Cumulative ROI for Tele Companies'
                        }
                    },
                    scales: {
                        y: {
                            beginAtZero: true,
                            title: {
                                display: true,
                                text: 'Cumulative ROI ($)'
                            }
                        }
                    }
                }
            });
        })
        .catch(error => console.error("Error fetching Tele cumulative ROI data:", error));

    // Function to generate random colors for the chart lines
    function getRandomColor() {
        const letters = '0123456789ABCDEF';
        let color = '#';
        for (let i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }
});
