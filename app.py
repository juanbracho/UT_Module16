from flask import Flask, render_template, jsonify
import sqlite3
import pandas as pd

app = Flask(__name__, template_folder='.')

# Route to serve Combined Sector HTML
@app.route('/')
def index():
    return render_template('index.html')

# Route to serve Telecom Sector HTML
@app.route('/tele')
def tele():
    return render_template('tele.html')

# Route to serve Oil Sector HTML
@app.route('/oil')
def oil():
    return render_template('oil.html')

# Function to query database and return ROI data as JSON
def get_roi_data(query):
    conn = sqlite3.connect('data/stocks_analysis.db')
    df = pd.read_sql_query(query, conn)
    
    # Pivot the data to have 'Quarter' as columns and 'Company' as rows
    df_pivot = df.pivot(index='Company', columns='Quarter', values='ROI on $1500 ($)').reset_index()
    
    # Replace NaN values with 0 for missing data
    df_pivot.fillna(0, inplace=True)
    
    # Close the database connection
    conn.close()
    
    # Return the data in JSON format
    return df_pivot.to_dict(orient='records')

# Endpoint for Oil ROI data
@app.route('/oil_roi_data')
def oil_roi_data():
    query = """
    SELECT Company, Quarter, `ROI on $1500 ($)` 
    FROM combined_results 
    WHERE Company IN ('Chevron', 'ExxonMobil', 'ConocoPhillips')
    """
    data = get_roi_data(query)
    return jsonify(data)

# Endpoint for Telecom ROI data
@app.route('/tele_roi_data')
def tele_roi_data():
    query = """
    SELECT Company, Quarter, `ROI on $1500 ($)` 
    FROM combined_results 
    WHERE Company IN ('AT&T', 'T-Mobile', 'Verizon')
    """
    data = get_roi_data(query)
    return jsonify(data)

# Endpoint for Combined ROI data
@app.route('/combined_roi_data')
def combined_roi_data():
    query = """
    SELECT Company, Quarter, `ROI on $1500 ($)` 
    FROM combined_results
    """
    data = get_roi_data(query)
    return jsonify(data)

if __name__ == '__main__':
    app.run(debug=True)