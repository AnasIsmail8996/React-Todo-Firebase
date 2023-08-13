



// import React from 'react';
// import {useState} from 'react'

// import { useEffect, useState } from "react";
// import { app } from "./config/firebase"

// function App(){
// const [name, setName]= useState('Anas');
// const [todos, setTodos]= useState(['', '']);
// const [value, setValue]= useState('');
//   return(

// <div>
//   <h1>Todo_App</h1>
// <ul>
// {todos.map((v, i)=> <li key={i}>{v}</li>)}
// <input type='text'value={value} onChange={(e)=> setValue(e.target.value)}/>
// <button onClick={()=>{setTodos([...todos, value])
  
//   setValue('')
// }}>Add_Todo</button>
// </ul>
//   {/* <h2>{name}</h2>
//   <button onClick={()=>setName('Ismail')}>Update</button> */}
// </div>

//   )
// }













import './App.css'

import { db } from './components/Config';

import  { useState, useEffect } from 'react';






function TodoApp(){

const [tasks, setTasks]= useState([])
const [newTasks, setNewTasks]= useState('')

useEffect(()=>{
const unsubscribe = db.collection('tasks').onSnapshot(snapshot => {
    const tasksList = snapshot.docs.map(doc =>({
        id:doc.id,
        ...doc.data(),
    }))
    setTasks(tasksList)
});

return()=> unsubscribe();
},[])

const addTasks= async()=>{
    if(newTasks.trim() !==''){
        await db.collection('tasks').add({title : newTasks})
        setNewTasks('')
    }
}

const deleteTask = async taskId =>{
    await db.collection('tasks').doc(taskId).delete();
}

const updateTask = async (taskId, newTitle)=>{
    await db.collection('tasks').doc(taskId).update({title: newTitle})
}


    return(
<div className="container mt-5">
<h1 className="mb-4  aihzTodo">AIHZ_TODO_APP</h1>
<div className="mb-3">
<input 
type="text"
className="form-control"
value={newTasks}
onChange={e => setNewTasks(e.target.value)}
/>

<button className="btn btn-warning mt-2  my-custom-button" onClick={addTasks}>Add_Todo</button>
</div>


<ul className="list-group">
{tasks.map(task =>
    <li key={task.id} className="list-group-item d-flex justify-content-between align-items-center">
{task.title}
<div>
<button className="btn btn-danger mr-2" onClick={()=> deleteTask(task.id)}>Delete</button>

<button
 className="btn btn-info"
onClick={()=>{
    const newTitle = prompt('Some NEW Add More :', task.title)
    if(newTitle !==null){
        updateTask(task.id, newTitle)
    }
}}
>Edit</button>
</div>
    </li>
    
    )}

</ul>
</div>

    )
}


export default TodoApp;
















