from flask import Flask, render_template, request, jsonify, make_response
import requests
import json
from werkzeug.exceptions import NotFound

app = Flask(__name__)

PORT = 6009
HOST = '0.0.0.0'

# Load cinema locations data from the JSON file at startup
with open('{}/data/locations.json'.format("."), "r") as jsf:
   locations = json.load(jsf)["cinemas"]

@app.route("/", methods=['GET'])
def home():
   return "<h1 style='color:blue'>Welcome to the locations service!</h1>"

# Route to retrieve all cinema locations
@app.route("/cinemas", methods=['GET'])
def get_users():
    res = make_response(jsonify(locations), 200)
    return res

# Route to get a specific cinema by its ID
@app.route("/cinemas/<cinemaid>", methods=['GET'])
def get_cinema_byid(cinemaid):
    for cinema in locations:
        if str(cinema["id"]) == str(cinemaid):
            res = make_response(jsonify(cinema),200)
            return res
    return make_response(jsonify({"error":"Cinema not found"}),400)

# Route to get cinemas showing a specific movie
@app.route('/cinemas_by_movie', methods=['GET'])
def get_cinemas_by_movie():
    movie_id = request.args.get('movie_id')
    
    if not movie_id:
        return jsonify({"error": "Movie_id is required"}), 400
    
    result = []
    
    for cinema in locations:
        cinema_result = {"cinema_id": cinema["id"], "dates": []}
        
        for date, movies in cinema["movies_by_date"].items():
            if movie_id in movies:
                cinema_result["dates"].append(date)
        
        if cinema_result["dates"]:
            result.append(cinema_result)
    
    if result:
        return jsonify(result), 200
    else:
        return jsonify({"message": "Movie not found in any cinema"}), 404

# Route to get cinemas showing a specific movie on a specific date   
@app.route('/cinemas_by_movie_and_date', methods=['GET'])
def get_cinemas_by_movie_and_date():
    movie_id = request.args.get('movie_id')
    date = request.args.get('date')

    if not movie_id or not date:
        return jsonify({"error": "movie_id and date are required"}), 400

    result = []

    for cinema in locations:
        if date in cinema["movies_by_date"]:
            if movie_id in cinema["movies_by_date"][date]:
                result.append({"cinema_id": cinema["id"]})
    
    if result:
        return jsonify(result), 200
    else:
        return jsonify({"message": "Movie not found in any cinema for the given date"}), 404

if __name__ == "__main__":
    print("Server running in port %s"%(PORT))
    app.run(host=HOST, port=PORT)