import './App.css';
import Home from './Home';
import { Provider } from 'react-redux';
import { myStore } from './redux/config';
import Contact from './Contact';
import About from './About';
import Header from './Header';
import {
  createBrowserRouter,RouterProvider,} from "react-router-dom";
import { myStore } from './redux/config';

function App() {
  let routerPaths = createBrowserRouter([
    {"path":"/","element":<Home/>},
    {"path":"/Home","element":<Home/>},
    {"path":"/About","element":<About/>},
    {"path":"/Contact","element":<Contact/>},
  ])
  return (
    <Provider store = {myStore}>
      <div className="App">
      <RouterProvider router = {routerConfig}/>
      <Header/>
    </div>
    </Provider>
    
    
  );
}

export default App;
