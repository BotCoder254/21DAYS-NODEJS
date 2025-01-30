import React from 'react';
import { Link } from 'react-router-dom';

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-primary">
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div className="text-2xl font-bold text-dark">AuthFlow</div>
            <div className="space-x-4">
              <Link to="/login" className="inline-flex items-center px-4 py-2 rounded-lg bg-accent text-dark hover:bg-opacity-90 transition-all duration-300">
                Login
              </Link>
              <Link to="/signup" className="inline-flex items-center px-4 py-2 rounded-lg bg-dark text-white hover:bg-opacity-90 transition-all duration-300">
                Sign Up
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-5xl font-bold text-dark mb-6">
              Modern Authentication Made Simple
            </h1>
            <p className="text-lg text-gray-600 mb-8">
              A beginner-friendly authentication system with a beautiful, modern interface.
              Start securing your applications today!
            </p>
            <Link
              to="/signup"
              className="inline-flex items-center px-6 py-3 rounded-lg bg-dark text-white hover:bg-opacity-90 transition-all duration-300"
            >
              <span>Get Started</span>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </Link>
          </div>
          <div className="bg-secondary rounded-2xl p-8">
            <div className="aspect-w-16 aspect-h-9 bg-accent bg-opacity-20 rounded-xl"></div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default LandingPage;
