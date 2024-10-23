import React, { useState } from 'react';
import { NavbarFooterIncluded } from 'layouts';

const SignupPage = () => {
  // State for form fields
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    cpassword: '',
    rememberMe: false,
  });

  // Handle form field changes
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value, // Handle checkbox separately
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.cpassword) {
      alert("Passwords don't match!");
      return;
    }

    try {
      // Send data to API
      const response = await fetch('http://127.0.0.1:5000/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          password: formData.password,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        alert('Signup successful!');
      } else {
        alert(`Signup failed: ${data.message}`);
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred during signup.');
    }
  };

  return (
    <NavbarFooterIncluded>
      <div className="flex flex-col justify-center font-[sans-serif] sm:h-screen p-4">
        <div className="max-w-md w-full mx-auto border border-gray-300 rounded-2xl p-8">
          <form onSubmit={handleSubmit}>
            <div className="space-y-6">
              <div>
                <label className="text-gray-800 text-sm mb-2 block dark:text-white">Name</label>
                <input
                  name="name"
                  type="text"
                  className="text-gray-800 bg-white border border-gray-300 w-full text-sm px-4 py-3 rounded-md outline-blue-500"
                  placeholder="Enter your name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <label className="text-gray-800 text-sm mb-2 block dark:text-white">Email Id</label>
                <input
                  name="email"
                  type="email"
                  className="text-gray-800 bg-white border border-gray-300 w-full text-sm px-4 py-3 rounded-md outline-blue-500"
                  placeholder="Enter email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <label className="text-gray-800 text-sm mb-2 block dark:text-white">Password</label>
                <input
                  name="password"
                  type="password"
                  className="text-gray-800 bg-white border border-gray-300 w-full text-sm px-4 py-3 rounded-md outline-blue-500"
                  placeholder="Enter password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <label className="text-gray-800 text-sm mb-2 block dark:text-white">Confirm Password</label>
                <input
                  name="cpassword"
                  type="password"
                  className="text-gray-800 bg-white border border-gray-300 w-full text-sm px-4 py-3 rounded-md outline-blue-500"
                  placeholder="Enter confirm password"
                  value={formData.cpassword}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="rememberMe"
                  type="checkbox"
                  className="h-4 w-4 shrink-0 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  checked={formData.rememberMe}
                  onChange={handleChange}
                />
                <label htmlFor="remember-me" className="text-gray-800 ml-3 block text-sm dark:text-white">
                  I accept the{' '}
                  <a href="#" className="text-blue-600 font-semibold hover:underline ml-1">
                    Terms and Conditions
                  </a>
                </label>
              </div>
            </div>

            <div className="!mt-12">
              <button
                type="submit"
                className="w-full py-3 px-4 text-sm tracking-wider font-semibold rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none"
              >
                Create an account
              </button>
            </div>
            <p className="text-gray-800 text-sm mt-6 text-center dark:text-white">
              Already have an account?{' '}
              <a href="/login" className="text-blue-600 font-semibold hover:underline ml-1">
                Login here
              </a>
            </p>
          </form>
        </div>
      </div>
    </NavbarFooterIncluded>
  );
};

export default SignupPage;
