import logo from './logo.svg';
import './App.css';
import {useState} from 'react';

function App() {
  const [name,setName] = useState('')
  const click = async() => {
    try{
      const response = await fetch(`https://api.agify.io/?name=${name}`);
      const data = await response.json();
      console.log(data)
    } catch(error){
      console.error('Error fetching the data:',error);
    }
  };
  return (
    <div>
      <input type='text' value={name} onChange={(e)=>setName(e.target.value)}placeholder='Enter your name'/>
      <button onClick={click}>Find Meaning</button>
      
    </div>
  );
}

export default App;
