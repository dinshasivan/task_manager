import React from 'react'

const Taskitem = () => {
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
    <div>
      <div>
        <h1>Task 1</h1>
        <div>
            <h1>Description</h1>
            <p></p>
        </div>
      </div>
    </div>
  )
}

export default Taskitem