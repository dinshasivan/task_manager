import { Router } from "express";
import mongoose, { model } from "mongoose";

const route = Router();

const taskSchema = new mongoose.Schema({
    title:{
        type : String,
        required : true,
        trim: true
    },
    description:{
        type: String,
        required : true,
    },
    status :{
        type : String,
        enum : ['pending','in-process','completed'],
        default : 'pending'
    },
    priority:{
        type : String,
        enum :['low','medium','high'],
        default:'medium'
    },
    createdAt :{
        type : String,
        
    }
});

const Task = mongoose.model('tasks',taskSchema);
mongoose.connect('mongodb://localhost:27017/TaskDB');

// create task

route.post('/createTask', async (req, res) => {
    try {

        

        const { title, description, status, priority, createdAt } = req.body;

        const existTask = await Task.findOne({title});
        if(existTask){
            res.status(400).json({message:"Task Already exist"})
        }else{

        const newTask = new Task({
            title,
            description,
            status,
            priority,
            createdAt: createdAt || new Date().toISOString(), // Default to current date if not provided
        });
        await newTask.save();
        res.status(201).json({ message: "Task created successfully", task: newTask });
        }
       
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Failed to create task", error: error.message });
    }
});



route.get('/getTask', async (req, res)=>{
    const viewAll = await Task.find();
    try{
        if(Task.length>0){
            res.status(200).json({message:"All Task",viewAll})
        }
         else{
            res.status(404).json({message:'Not Found'});
        }
    }catch(error){
        console.error(error);
        
    }
})

route.get('/getTask/:id', async (req, res) => {
    try {
        const taskId = req.params.id;

        const task = await Task.findById(taskId);

        if (!task) {
            return res.status(404).json({ message: "Task not found" });
        }

        res.status(200).json({ message: "Task retrieved successfully", task });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Failed to retrieve task", error: error.message });
    }
});

route.get('/filterTasks/:data?', async (req, res) => {
    try {
        const { data } = req.params;
        if(data){
            const tasks = await Task.find({
                $or:[
                    {title:data},
                    {priority:data},
                    {status:data}
                ]
            });
            res.status(200).json(tasks);
        }else{
            const tasks = await Task.find({});
            res.status(200).json(tasks);
        }

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Failed to filter tasks", error: error.message });
    }
});


route.put('/updateTask/:id', async (req, res) => {
    try {
        const taskId = req.params.id;
        const { title, description, status, priority, createdAt } = req.body;

        const updatedTask = await Task.findByIdAndUpdate(
            taskId,
            {
                $set: { title, description, status, priority, createdAt }
            },
            { new: true }
        );

        if (!updatedTask) {
            return res.status(404).json({ message: "Task not found" });
        }

        res.status(200).json({ message: "Task updated successfully", task: updatedTask });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Failed to update task", error: error.message });
    }
});

route.delete('/deleteTask/:id', async (req, res) => {
    try {
        const taskId = req.params.id;

        const deletedTask = await Task.findByIdAndDelete(taskId);

        if (!deletedTask) {
            return res.status(404).json({ message: "Task not found" });
        }

        res.status(200).json({ message: "Task deleted successfully", task: deletedTask });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Failed to delete task", error: error.message });
    }
});


export {route};
