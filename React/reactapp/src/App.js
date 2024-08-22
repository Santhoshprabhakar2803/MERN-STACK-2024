import './App.css';
import Home from './home';
import {useState} from 'react';
function App() {
  // Variable declaration
  let firstname = "Santhosh";
  // let email = "ssanthosh3117@gmail.com"
  // Define state variable
  const[email,setEmail] = useState('');
  const[address,setAddress] = useState('Chennai,Vadapalani');
  const[phoneno,setNumber] =  useState('');
  // validate function
  const validate=() =>{
    if (email == ""){
      alert("ERRRO : Enter Your Email");
    }else if(phoneno == ""){
      alert("ERROR : Enter Your Phone Number");
    }else{
      window.confirm("All Fields Contains Value ☺")
    }
  }
  return (
    <div className="container">
    <h1>Hello</h1>
    {/* Accessing the varaible value */}
    {firstname}
    {/* <h4>{email}</h4> */}
    <h4>{email}</h4>
    <h5>{address}</h5>
    <h5>{phoneno}</h5>
    <input type='text' placeholder='Enter Your Email..' onChange={(e) => setEmail(e.target.value)}/><br></br>
    <br></br>
    <input type='text' placeholder='Enter Your Phone No..' onChange={(n) => setNumber(n.target.value)}/>       

    <button id='click' onClick={()=>validate()} >Click</button>
    <Home/>
    </div>
  );
}


export default App;
