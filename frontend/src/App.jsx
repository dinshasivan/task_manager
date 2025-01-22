import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Taskform from './components/Taskform'
import Header from './components/Header'
import Tasklist from './components/Tasklist'
import Taskitem from './components/Taskitem'


const App = () => {
  return (
   <div>
    <Router>
      <Header/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/add-task' element={<Taskform/>}/>
        <Route path='/view-task' element={<Tasklist/>}/>
        <Route path='/task-item' element={<Taskitem/>}/>
      </Routes>
    </Router>
   </div>
  )
}

export default App