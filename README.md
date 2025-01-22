# task_manager
## Overview


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
