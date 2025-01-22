# task_manager
## Overview
The Task Manager is a web application designed to help users efficiently organize and manage their tasks. It supports full CRUD operations (Create, Read, Update, Delete).


The application is built with a **MERN** stack.

**. Frontend:** React.js for a responsive and user-friendly UI.


**. Backend:** Node.js and Express.js for API and business logic.

**. Database:** MongoDB for scalable and flexible data storage.

### Key Features

**. Task Creation:** Add new tasks with a title and description.


**. Task Viewing:** Display a list of all tasks, with options to view individual task details.

**. Task Updates:** Modify task information, including title, description, and status.

**. Task Deletion:** Remove tasks from the system when no longer needed.


## Getting Started

To run the project locally, follow these steps:

### Frontend Setup

1. Clone the repository:
    ```bash
    git clone git@github.com:dinshasivan/task_manager.git
    ```
2. Navigate to the project directory:
    ```bash
    cd frontend
    ```
3. Install the dependencies:
    ```bash
    npm install
    ```
4. Start the project:
    ```bash
    npm run dev
    ```
5. Here is the ```bash vite.config.js ``` file you'll be using.
   
   ```bash
    import { defineConfig } from 'vite'
    import react from '@vitejs/plugin-react'
    
    // https://vite.dev/config/
    export default defineConfig({
      plugins: [react()],
      server:{
        port:5000, 
        proxy: {
          "/api": {
            target: "http://localhost:3000",
            changeOrigin: true,
            rewrite: (path) => path.replace(/^\/api/,""),
          }
        }
      },
    })
   ```
### Mongodb Setup

1. Install and open MongoDB Compass.
2. Create a new connection to your local MongoDB server or an Atlas cluster.

### Backend Setup

1. Navigate to the project directory:
    ```bash
    cd backend
    ```
2. Install the dependencies:
    ```bash
    npm install
    ```
3. Start the project:
    ```bash
    npm start
    ```
### API Documentation
### Task Management
### 1. Create Task


**Endpoint:**/api/createTask

**Method:** POST


**Request Body:**
```bash
    {
  "title": "New Task",
  "description": "Description of the task",
  "status":"pending",
  "priority":"Low",
  "createdAt":"12/01/2025"
    }
```
### 2. Update Task

**Endpoint:** /api/updateTask

**Method:** PUT

**Request Body:**
```bash
    {
    "title":"Updated Task",
    "description":"Description of updated task",
    "status":"pending",
    "priority":"low",
    "createdAt":"20/1/2025"
    }
```
### 3. Delete Task

**Endpoint:** /api/deleteTask


**Method:** DELETE

**Request params:**
```bash
    {
    "_id":"678fc7c90fe1d3bc8846e1f2"
    }
```
### 4. Get Task using id

**Endpoint:** /api/getTask

**Method:** GET

**Request params:**
```bash
    {
    "_id":"678fc7c90fe1d3bc8846e1f2"
    }
```

