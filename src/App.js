import 'bootstrap/dist/css/bootstrap.min.css';
import Main from './page/Main';
import Login from './page/Login';
import Header from './component/Header';
import { Routes, Route } from 'react-router-dom';
import Footer from './component/Footer';
import Join from './page/Join';
import { useState } from 'react';
import { UserProvider } from './contexts/UserContext';

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


  // 로그인 성공 시 호출할 함수
  const handleLoginSuccess = (userId, name) =>{
    setUserId(userId)
    setName(name)
  }

  return (
    <UserProvider>
      <Routes>
        <Route path='/' element={<DefaultLayout userId = {userId} name = {name}><Main setUserId={setUserId} setName = {setName}></Main></DefaultLayout>}></Route>
        <Route path='/login' element={<Login onLoginSuccess = {handleLoginSuccess}></Login>}></Route>
        <Route path='/join' element={<Join></Join>}></Route>
      </Routes>
      <Footer />
    </UserProvider>
  );
}

export default App;
