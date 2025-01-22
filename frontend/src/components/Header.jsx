import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
   
  return (
    <div className="bg-red-200 p-3">
      <div className="container mx-auto flex flex-col sm:flex-row items-center justify-center space-y-3 sm:space-y-0 sm:space-x-6">
        <Link
          to="/"
          className="btn btn-light bg-red-300 p-2 rounded-md text-center w-full sm:w-auto"
        >
          Home
        </Link>
        <Link
          to="/add-task"
          className="btn btn-light bg-red-300 p-2 rounded-md text-center w-full sm:w-auto"
        >
          Add Task
        </Link>
        <Link
          to="/view-task"
          className="btn btn-light bg-red-300 p-2 rounded-md text-center w-full sm:w-auto"
        >
          View Task
        </Link>
      </div>
    </div>
  );
};

export default Header;
