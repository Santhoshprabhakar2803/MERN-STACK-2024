// Getting data from momgoDB
// Creating data using user inputs and storing in mongodB
import './App.css';
import {useRef, useState} from 'react';

function App() {
  const [jobList,setJobList] = useState([]);
  const nameReff = useRef();
  const cnameRef = useRef();
  const getData=async()=>{
    let res = await fetch("http://localhost:8080/getjob",{method:"GET"});
    let json = await res.json();
    console.log(json);
    setJobList(json);
  }
  const createjob=async()=>{
    let data = {
      "name":nameReff.current.value,
      "company_name":cnameRef.current.value
    }
    let res = await fetch("http://localhost:8080/createjob",{method:"POST",body:JSON.stringify(data),
      headers:{"content-type":"application/json"}
    });
    let json = await res.json();
    console.log(json);
  getData()
  }
  return (
    <div>
      <button onClick = {getData}>Click here to get data...</button>
      <div>
        {
          jobList.map((obj,index)=>{
            return(
              <h1 key={index}>{obj.name}</h1>
            )
          })
        }
        <h1>Create Job Form</h1>
        <div><input type = "name" ref = {nameReff} placeholder='Enter name'/></div>
        <div><input type = "name" ref = {cnameRef}placeholder='Enter company name'/></div>
        <button onClick = {createjob}>Create Job</button>
      </div>
      
    </div>
  );
}

export default App;
