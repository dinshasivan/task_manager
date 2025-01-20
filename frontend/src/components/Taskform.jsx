import React, { useState } from 'react'

const Taskform = () => {
   const [title, setTitle] = useState('');
   const [description, setDescription]= useState('');
   const [priority, setPriority] = useState('');
   const [status, setStatus] = useState('pending');
   const [date, setDate] = useState('');

    // const handleChange = async (event)=>{
    //     event.preventDefault()

    //     const {name, value} = event.target;
    //     setFormdata((preState)=>({...preState,[name]:value}))
    //     console.log(formdata);
    // }

    const handlSubmit = async(e)=>{
        e.preventDefault();
        const newTask = {
          title,
          description,
          status,
          priority,
          date,
        }
        try{
          const res = await fetch('/api/createTask',{
            method:"POST",
            headers:{
              'Content-Type': 'application/json'
            },
            body:JSON.stringify(newTask),
          });
          if(res.ok){
            const data = await res.json();
            alert('Task added successfully');
            console.log("task added"); 
           
          }else{
            console.error('Failed to add task');
            
          }
        }catch(error){
          console.error('Error adding Task');
          
        }
      };
  return (
    <div className='w-4/5 justify-items-center pt-5 bg-slate-400 m-auto mt-20'>
        <div>
            <h1 className='text-center text-2xl font-serif'>Add Task</h1>
            <form onSubmit={handlSubmit}>
                <div className='mt-4'>
                    <label htmlFor="title">Task Title :</label>
                    <input type="text" 
                    name="taskname" 
                    id="taskname"
                    required
                    value={title}
                    onChange={(e)=> setTitle(e.target.value)} 
                    className='w-64 h-12 rounded-md ml-2 ring-2 hover:focus:'/>
                </div>
                <div className='mt-4'>
                    <label htmlFor="desc">Task Description :</label>
                    <textarea name="desc" 
                    id="desc"
                    required
                    value={description}
                    onChange={(e)=> setDescription(e.target.value)}
                    className='w-64 h-24  rounded-md ml-2 ring-2 hover:focus:'></textarea>
                </div>
                <div className='mt-4'>
                    <label htmlFor="status">Task Status :</label>
                    <input type="text" 
                    name="taskstatus" 
                    id="taskstatus"
                    required
                    value={status}
                    onChange={(e)=> setStatus(e.target.value)}
                    className='w-64 h-12 rounded-md ml-2 ring-2 hover:focus:' />
                </div>
                <div className='mt-4'>
                    <label htmlFor="title">Task Priority :</label>
                    <input type="text" 
                    name="taskpriority" 
                    id="taskpriority"
                    required
                    value={priority} 
                    onChange={(e)=> setPriority(e.target.value)}
                    className='w-64 h-12 rounded-md ml-2 ring-2 hover:focus:'/>
                </div>
                <div className='mt-4'>
                    <label htmlFor="title">Task Date :</label>
                    <input type="date" 
                    name="taskdate" 
                    id="taskdate"
                    value={date}
                    onChange={(e)=> setDate(e.target.value)}
                    className='w-64 h-12 rounded-md ml-2 ring-2 hover:focus:' />
                </div>
                <div className='mt-4'>
                    <button type='submit' className='bg-blue-400 p-2 rounded-md ml-52'>Submit</button>
                </div>
            </form>
        </div>
    </div>
  )
}

export default Taskform