import React, { useState } from 'react';
import { NavbarFooterIncluded } from 'layouts';
import axios from 'axios';
import Cookies from 'js-cookie';

const LoginPage = () => {
  // State to store email and password
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://127.0.0.1:5000/login', formData); 
      const { token } = response.data;

      // Store the token in a cookie
      Cookies.set('imtdbtoken', token, { expires: 7 }); // Expires in 7 days

      // Redirect to a different page or perform other actions
      console.log('Login successful. Token stored in cookie.');
      alert('Login successful!');
    } catch (error) {
      console.error('Error during login:', error);
    }
  };

  return (
    <NavbarFooterIncluded>
      <div className="flex flex-col justify-center font-[sans-serif] sm:h-screen p-4">
        <div className="max-w-md w-full mx-auto border border-gray-300 rounded-2xl p-8">
          <form onSubmit={handleSubmit}>
            <div className="space-y-6">
              <div>
                <label className="text-gray-800 text-sm mb-2 block dark:text-white">Email Id</label>
                <input
                  name="email"
                  type="text"
                  value={formData.email}
                  onChange={handleChange}
                  className="text-gray-800 bg-white border border-gray-300 w-full text-sm px-4 py-3 rounded-md outline-blue-500"
                  placeholder="Enter email"
                />
              </div>
              <div>
                <label className="text-gray-800 text-sm mb-2 block dark:text-white">Password</label>
                <input
                  name="password"
                  type="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="text-gray-800 bg-white border border-gray-300 w-full text-sm px-4 py-3 rounded-md outline-blue-500"
                  placeholder="Enter password"
                />
              </div>
            </div>
            <div className="!mt-12">
              <button type="submit" className="w-full py-3 px-4 text-sm tracking-wider font-semibold rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none">
                Login
              </button>
            </div>
            <p className="text-gray-800 text-sm mt-6 text-center dark:text-white">
              You don't have an account? <a href="/signup" className="text-blue-600 font-semibold hover:underline ml-1">SignUp here</a>
            </p>
          </form>
        </div>
      </div>
    </NavbarFooterIncluded>
  );
};

export default LoginPage;
