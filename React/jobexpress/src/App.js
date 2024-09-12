// Getting data from momgoDB
// Creating data using user inputs and storing in mongodB
import './App.css';
import {useRef, useState} from 'react';

function App() {
  const [jobList,setJobList] = useState([]);
  // for displaying the updated job
  const [updateid,setUpdateId] = useState();
  const nameReff = useRef();
  const cnameRef = useRef();
  const getData=async()=>{
    let res = await fetch("http://localhost:8080/getjob",{method:"GET"});
    let json = await res.json();
    console.log(json);
    setJobList(json);
  }
// Delete job using object id
  const deletejob=async(id)=>{
    let res = await fetch("http://localhost:8080/deletejobbyname?id="+id,{method:"DELETE"});
    if(res.ok){
      alert("deleted")
      getData();
    }else{
      alert("Error while deleting")
    }
  }
// update job  using object id
  const updatejob=async(id)=>{
    let data = {
      "name":nameReff.current.value,
      "email":cnameRef.current.value,
      "id" : updateid
    }
    let res = await fetch("http://localhost:8080/updatejob",{method:"POST",body:JSON.stringify(data),
      headers:{"content-type":"application/json"}
    });
    let json = await res.json();
    console.log(json);
  getData()
  }

  // Loading data in input fields from database to browser
  const loadDataForUpdate=async(id)=>{
    let matchjob = jobList.filter((j)=>id == j._id)
    console.log(matchjob)
    // This code will load data in input box
    nameReff.current.value = matchjob[0].name
    cnameRef.current.value = matchjob[0].email
    setUpdateId(id);
  }

// creating the  new job
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
  //html
  return (
    <div>
      <button onClick = {getData}>Click here to get data...</button>
      <div>
        {
          jobList.map((obj,index)=>{
            return(
              <div>
                  <h1 key={index}>{obj.name}</h1>
                  {/* using arrow function coz for passing the _id as argument, in normal function we can't pass the arguments */}
                  <div><button onClick={()=>deletejob(obj._id)}>Delete this user</button></div> 
                  <div><button onClick={()=>loadDataForUpdate(obj._id)}>Update this user</button></div> 
              </div>
              
            )
          })
        }
        <h1>Create Job Form</h1>
        <div><input type = "name" ref = {nameReff} placeholder='Enter name'/></div>
        <div><input type = "name" ref = {cnameRef}placeholder='Enter company name'/></div>
        <button onClick = {createjob}>Create Job</button>
        <button onClick={updatejob}>Update the above data</button>
        
      </div>
      
    </div>
  );
}

export default App;