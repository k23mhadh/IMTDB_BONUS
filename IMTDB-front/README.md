# IMTDB_BONUS

### Description
IMTDB is a web-based movie booking and information platform, providing features like user authentication, movie booking, and access to showtimes. The application utilizes a microservices architecture, employing gRPC ,RESST and GraphQl for backend communication and MongoDB for data storage.

### Features
- **User Authentication**: Users can sign up and log in to access the booking features.
- **Movie Booking**: Users can select movies, choose showtimes, and make bookings.
- **Responsive Design**: The platform is designed to work on both desktop and mobile devices.

### Technologies Used
- **Frontend**: React, Tailwind CSS
- **Backend**: Flask, MongoDB
- **Database**: MongoDB Atlas

### Getting Started

#### Prerequisites
- Node.js and npm (for frontend)
- Python 3.x (for backend)
- MongoDB Atlas account (for database)

#### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/k23mhadh/IMTDB_BONUS.git
   cd IMTDB_BONUS

    Set up the backend
        Navigate to the backend directory.
        Install the required Python packages.

    bash

pip install -r requirements.txt

    Configure your environment variables (e.g., MongoDB URI).
    Run the Flask server.

bash

python app.py

Set up the frontend

    Navigate to the frontend directory.
    Install the required npm packages.

bash

npm install

    Start the React application.

bash

    npm run start

Usage

    Visit http://localhost:3000 in your browser to access the application.
    Create a new account or log in with your existing credentials.
    Browse available movies and proceed to book your showtimes.
