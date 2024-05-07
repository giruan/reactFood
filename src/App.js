import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { useEffect } from 'react';
import Main from './page/Main';
import {Route, Routes} from 'react-router-dom'

function App() {

  return (
    <>
      <Routes>
        <Route path='/' element={<Main/>}></Route>
      </Routes>
    </>
  );
}

export default App;
