import { getSingleMovie } from "services/api";
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { NavbarFooterIncluded } from "layouts";

const BookNowPage = () => {
  const { id } = useParams(); // Get the film ID from the URL
  const [film, setFilm] = useState(null); // State to hold film details
  const [loading, setLoading] = useState(true); // Loading state

  useEffect(() => {
    // Fetch the film details based on the film ID
    const fetchFilmDetails = async () => {
      try {
        const response = await getSingleMovie(id);
        setFilm(response); // Set film details in state
        setLoading(false); // Set loading to false
      } catch (error) {
        console.error('Error fetching film details:', error);
        setLoading(false);
      }
    };

    fetchFilmDetails();
  }, [id]);

  // Loading spinner
  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-900">
        <div className="loader"></div>
      </div>
    );
  }

  // If film details are not found
  if (!film) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-900">
        <p className="text-lg text-red-500">Film not found!</p>
      </div>
    );
  }

  return (
    <NavbarFooterIncluded>
      <div className="min-h-screen flex flex-col bg-black text-white">
        {/* Adjust padding for the main content area */}
        <main className="flex-grow container mx-auto p-6 pt-24">
          <h2 className="text-2xl font-semibold mb-4">{film.title}</h2>

          {/* Film Details */}
          <div className="mb-6 flex flex-col md:flex-row md:items-center bg-gray-800 shadow-md rounded-lg p-4">
            <img
              src={film.poster}
              alt={film.title}
              className="w-full md:w-1/2 h-48 object-cover rounded-lg"
            />
            <div className="md:ml-4">
              <p className="text-lg font-bold">Director: {film.director}</p>
              <p className="text-gray-300">Rating: {film.rating}</p>
            </div>
          </div>

          {/* Booking Form Section */}
          <div className="bg-gray-800 shadow-md rounded-lg p-6">
            <h2 className="text-2xl font-semibold mb-4">Booking Information</h2>
            <form>
              <div className="mb-4">
                <label htmlFor="name" className="block text-gray-300 mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  id="name"
                  placeholder="Enter your full name"
                  className="w-full border border-gray-600 bg-gray-900 text-white p-2 rounded"
                  required
                />
              </div>
              <div className="mb-4">
                <label htmlFor="email" className="block text-gray-300 mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  placeholder="Enter your email"
                  className="w-full border border-gray-600 bg-gray-900 text-white p-2 rounded"
                  required
                />
              </div>
              <div className="mb-4">
                <label htmlFor="date" className="block text-gray-300 mb-2">
                  Date
                </label>
                <input
                  type="date"
                  id="date"
                  className="w-full border border-gray-600 bg-gray-900 text-white p-2 rounded"
                  required
                />
              </div>
              <div className="mb-4">
                <label htmlFor="time" className="block text-gray-300 mb-2">
                  Time
                </label>
                <select id="time" className="w-full border border-gray-600 bg-gray-900 text-white p-2 rounded" required>
                  <option value="">Select a time</option>
                  <option value="10:00">10:00 AM</option>
                  <option value="13:00">1:00 PM</option>
                  <option value="16:00">4:00 PM</option>
                  <option value="19:00">7:00 PM</option>
                </select>
              </div>
              <button type="submit" className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700">
                Confirm Booking
              </button>
            </form>
          </div>
        </main>
      </div>
    </NavbarFooterIncluded>
  );
};

export default BookNowPage;
