import 'bootstrap/dist/css/bootstrap.min.css';
import Main from './page/Main';
import Login from './page/Login';
import Header from './component/Header';
import { Routes, Route } from 'react-router-dom';
import Footer from './component/Footer';
import Join from './page/Join';
import Detail from './page/Detail';
import { useState } from 'react';
import { UserProvider } from './contexts/UserContext';
import Search from './page/Search';

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
<<<<<<< HEAD
        <Route path='/' element={<DefaultLayout userId = {userId} name = {name}><Main setUserId={setUserId} setName = {setName}></Main></DefaultLayout>}></Route>
        <Route path='/login' element={<Login onLoginSuccess = {handleLoginSuccess}></Login>}></Route>
        <Route path='/join' element={<Join></Join>}></Route>
        <Route path='/search' element={<Search></Search>}></Route>
=======
        <Route
          path="/"
          element={
            <DefaultLayout userId={userId} name={name}>
              <Main setUserId={setUserId} setName={setName}></Main>
            </DefaultLayout>
          }
        ></Route>
        <Route path="/login" element={<Login onLoginSuccess={handleLoginSuccess}></Login>}></Route>
        <Route path="/join" element={<Join></Join>}></Route>
        <Route path="/detail/:id" element={<Detail></Detail>} />
>>>>>>> 9e55a72b9065a5972b5f08840fcf66789e73baf3
      </Routes>
      <Footer />
    </UserProvider>
  );
}

export default App;
