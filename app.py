# Import necessary libraries
from flask import Flask, render_template, request, jsonify
import pandas as pd
import threading
# Initialize Flask app
app = Flask(__name__)
# Load cleaned data (you should replace these with your actual data paths)
countries_data = pd.read_csv("Cleaned Data/Countries.csv")
states_data = pd.read_csv("Cleaned Data/States.csv")
cities_data = pd.read_csv("Cleaned Data/Cities.csv")
population_data = pd.read_csv("Cleaned Data/population.csv")
global_data = pd.read_csv("Cleaned Data/global.csv")
# Define route for home page
@app.route('/')
def home():
    return render_template('index.html')
# Define route for countries data
@app.route('/countries')
def countries():
    return render_template('countries.html', data=countries_data.to_json(orient='records'))
# Define route for states data
@app.route('/states')
def states():
    return render_template('states.html', data=states_data.to_json(orient='records'))
# Define route for cities data
@app.route('/cities')
def cities():
    return render_template('cities.html', data=cities_data.to_json(orient='records'))
# Define route for population data
@app.route('/population')
def population():
    return render_template('population.html', data=population_data.to_json(orient='records'))
# Define route for global data
@app.route('/global')
def global_data():
    return render_template('global.html', data=global_data.to_json(orient='records'))
# Function to run the Flask app in a separate thread
def run_flask_app():
    app.run(debug=True)
# Start the Flask app in a separate thread
flask_thread = threading.Thread(target=run_flask_app)
flask_thread.start()