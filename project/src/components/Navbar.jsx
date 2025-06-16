import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Calendar, Clock, Menu, X } from "lucide-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMosque } from "@fortawesome/free-solid-svg-icons";

import { useAuth } from "../contexts/AuthContext";
import { UserProfile } from "./UserProfile";
import { ThemeToggle } from "./ThemeToggle";

export const Navbar = () => {
  const location = useLocation();
  const { user } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <nav className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-islamic-200 dark:border-gray-700 sticky top-0 z-50 transition-colors duration-300">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center space-x-3 group"
            onClick={closeMobileMenu}
          >
            <div className="p-2 bg-gradient-to-br from-islamic-500 to-islamic-600 rounded-lg group-hover:from-islamic-600 group-hover:to-islamic-700 transition-all duration-200">
              <FontAwesomeIcon
                icon={faMosque}
                className="h-6 w-6 text-white"
                style={{ color: "#ffff" }}
              />
            </div>

            <div className="hidden sm:block">
              <h1 className="text-xl font-bold text-gray-800 dark:text-white transition-colors duration-300">
                Prayer Times
              </h1>
              <p className="text-xs text-gray-600 dark:text-gray-400 font-arabic transition-colors duration-300">
                أوقات الصلاة
              </p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4">
            {user && (
              <div className="flex space-x-1">
                <Link
                  to="/"
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-300 transform hover:scale-105 ${
                    location.pathname === "/"
                      ? "bg-islamic-100 dark:bg-islamic-800 text-islamic-700 dark:text-islamic-300 shadow-md"
                      : "text-gray-600 dark:text-gray-300 hover:bg-islamic-50 dark:hover:bg-gray-700 hover:text-islamic-600 dark:hover:text-islamic-400"
                  }`}
                >
                  <Clock className="h-4 w-4" />
                  <span>Today</span>
                </Link>
                <Link
                  to="/monthly"
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-300 transform hover:scale-105 ${
                    location.pathname === "/monthly"
                      ? "bg-islamic-100 dark:bg-islamic-800 text-islamic-700 dark:text-islamic-300 shadow-md"
                      : "text-gray-600 dark:text-gray-300 hover:bg-islamic-50 dark:hover:bg-gray-700 hover:text-islamic-600 dark:hover:text-islamic-400"
                  }`}
                >
                  <Calendar className="h-4 w-4" />
                  <span>Monthly</span>
                </Link>
              </div>
            )}

            <ThemeToggle />

            {user ? (
              <UserProfile />
            ) : (
              <div className="flex space-x-2">
                <Link
                  to="/login"
                  className="px-4 py-2 text-islamic-600 dark:text-islamic-400 hover:text-islamic-700 dark:hover:text-islamic-300 font-medium transition-all duration-300 transform hover:scale-105"
                >
                  Sign In
                </Link>
                <Link
                  to="/signup"
                  className="px-4 py-2 bg-gradient-to-r from-islamic-500 to-islamic-600 dark:from-islamic-600 dark:to-islamic-700 text-white rounded-lg hover:from-islamic-600 hover:to-islamic-700 dark:hover:from-islamic-700 dark:hover:to-islamic-800 transition-all duration-300 font-medium transform hover:scale-105 shadow-lg hover:shadow-xl"
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center space-x-2">
            <ThemeToggle />
            <button
              onClick={toggleMobileMenu}
              className="p-2 rounded-lg bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-islamic-200 dark:border-gray-600 hover:bg-islamic-50 dark:hover:bg-gray-700 transition-all duration-300"
            >
              {isMobileMenuOpen ? (
                <X className="h-6 w-6 text-gray-600 dark:text-gray-300" />
              ) : (
                <Menu className="h-6 w-6 text-gray-600 dark:text-gray-300" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div
          className={`md:hidden transition-all duration-300 ease-in-out ${
            isMobileMenuOpen
              ? "max-h-96 opacity-100 pb-4"
              : "max-h-0 opacity-0 overflow-hidden"
          }`}
        >
          <div className="space-y-2 pt-4 border-t border-islamic-200 dark:border-gray-700">
            {user && (
              <>
                <Link
                  to="/"
                  onClick={closeMobileMenu}
                  className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-300 ${
                    location.pathname === "/"
                      ? "bg-islamic-100 dark:bg-islamic-800 text-islamic-700 dark:text-islamic-300"
                      : "text-gray-600 dark:text-gray-300 hover:bg-islamic-50 dark:hover:bg-gray-700"
                  }`}
                >
                  <Clock className="h-5 w-5" />
                  <span className="font-medium">Today's Prayer Times</span>
                </Link>
                <Link
                  to="/monthly"
                  onClick={closeMobileMenu}
                  className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-300 ${
                    location.pathname === "/monthly"
                      ? "bg-islamic-100 dark:bg-islamic-800 text-islamic-700 dark:text-islamic-300"
                      : "text-gray-600 dark:text-gray-300 hover:bg-islamic-50 dark:hover:bg-gray-700"
                  }`}
                >
                  <Calendar className="h-5 w-5" />
                  <span className="font-medium">Monthly View</span>
                </Link>
                <div className="px-4 py-2">
                  <UserProfile />
                </div>
              </>
            )}

            {!user && (
              <div className="space-y-2 px-4">
                <Link
                  to="/login"
                  onClick={closeMobileMenu}
                  className="block w-full text-center px-4 py-3 text-islamic-600 dark:text-islamic-400 hover:text-islamic-700 dark:hover:text-islamic-300 font-medium transition-colors duration-300 border border-islamic-200 dark:border-islamic-600 rounded-lg hover:bg-islamic-50 dark:hover:bg-islamic-800"
                >
                  Sign In
                </Link>
                <Link
                  to="/signup"
                  onClick={closeMobileMenu}
                  className="block w-full text-center px-4 py-3 bg-gradient-to-r from-islamic-500 to-islamic-600 dark:from-islamic-600 dark:to-islamic-700 text-white rounded-lg hover:from-islamic-600 hover:to-islamic-700 dark:hover:from-islamic-700 dark:hover:to-islamic-800 transition-all duration-300 font-medium shadow-lg"
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};
