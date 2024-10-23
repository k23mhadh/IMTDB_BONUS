from flask import Flask, request, jsonify
from flask_pymongo import PyMongo
from werkzeug.security import generate_password_hash, check_password_hash
import jwt
import datetime
from functools import wraps
import bcrypt

app = Flask(__name__)

# Secret key for encoding JWT tokens
app.config['SECRET_KEY'] = 'f123456789uck'  

# MongoDB config
app.config["MONGO_URI"] = "mongodb+srv://kaiesmhadhbi:17wGQ3pmV1XBjg0Q@cluster0.astll.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
mongo = PyMongo(app)
users = mongo.db.IMTDB_auth  # Users collection

# Helper function to check token
def token_required(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        token = request.headers.get('x-access-token')  # JWT token should be sent in request header
        
        if not token:
            return jsonify({'message': 'Token is missing!'}), 403

        try:
            data = jwt.decode(token, app.config['SECRET_KEY'], algorithms=["HS256"])
            current_user = users.find_one({'username': data['username']})
            if not current_user:
                raise ValueError("Invalid token")
        except Exception as e:
            return jsonify({'message': f'Token is invalid! {str(e)}'}), 403
        
        return f(current_user, *args, **kwargs)

    return decorated

# Register route
@app.route('/register', methods=['POST'])
def register():
    data = request.get_json()

    # Check if user exists
    existing_user = users.find_one({'username': data['username']})
    
    if existing_user:
        return jsonify({'message': 'User already exists'}), 400

    hashed_password = bcrypt.hashpw(data['password'].encode('utf-8'), bcrypt.gensalt())

    users.insert_one({'username': data['username'], 'password': hashed_password})
    
    return jsonify({'message': 'Registered successfully'}), 201

# Login route
@app.route('/login', methods=['POST'])
def login():
    data = request.get_json()

    # Fetch user from database
    user = users.find_one({'username': data['username']})

    if user:
        # Check password
        if bcrypt.checkpw(data['password'].encode('utf-8'), user['password']):
            token = jwt.encode(
                {'username': user['username'], 'exp': datetime.datetime.utcnow() + datetime.timedelta(hours=1)},
                app.config['SECRET_KEY'], algorithm="HS256"
            )
            return jsonify({'token': token})
        else:
            return jsonify({'message': 'Invalid password'}), 401

    return jsonify({'message': 'User not found'}), 404

# Protected route
@app.route('/protected', methods=['GET'])
@token_required
def protected(current_user):
    return jsonify({'message': f'Hello {current_user["username"]}, you are authorized!'})


if __name__ == '__main__':
    app.run(debug=True)
