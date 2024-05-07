import 'bootstrap/dist/css/bootstrap.min.css';
import Main from './page/Main';
import Login from './page/Login';
import Header from './component/Header';
import { Routes, Route } from 'react-router-dom';
import Footer from './component/Footer';
import Join from './page/Join';
import { useState } from 'react';

function DefaultLayout({ children, userId, name }) {

  return (
    <>
      <Header userId={userId} name = {name}/>
      <main>{children}</main>
    </>
  );
}

function App() {
  const [userId, setUserId] = useState(null);
  const [name, setName] = useState('');

  return (
    <>
      <Routes>
        <Route path='/' element={<DefaultLayout userId = {userId} name = {name}><Main setUserId={setUserId} setName = {setName}></Main></DefaultLayout>}></Route>
        <Route path='/login' element={<Login></Login>}></Route>
        <Route path='/join' element={<Join></Join>}></Route>
      </Routes>
      <Footer />
    </>
  );
}

export default App;
