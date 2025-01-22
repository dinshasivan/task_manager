import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Tasklist = () => {
  const [tasks, setTasks] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const fetchTasks = async (data = '') => {
    try {
      const response = await fetch(`/api/filterTasks/${data}`);
      const result = await response.json();

      if (response.ok) {
        setTasks(result);
        setError(null);
      } else {
        setTasks([]);
        setError(result.message || 'No tasks found.');
      }
    } catch (err) {
      console.error('Error fetching tasks:', err);
      setTasks([]);
      setError('Failed to fetch tasks.');
    }
  };

  useEffect(() => {
    fetchTasks(); 
  }, []);

  const handleSearchInput = (e) =>{
    setSearchTerm( e.target.value)
  }
  const handleSearch = (e) => {

    if (searchTerm.trim()) {
      fetchTasks(searchTerm.trim());
    } else {
      fetchTasks(); 
    }
  };

  const handleViewMore = (task) => {
    localStorage.setItem('selectedTask', JSON.stringify(task));
    navigate('/task-item'); 
  };

  return (
    <div className="container mx-auto mt-4">
      <div className="px-4 mb-4 flex flex-col sm:flex-row items-center">
        <input
          type="text"
          name="search"
          id="search"
          value={searchTerm}
          onChange={handleSearchInput}
          className="h-10 rounded-lg border px-3 w-full sm:w-auto mb-2 sm:mb-0 sm:mr-2"
          placeholder="Search by status (e.g., pending, completed)"
        />
        <div>
          <button onClick={handleSearch} className='p-2 rounded-md bg-blue-400'>Search</button>
        </div>
      </div>

      <h1 className="text-center font-serif text-2xl mb-4">Task List</h1>

      {error && (
        <div className="text-red-500 text-center mb-4">{error}</div>
      )}

      {tasks.length === 0 && !error && (
        <div className="text-gray-500 text-center mb-4">No tasks available.</div>
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
              <strong>Date:</strong> {new Date(task.createdAt).toLocaleString()}
            </p>
            <button
              onClick={() => handleViewMore(task)}
              className="bg-blue-300 text-black rounded-md p-2"
            >
              View More
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Tasklist;
