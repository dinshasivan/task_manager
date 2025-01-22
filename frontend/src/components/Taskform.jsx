import React, { useState } from 'react';

const Taskform = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState('');
  const [status, setStatus] = useState('pending');
  const [date, setDate] = useState('');

  const handlSubmit = async (e) => {
    e.preventDefault();
    const newTask = {
      title,
      description,
      status,
      priority,
      date,
    };
    try {
      const res = await fetch('/api/createTask', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newTask),
      });
      if (res.ok) {
        alert('Task added successfully');
        console.log('Task added');
      } else {
        alert('Task Already added')
        console.error('Failed to add task');
      }
    } catch (error) {
      console.error('Error adding Task');
    }
  };

  return (
    <div className="max-w-md mx-auto mt-20 p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-center text-3xl font-bold text-gray-800 mb-6">Add Task</h1>
      <form onSubmit={handlSubmit}>
        <div className="mb-4">
          <label htmlFor="taskname" className="block text-gray-700 font-medium mb-2">
            Task Title:
          </label>
          <input
            type="text"
            id="taskname"
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full h-12 px-4 border rounded-md focus:ring focus:ring-blue-300"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="desc" className="block text-gray-700 font-medium mb-2">
            Task Description:
          </label>
          <textarea
            id="desc"
            required
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full h-24 px-4 border rounded-md focus:ring focus:ring-blue-300"
          ></textarea>
        </div>
        <div className="mb-4">
          <label htmlFor="taskstatus" className="block text-gray-700 font-medium mb-2">
            Task Status:
          </label>
          <input
            type="text"
            id="taskstatus"
            required
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="w-full h-12 px-4 border rounded-md focus:ring focus:ring-blue-300"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="taskpriority" className="block text-gray-700 font-medium mb-2">
            Task Priority:
          </label>
          <input
            type="text"
            id="taskpriority"
            required
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
            className="w-full h-12 px-4 border rounded-md focus:ring focus:ring-blue-300"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="taskdate" className="block text-gray-700 font-medium mb-2">
            Task Date:
          </label>
          <input
            type="date"
            id="taskdate"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="w-full h-12 px-4 border rounded-md focus:ring focus:ring-blue-300"
          />
        </div>
        <button
          type="submit"
          className="w-full py-3 text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-300"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default Taskform;
