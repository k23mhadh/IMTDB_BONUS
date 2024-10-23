import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";
import { GiHamburgerMenu } from "react-icons/gi";
import { Link, NavLink, useLocation } from "react-router-dom";
import { navItems } from "datas";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation(); // Get current route
  const [isOpen, setIsOpen] = useState(false);
  const [providedInput, setProvidedInput] = useState("");
  
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <div className="w-full flex items-center justify-between space-x-5 p-5 bg-black" style={{ minHeight: '80px' }}>
        <Link to="/">
          <h4 className="uppercase font-AtypDisplayBold text-green-500">
            IMTDB
          </h4>
        </Link>
        <div className="justify-between w-full space-x-5 hidden lg:flex">
          <ul className="flex items-center justify-center space-x-5">
            {navItems.map((singleNavItem) => {
              return (
                <NavLink
                  key={singleNavItem.providedLink}
                  to={singleNavItem.providedLink}
                >
                  <li>{singleNavItem.title}</li>
                </NavLink>
              );
            })}
          </ul>
          {/* Conditionally render or hide the search bar without changing layout */}
          <div className="flex items-center" style={{ minHeight: '48px' }}>
            <div
              className={`flex bg-gray-800 overflow-hidden rounded-md transition-all duration-300 ${location.pathname === '/login' || location.pathname === '/signup' ? 'invisible opacity-0' : 'visible opacity-100'}`}
              style={{ height: '100%' }}
            >
              <input
                type="text"
                className="px-8 py-3 border-none outline-none bg-transparent"
                placeholder="Search any movie..."
                onChange={(e) => {
                  setProvidedInput(e.target.value);
                }}
              />
              <button
                className="bg-green-500 px-5 text-gray-900"
                onClick={() => {
                  navigate("/search");
                }}
              >
                <FaSearch />
              </button>
            </div>
          </div>
          <div>
            <ul className="flex items-center justify-center space-x-5">
              <li>
                <NavLink key="/login" to="/login">Login</NavLink>
              </li>
              <li>
                <NavLink key="/signup" to="/signup">Signup</NavLink>
              </li>
            </ul>
          </div>
        </div>
        <div
          className="text-2xl flex items-center justify-center p-2 lg:hidden cursor-pointer select-none"
          onClick={toggleMenu}
        >
          <GiHamburgerMenu />
        </div>
      </div>
      {isOpen && (
        <div className="fixed top-0 bottom-0 left-0 right-0 h-full bg-black/90 w-full -z-10 py-20 px-5 flex">
          <ul className="flex flex-col justify-center">
            {navItems.map((singleNavItem) => {
              return (
                <NavLink
                  key={singleNavItem.providedLink}
                  to={singleNavItem.providedLink}
                >
                  <li className="custom-minor-title py-4">
                    {singleNavItem.title}
                  </li>
                </NavLink>
              );
            })}
          </ul>
        </div>
      )}
    </>
  );
};

export default Navbar;
