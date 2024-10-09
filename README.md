 # Data Visualizations for Oil and Telecom Sectors

## Overview
This project provides interactive data visualizations for the oil and telecom sectors using Plotly. The visualizations allow users to explore different metrics (e.g., Adjusted Close Price, Volume) for major companies in these sectors. The goal is to provide a clear and interactive way to compare stock data between different companies and sectors over time.

## Features
- Visualizations for both oil and telecom sectors.
- Interactive dropdowns for selecting companies and metrics.
- Ability to view data for individual companies or compare multiple companies simultaneously.
- The project is powered by data housed in a SQLite database.

## Project Structure
- `oil_plotly.ipynb`: Jupyter Notebook for the oil sector visualizations.
- `tele_plotly.ipynb`: Jupyter Notebook for the telecom sector visualizations.
- `index.html`: Webpage where the visualizations are embedded.
- `styles.css`: CSS file to style the webpage.
- `scripts.js`: JavaScript file to enhance interactivity on the webpage.

## Instructions to Use the Project
1. Clone the repository to your local machine:
    ```bash
    git clone https://github.com/your-repo-name.git
    ```
2. Open the `index.html` file in a web browser to access the interactive visualizations.
3. Use the dropdowns in the visualizations to switch between companies and metrics.
4. If using the Flask backend, follow the instructions below.

## Flask Backend Setup
1. Install required Python packages:
    ```bash
    pip install Flask pandas plotly sqlite3
    ```
2. Run the Flask server:
    ```bash
    python app.py
    ```
3. Access the application in your browser at `http://127.0.0.1:5000`.

## Ethical Considerations
This project adheres to ethical standards by using publicly available financial data. No personal or sensitive information is involved in the project, and data usage complies with licensing agreements.

## Data Sources
- Oil and Telecom data sourced from publicly available financial datasets.

## Acknowledgments
- Plotly for interactive data visualizations.
- Flask for providing the backend framework.

