import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Tasklist = () => {
  const [tasks, setTasks] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [error, setError] = useState(null);

  const fetchTasks = async (query = '') => {
    try {
      const response = await fetch(`/api/filterTasks?title=${query}`);
      if (!response.ok) {
        throw new Error('Failed to fetch tasks');
      }
      const data = await response.json();
      if (data && data.tasks) {
        setTasks(data.tasks);
        setError(null);
      } else {
        setError('No tasks found.');
      }
    } catch (err) {
      console.error('Error fetching tasks:', err);
      setError('Failed to fetch tasks.');
    }
  };

  // Fetch all tasks
  useEffect(() => {
    fetchTasks();
  }, []);

  const handleSearch = () => {
    fetchTasks(searchTerm);
  };

  const handleViewMore = (task) => {
    localStorage.setItem('selectedTask', JSON.stringify(task));
  };

  return (
    <div className="container mx-auto mt-4">
      <div className="px-4 mb-4">
        <input
          type="text"
          name="search"
          id="search"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="h-10 rounded-lg border sm:w-auto w-full"
          placeholder="Search by status (e.g., pending, completed)"
        />
        <button
          onClick={handleSearch}
          className="btn btn-light bg-slate-500 ml-2 p-2 rounded-md text-center w-full sm:w-auto"
        >
          Filter Task
        </button>
      </div>
      <h1 className="text-center font-serif text-2xl mb-4">Task List</h1>

      {error && (
        <div className="text-red-500 text-center mb-4">{error}</div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {tasks.map((task) => (
          <div
            key={task._id}
            className="bg-slate-500 p-4 rounded-lg shadow-md text-white"
          >
            <h2 className="font-serif text-xl mb-2">{task.title}</h2>
            <p className="font-sans mb-1">
              <strong>Description:</strong> {task.description}
            </p>
            <p className="font-sans mb-1">
              <strong>Status:</strong> {task.status}
            </p>
            <p className="font-sans mb-1">
              <strong>Priority:</strong> {task.priority}
            </p>
            <p className="font-sans mb-4">
              <strong>Date:</strong> {task.createdAt}
            </p>
            <Link
              to={'/task-item'}
              onClick={() => handleViewMore(task)} // Save task to local storage
              className="bg-blue-300 text-black rounded-md p-2"
            >
              View More
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Tasklist;
