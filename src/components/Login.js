
import PropTypes from 'prop-types';
import {useState} from 'react'

async function loginUser({username,password}){
    return fetch(`https://fakestoreapi.com/auth/login`,{
         method:'POST',headers: {
             'Content-Type': 'application/json'
           },
         body:JSON.stringify({
            username,password
         })
     }).then(data=>data.json())
        
    }
   
const Login=({setToken})=>{
    const [username, setUserName] = useState();
    const [password, setPassword] = useState();
   
    
   const handleSubmit=async(e)=>{
    e.preventDefault()
    const token=await loginUser({
        username,
        password

    })
    setToken(token)
    localStorage.setItem('user',username)
   }
    return(
        <div class="ui container">
           
           <form onSubmit={handleSubmit} class="ui form">
                <div class="six wide required field">
                <label>Username</label>
                <input type="text"  onChange={(e)=>{setUserName(e.target.value)}} />
              
                </div>
                <div class="six wide required field">
                <label>Password</label>
                <input type="password"   onChange={(e)=>{setPassword(e.target.value)}} />
                
                </div>
                <div>
                <button  class="ui button" type="submit">Submit</button>
                </div>
            </form>
        
        </div>
    )
}


Login.propTypes = {
    setToken: PropTypes.func.isRequired
  }
export default Login