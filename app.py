from flask import Flask, render_template
import pandas as pd
from dash import Dash, dcc, html
from dash.dependencies import Input, Output
import plotly.graph_objects as go

# Initialize Flask app, setting the template folder to the root directory
app = Flask(__name__, template_folder='.')

# Load the datasets
df_oil = pd.read_csv('data/outputs/filtered_oil_data.csv')
df_tele = pd.read_csv('data/outputs/filtered_tele_data.csv')
df_results_oil = pd.read_csv('data/outputs/results_oil.csv')
df_results_tele = pd.read_csv('data/outputs/results_tele.csv')
df_results = pd.read_csv('data/outputs/combined_results.csv')
df_data = pd.read_csv('data/outputs/combined_filtered_data.csv')

# Define the main route to render index.html from the root directory
@app.route('/')
def index():
    return render_template('index.html')

# Helper function to create Dash apps for different datasets
def create_dash_app(server, route, df, id_prefix, x_column, default_metric):
    dash_app = Dash(
        __name__,
        server=server,
        routes_pathname_prefix=route
    )

    # Dash Layout and Callbacks
    dash_app.layout = html.Div([
        html.Div([
            dcc.Dropdown(
                id=f'{id_prefix}-company-filter',
                options=[{'label': company, 'value': company} for company in df['Company'].unique()],
                value=df['Company'].unique(),
                multi=True,
                placeholder="Select companies",
                style={'width': '45%', 'display': 'inline-block'}
            ),
            dcc.Dropdown(
                id=f'{id_prefix}-metric-dropdown',
                options=[{'label': metric, 'value': metric} for metric in df.columns if metric not in ['Company', x_column]],
                value=default_metric,
                clearable=False,
                style={'width': '45%', 'display': 'inline-block', 'margin-left': '5%'}
            )
        ], style={'display': 'flex', 'justify-content': 'center'}),
        dcc.Graph(id=f'{id_prefix}-graph')
    ])

    @dash_app.callback(
        Output(f'{id_prefix}-graph', 'figure'),
        [Input(f'{id_prefix}-company-filter', 'value'), Input(f'{id_prefix}-metric-dropdown', 'value')]
    )
    def update_graph(selected_companies, selected_metric):
        filtered_df = df[df['Company'].isin(selected_companies)]
        fig = go.Figure()
        for company in selected_companies:
            company_data = filtered_df[filtered_df['Company'] == company]
            fig.add_trace(go.Scatter(x=company_data[x_column], y=company_data[selected_metric],
                                     mode='lines', name=company))
        fig.update_layout(
            xaxis_title=x_column,
            yaxis_title=selected_metric,
            showlegend=True
        )
        return fig

# Create individual Dash apps for each dataset
create_dash_app(app, '/oil/', df_oil, 'oil', 'Date', 'Adj Close')
create_dash_app(app, '/tele/', df_tele, 'tele', 'Date', 'Adj Close')
create_dash_app(app, '/results_oil/', df_results_oil, 'results-oil', 'Quarter', 'Quarterly Stock Price Change (%)')
create_dash_app(app, '/results_tele/', df_results_tele, 'results-tele', 'Quarter', 'Quarterly Stock Price Change (%)')
create_dash_app(app, '/combined_results/', df_results, 'combined-results', 'Quarter', 'Quarterly Stock Price Change (%)')
create_dash_app(app, '/combined_filtered/', df_data, 'combined-filtered', 'Date', 'Adj Close')

# Run the Flask app
if __name__ == '__main__':
    app.run(debug=True)
