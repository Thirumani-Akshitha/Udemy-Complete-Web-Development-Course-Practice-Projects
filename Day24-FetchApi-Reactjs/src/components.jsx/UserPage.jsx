import { useState,useEffect } from "react"

const userDetails = "https://jsonplaceholder.typicode.com/posts"

console.log(userDetails)

const UserPage = () => {

const [user,setUser] = useState([])

const userHandler = async() => {
    const response = await fetch(userDetails)
    const newData = await response.json()
    setUser(newData)
}
useEffect(()=>{
console.log(userHandler()) 
},[])


  return (
    <div>
        {user.map((item)=>{
            return(
                <div className="userSection">
                    <h2 style={{color: "red"}}>Title: {item.title}</h2>
                    <h3>Body: {item.body}</h3>
                </div>
            )
        })}
    </div>
  )
}

export default UserPage