import { ToastContainer, toast } from 'react-toastify';
import React, {useState, useEffect} from 'react'

const Employee = () => {

    
    const [name, setName] =useState("")
    const [role, setRole] =useState("")
    const [email, setEmail] =useState("")
    const [dept, setDept] =useState("")

   const empDetails ={name, role, email, dept}

   const notify = () => toast("Employee data submitted successfully!");

    const empHandler= async (e)=>{
        e.preventDefault()
         console.log(empDetails)
         notify()

         const response = await fetch("https://jsonplaceholder.typicode.com/posts",{
            method: "POST",
            headers:{
                "Content-Type":"application/json"
            },
            body: JSON.stringify(empDetails)
         })
          const data = await response.json();
    console.log("Response from API:", data);
    

    setName("");
      setRole("");
      setEmail("");
      setDept("");
    }

  return (
    <div className="empForm">
        <div className="section">
            <h1>Employee Form</h1>
           <form onSubmit={empHandler}>
            <label>Employee Name</label>
            <input type='text' name='name' value={name} 
            onChange={(e)=>setName(e.target.value)}
            /><br></br>
            <label>Employee Role  </label>
            <input type='text' name='role' value={role} 
            onChange={(e)=>setRole(e.target.value)}/><br></br>
            <label>Employee Email</label>
            <input type='email' name='email' value={email} 
            onChange={(e)=>setEmail(e.target.value)}/><br></br>
            <label>Employee Dept  </label>
            <input type='text' name='dept' value={dept}
            onChange={(e)=>setDept(e.target.value)}/><br></br>
            <button type='submit'>Submit</button>
            <ToastContainer/>
            </form> 
        </div>
    </div>
  )
}

export default Employee