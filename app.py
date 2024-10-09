from flask import Flask, render_template
import pandas as pd

app = Flask(__name__)

# Load the datasets
df_oil = pd.read_csv('data/filtered_oil_data.csv')
df_tele = pd.read_csv('data/filtered_tele_data.csv')

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/oil')
def oil_data():
    # Return oil data as JSON or render an oil-specific page
    return df_oil.to_json(orient='records')

@app.route('/tele')
def tele_data():
    # Return telecom data as JSON or render a telecom-specific page
    return df_tele.to_json(orient='records')

if __name__ == '__main__':
    app.run(debug=True)