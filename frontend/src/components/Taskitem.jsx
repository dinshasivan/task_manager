import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Taskitem = () => {
  const [task, setTask] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedTask, setEditedTask] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const savedTask = localStorage.getItem('selectedTask');
    if (savedTask) {
      const taskData = JSON.parse(savedTask);
      setTask(taskData);
      setEditedTask(taskData);
    }
  }, []);

  const handleRemove = async () => {
    try {
      const response = await fetch(`/api/deleteTask/${task._id}`, { method: 'DELETE' });
      if (response.ok) {
        alert('Task deleted successfully.');
        navigate('/task-list'); 
      } else {
        throw new Error('Failed to delete task');
      }
    } catch (err) {
      console.error('Error deleting task:', err);
      alert('Failed to delete task.');
    }
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`/api/updateTask/${task._id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editedTask),
      });
      if (response.ok) {
        const updatedTask = await response.json();
        setTask(updatedTask);
        setIsEditing(false);
        alert('Task updated successfully.');
      } else {
        throw new Error('Failed to update task');
      }
    } catch (err) {
      console.error('Error updating task:', err);
      alert('Failed to update task.');
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedTask((prev) => ({ ...prev, [name]: value }));
  };

  if (!task) {
    return (
      <div className="text-center mt-10 text-red-500">
        No task details available.
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
      {isEditing ? (
        <form onSubmit={handleEditSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2" htmlFor="title">
              Title
            </label>
            <input
              type="text"
              name="title"
              id="title"
              value={editedTask.title}
              onChange={handleInputChange}
              className="w-full p-2 border rounded"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2" htmlFor="description">
              Description
            </label>
            <textarea
              name="description"
              id="description"
              value={editedTask.description}
              onChange={handleInputChange}
              className="w-full p-2 border rounded"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2" htmlFor="status">
              Status
            </label>
            <select
              name="status"
              id="status"
              value={editedTask.status}
              onChange={handleInputChange}
              className="w-full p-2 border rounded"
            >
              <option value="pending">Pending</option>
              <option value="completed">Completed</option>
            </select>
          </div>
          <div className="text-right">
            <button
              type="submit"
              className="bg-green-500 text-white py-2 px-6 rounded-lg hover:bg-green-600"
            >
              Save Changes
            </button>
            <button
              type="button"
              onClick={() => setIsEditing(false)}
              className="bg-gray-500 text-white py-2 px-6 rounded-lg ml-4 hover:bg-gray-600"
            >
              Cancel
            </button>
          </div>
        </form>
      ) : (
        <>
          <div className="border-b pb-4 mb-4">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">{task.title}</h1>
            <span className="text-sm text-gray-500">
              Status: <span className="font-semibold">{task.status}</span>
            </span>
          </div>
          <div>
            <h2 className="text-2xl font-semibold text-gray-700 mb-2">Description</h2>
            <p className="text-gray-600 leading-relaxed">{task.description}</p>
          </div>
          <div className="mt-6">
            <h2 className="text-2xl font-semibold text-gray-700 mb-2">
              Additional Details
            </h2>
            <ul className="list-disc list-inside text-gray-600">
              <li>
                <strong>Priority:</strong> {task.priority}
              </li>
              <li>
                <strong>Created At:</strong> {task.createdAt}
              </li>
            </ul>
          </div>
          <div className="mt-8 text-right">
            <button
              onClick={() => setIsEditing(true)}
              className="bg-blue-500 text-white py-2 px-6 rounded-lg hover:bg-blue-600"
            >
              Edit Task
            </button>
            <button
              onClick={handleRemove}
              className="bg-red-500 text-white py-2 px-6 rounded-lg ml-4 hover:bg-red-600"
            >
              Delete Task
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Taskitem;
