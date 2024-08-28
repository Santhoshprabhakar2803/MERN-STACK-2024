import './App.css';
import {useState} from 'react';
import Api from './api';
function App() {
  const[name,setName]=useState('')
  const[pass,setPassword]=useState('')
  const validate=()=>{
    if(name == "" || pass == ""){
      alert("ERROR : Invalid login information")
    }else{
      window.confirm("LOGIN successfully ☺")
      getapi()
    }
  }
  async function getapi(){
    let res = await fetch('https://reqres.in/api/login',{
      method : 'POST',
      headers:{'content-type':'application/json'},
      body:JSON.stringify({
        email:name,
        password:pass
      })
    })
    let a = await res.json()
      console.log(a)
  }
  
  return (
    <div className='container'>
      <h1>LOGIN FORM</h1>
      
      <input type='text' placeholder='Enter Username' onChange={(n) => setName(n.target.value)}/><br></br>
      <input type='password' placeholder='Enter Your password'onChange={(p) => setPassword(p.target.value)}/><br></br>
      <br></br>
      <Api/>
      <button onClick={()=>validate()}>LOGIN</button>
    </div>
  );
}

export default App;
