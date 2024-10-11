from flask import Flask, render_template
import pandas as pd

# Initialize Flask app, setting the template folder to the root directory
app = Flask(__name__, template_folder='.')

# Load the datasets
df_oil = pd.read_csv('data/outputs/filtered_oil_data.csv')
df_tele = pd.read_csv('data/outputs/filtered_tele_data.csv')

# Define the main route to render index.html from the root directory
@app.route('/')
def index():
    return render_template('index.html')

if __name__ == '__main__':
    app.run(debug=True)
