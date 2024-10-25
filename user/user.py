# REST API
from flask import Flask, render_template, request, jsonify, make_response
import requests
import json
from werkzeug.exceptions import NotFound
from flask_cors import CORS

# CALLING gRPC requests
import grpc
from concurrent import futures
import booking_pb2
import booking_pb2_grpc


app = Flask(__name__)
CORS(app)
PORT = 3004
HOST = '0.0.0.0'

with open('{}/data/users.json'.format("."), "r") as jsf:
   users = json.load(jsf)["users"]

# REST API for User
@app.route("/", methods=['GET'])
def home():
   return "<h1 style='color:blue'>Welcome to the User service!</h1>"

@app.route("/users", methods=['GET'])
def get_users():
   res = make_response(jsonify(users), 200)
   return res


@app.route("/users/<userid>", methods=['GET'])
def get_user_byid(userid):
   for user in users:
      if str(user["id"]) == str(userid):
         res = make_response(jsonify(user),200)
         return res
   return make_response(jsonify({"error":"User not found"}),400)

@app.route("/movies", methods=['GET'])
def get_movies():
   all_movies_query = """
{
    all_movies {
        id
        title
        director
        rating
        poster
        overview
        actors {
            id
            firstname
            lastname
            birthyear
            films
            }
    }
}
"""
   movies_url = "http://localhost:3001"
   movies_response = requests.post(movies_url + "/graphql",json={'query': all_movies_query})
   print(movies_response)
   return make_response(movies_response.json(),200)

@app.route("/bookingInfo/<userId>", methods=['GET'])
def get_booking_info(userId):
    movies_url = "http://localhost:3001"

    # Set up gRPC channel and stub
    with grpc.insecure_channel('localhost:3003') as channel:
        stub = booking_pb2_grpc.BookingServiceStub(channel)

        # Create a request to get user bookings
        user_request = booking_pb2.UserId(userid=userId)
        
        try:
            bookings_response = stub.GetUserBookings(user_request)
        except grpc.RpcError as e:
            return make_response(jsonify({"error": "Failed to fetch bookings", "details": str(e)}), 500)

    # Check if bookings request was successful
    if bookings_response is None:  # Check for empty response
        return make_response(jsonify({"error": "No bookings found for user"}), 404)

    dates = bookings_response.dates  
    movies = []
    
    for date in dates:
        movies += date.movies  

    movies_info = []

    # Fetch movie information for each booked movie
    for movie_id in movies:
        query = f"""
      {{
           movie_with_id(_id: "{movie_id}") {{
               id
               title
               director
               rating
               actors {{
                   id
                   firstname
                   lastname
                   birthyear
                   films
               }}
         }}
      }}
      """
        movie_response = requests.post(movies_url + "/graphql", json={'query': query})

        # Check if movie request was successful
        if movie_response.status_code == 200:
            movies_info.append(movie_response.json())  # Add the movie details
        else:
            # Handle failed movie fetch 
            movies_info.append({"movie_id": movie_id, "error": "Failed to fetch movie info"})

    # Return all movie information as a JSON response
    return make_response(jsonify(movies_info), 200)



if __name__ == "__main__":
   print("Server running in port %s"%(PORT))
   app.run(host=HOST, port=PORT)