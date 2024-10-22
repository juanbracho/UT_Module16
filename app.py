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

# Function to query cumulative ROI
def get_cumulative_roi_data(query):
    conn = sqlite3.connect('data/stocks_analysis.db')
    df = pd.read_sql_query(query, conn)
    
    # Pivot the data to have 'Quarter' as columns and 'Company' as rows
    df_pivot = df.pivot(index='Company', columns='Quarter', values='Cumulative ROI on $1500 ($)').reset_index()
    
    # Replace NaN values with 0 for missing data
    df_pivot.fillna(0, inplace=True)
    
    # Close the database connection
    conn.close()
    
    # Return the data in JSON format
    return df_pivot.to_dict(orient='records')

# Function to query yearly ROI and percentage change from the initial investment
@app.route('/yearly_roi_data')
def yearly_roi_data():
    conn = sqlite3.connect('data/stocks_analysis.db')

    # Fetch ROI data from the database
    df = pd.read_sql_query("SELECT Company, Quarter, `ROI on $1500 ($)` FROM combined_results", conn)
    
    # Extract year from Quarter (e.g., '2020Q1' -> '2020')
    df['Year'] = df['Quarter'].str[:4]

    # Group by Company and Year, summing the ROI for each year
    df_yearly = df.groupby(['Company', 'Year'])['ROI on $1500 ($)'].sum().reset_index()

    # Get the initial investment value (Q1 of each company's first year)
    initial_investment_df = df[df['Quarter'].str.endswith('Q1')].groupby('Company').first().reset_index()
    initial_investment_df = initial_investment_df[['Company', 'ROI on $1500 ($)']].rename(columns={'ROI on $1500 ($)': 'Initial Investment'})

    # Merge the initial investment back with the yearly data
    df_yearly = pd.merge(df_yearly, initial_investment_df, on='Company', how='left')

    # Formula to calculate the percentage change based on the initial $1500 investment
    df_yearly['Percentage Change (%)'] = (df_yearly['ROI on $1500 ($)'] / 1500) * 100

    # Pivot the data to have years (2020, 2021) as separate columns
    df_pivot = df_yearly.pivot(index='Company', columns='Year', values=['ROI on $1500 ($)', 'Percentage Change (%)']).reset_index()

    # Rename columns for Tabulator table
    df_pivot.columns = ['Company', '2020_ROI', '2021_ROI', '2020_Percentage_Change', '2021_Percentage_Change']

    # Fill missing values with 0
    df_pivot.fillna(0, inplace=True)

    # Close the database connection
    conn.close()

    # Return the data in JSON format
    return jsonify(df_pivot.to_dict(orient='records'))

# Function to query yearly ROI and percentage change from the initial investment for Telecom
@app.route('/tele_yearly_roi_data')
def tele_yearly_roi_data():
    conn = sqlite3.connect('data/stocks_analysis.db')
    df = pd.read_sql_query("SELECT Company, Quarter, `ROI on $1500 ($)` FROM combined_results WHERE Company IN ('AT&T', 'T-Mobile', 'Verizon')", conn)
    
    # Extract year from Quarter (e.g., '2020Q1' -> '2020')
    df['Year'] = df['Quarter'].str[:4]

    # Group by Company and Year, summing the ROI for each year
    df_yearly = df.groupby(['Company', 'Year'])['ROI on $1500 ($)'].sum().reset_index()

    # Get the initial investment value (Q1 of each company's first year)
    initial_investment_df = df[df['Quarter'].str.endswith('Q1')].groupby('Company').first().reset_index()
    initial_investment_df = initial_investment_df[['Company', 'ROI on $1500 ($)']].rename(columns={'ROI on $1500 ($)': 'Initial Investment'})

    # Merge the initial investment back with the yearly data
    df_yearly = pd.merge(df_yearly, initial_investment_df, on='Company', how='left')

    # Formula to calculate the percentage change based on the initial $1500 investment
    df_yearly['Percentage Change (%)'] = (df_yearly['ROI on $1500 ($)'] / 1500) * 100

    # Pivot the data to have years (2020, 2021) as separate columns
    df_pivot = df_yearly.pivot(index='Company', columns='Year', values=['ROI on $1500 ($)', 'Percentage Change (%)']).reset_index()

    # Rename columns for Tabulator table
    df_pivot.columns = ['Company', '2020_ROI', '2021_ROI', '2020_Percentage_Change', '2021_Percentage_Change']

    # Fill missing values with 0
    df_pivot.fillna(0, inplace=True)

    # Close the database connection
    conn.close()

    # Return the data in JSON format
    return jsonify(df_pivot.to_dict(orient='records'))

# Function to query yearly ROI and percentage change from the initial investment for Oil
@app.route('/oil_yearly_roi_data')
def oil_yearly_roi_data():
    conn = sqlite3.connect('data/stocks_analysis.db')
    df = pd.read_sql_query("SELECT Company, Quarter, `ROI on $1500 ($)` FROM combined_results WHERE Company IN ('Chevron', 'ExxonMobil', 'ConocoPhillips')", conn)
    
    # Extract year from Quarter (e.g., '2020Q1' -> '2020')
    df['Year'] = df['Quarter'].str[:4]

    # Group by Company and Year, summing the ROI for each year
    df_yearly = df.groupby(['Company', 'Year'])['ROI on $1500 ($)'].sum().reset_index()

    # Get the initial investment value (Q1 of each company's first year)
    initial_investment_df = df[df['Quarter'].str.endswith('Q1')].groupby('Company').first().reset_index()
    initial_investment_df = initial_investment_df[['Company', 'ROI on $1500 ($)']].rename(columns={'ROI on $1500 ($)': 'Initial Investment'})

    # Merge the initial investment back with the yearly data
    df_yearly = pd.merge(df_yearly, initial_investment_df, on='Company', how='left')

    # Formula to calculate the percentage change based on the initial $1500 investment
    df_yearly['Percentage Change (%)'] = (df_yearly['ROI on $1500 ($)'] / 1500) * 100

    # Pivot the data to have years (2020, 2021) as separate columns
    df_pivot = df_yearly.pivot(index='Company', columns='Year', values=['ROI on $1500 ($)', 'Percentage Change (%)']).reset_index()

    # Rename columns for Tabulator table
    df_pivot.columns = ['Company', '2020_ROI', '2021_ROI', '2020_Percentage_Change', '2021_Percentage_Change']

    # Fill missing values with 0
    df_pivot.fillna(0, inplace=True)

    # Close the database connection
    conn.close()

    # Return the data in JSON format
    return jsonify(df_pivot.to_dict(orient='records'))


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

# Endpoint for cumulative ROI data
@app.route('/cumulative_roi_data')
def cumulative_roi_data():
    query = """
    SELECT Company, Quarter, `Cumulative ROI on $1500 ($)`
    FROM combined_results
    """
    data = get_cumulative_roi_data(query)
    return jsonify(data)

if __name__ == '__main__':
    app.run(debug=True)
