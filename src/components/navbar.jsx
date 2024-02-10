import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaBars } from "react-icons/fa";
import { Button } from "@material-tailwind/react";
import {
  signOut,
} from "firebase/auth";
import { auth } from "../config/firebaseconfig/firebaseconfig";

const Navbar = () => {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!isMobileMenuOpen);
  };
  function SignOut() {
    signOut(auth)
  }
  return (
    <nav className="bg-blue-700 p-4 w-screen">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-white text-lg font-bold">
          Dashboard
        </Link>

        <div className="hidden lg:flex space-x-4">
          <Link to="/adminpanel" className="text-white">
            Add Course
          </Link>
          <Link to="/allStudents" className="text-white">
            All Students
          </Link>
          <Link to="/allCourses" className="text-white">
            All Courses
          </Link>
          <Link to="/" onClick={SignOut} className="text-black">
            logout
          </Link>
        </div>

        <div className="lg:hidden">
          <FaBars
            className="text-white text-2xl cursor-pointer"
            onClick={toggleMobileMenu}
          />
        </div>
        {isMobileMenuOpen && (
          <div className="lg:hidden absolute flex flex-col text-center top-14 left-70 right-0 bg-gray-700">
            <Link to="/adminpanel" className="block text-white p-2">
              Add Course
            </Link>
            <Link to="/allStudents" className="block text-white p-2">
              All Students
            </Link>
            <Link to="/allCourses" className="block text-white p-2">
              All Courses
            </Link>
            <Link to="/" onClick={SignOut} className="block text-black p-2">
              Logout
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
