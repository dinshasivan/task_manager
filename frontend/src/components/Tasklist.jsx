import React, { useEffect, useState } from 'react'


const Tasklist = async() => {

   const [task, setTask] = useState([]);
   const [output, setOutput] = useState('');

   useEffect(()=>{
    const fetchTask = async () =>{
        try{
          const res = await fetch('/api/getTask');
          const task = await res.json();
          setTask(task);
          
        }
        catch(error){
          console.log('Error fectching Task:',error); 
        }
      };
      fetchTask();
      console.log(task);
   },[]);

   
    
  return (
    <div className='bg-slate-500 w-96 h-96 rounded-lg'>
        <div>
            <h1 id='title' className='font-serif text-center text-xl'>{task.title} </h1>
            <p id='desc' className='font-sans'> {task.description} </p>
            <p id='status' className='font-sans'>{task.status} </p>
            <p id='priority' className='font-sans'> {task.priority} </p>
            <p id='date'>{task.createdAt} </p>
        </div>
        <div>
            <button className='bg-blue-300 rounded-md p-2'> View More</button>
        </div>
    </div>
  )
}

export default Tasklist