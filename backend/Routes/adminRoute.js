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

route.post('/createTask', async (req, res)=>{
    try{

        const {title, description, status,priority,createdAt} = req.body;

        const existTask = await Task.findOne({title});

        if(existTask){
            console.log("Task already added");
            res.status(200).json({message:"Task already exist"})
            console.log("Task already exist");
            
            
        }
        else{
           const newTask = new Task({
                title,
                description,
                status,
                priority,
                createdAt
            })
            await newTask.save();
            res.status(201).json({message:"Task added successfully!"})
        }
       

    }catch(error){
        console.error(error);
        
    }
})


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

route.put('/updateTask/:id', async (req, res)=>{
    try{
        const taskId = req.params.id;
        const { title, description, priority,status, date } = req.body;

        const updatedTask = await Task.findByIdAndUpdate(
            taskId,
            { title, description, priority,status, date },
        );

        if (updatedTask) {
            res.status(200).json({
                message: "Task updated successfully",
                tasks: updatedTask
            });
        } else {
            res.status(404).json({
                message: "Task not found"
            });
        }

    }catch(error){
        console.error(error);
        
    }
})

route.delete('/deleteTask/:id', async (req, res)=>{
    try{
        const TaskId = req.params.id;

        const deletedTask = await Task.findByIdAndDelete(TaskId);

        if (deletedTask) {
            res.status(200).json({
                message: "Task deleted successfully"
            });
        } else {
            res.status(404).json({
                message: "Task not found"
            });
        }

    }
    catch(error){
        console.error(error);
        
    }
})

export {route};
