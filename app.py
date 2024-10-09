from flask import Flask, render_template
import pandas as pd

# Initialize Flask app, setting the template folder to the root directory
app = Flask(__name__, template_folder='.')

# Load the datasets
df_oil = pd.read_csv('data/filtered_oil_data.csv')
df_tele = pd.read_csv('data/filtered_tele_data.csv')

# Define the main route to render index.html from the root directory
@app.route('/')
def index():
    return render_template('index.html')

# Route to serve oil data as JSON (optional)
@app.route('/oil_data')
def oil_data():
    return df_oil.to_json(orient='records')

# Route to serve telecom data as JSON (optional)
@app.route('/tele_data')
def tele_data():
    return df_tele.to_json(orient='records')

if __name__ == '__main__':
    app.run(debug=True)
