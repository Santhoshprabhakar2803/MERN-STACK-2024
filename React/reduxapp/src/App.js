import './App.css';
import { RouterProvider } from 'react-router-dom';
import { createBrowserRouter } from 'react-router-dom';
import Home from './Home';
import About from './About';
import Contact from './Contact';
import { myStore } from './redux/Config';
import {Provider} from 'react-redux';

//import Header from './Header';import Header from "./Header";

let routerPaths = createBrowserRouter([
  { path: "/", element: <Home /> },
  { path: "/home", element: <Home /> },
  { path: "/about", element: <About /> },
  { path: "/contact", element: <Contact /> },
]);

function App() {

  return (
    <Provider store = {myStore}>  
      <div className="App">
    <RouterProvider router={routerPaths} />
  </div>  
   </Provider>
   
  );
}

export default App;