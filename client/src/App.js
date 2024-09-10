import logo from './logo.svg';
import './App.css';
import {BrowserRouter,Routes,Route} from "react-router-dom";
import Create from './Component/Create';
import Studtable from './Component/Studtable';
import Edit from './Component/Edit';

function App() {
  return (
  <>
  <BrowserRouter>
  <Routes>
    <Route path='/' element={<Studtable/>} />
    <Route path='/create' element={<Create/>}/>
    <Route path='/edit/:id' element={<Edit/>}/>
  </Routes>
  </BrowserRouter>
  </>
  );
}

export default App;
