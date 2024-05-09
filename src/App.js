import 'bootstrap/dist/css/bootstrap.min.css';
import Main from './page/Main';
import Login from './page/Login';
import MyPage from './page/MyPage';
import Join from './page/Join';
import Search from './page/Search';
import Detail from './page/Detail';
import ShopAdd from './page/ShopAdd';
import FindPassword from './page/FindPassword';
import EditPassword from './page/EditPassword';
import Header from './component/Header';
import Footer from './component/Footer';

import { Routes, Route } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { UserProvider } from './contexts/UserContext';



function DefaultLayout({ children, userId, name, onLogout }) {
  return (
    <>
      <Header userId={userId} name={name} onLogout={onLogout} />
      <main>{children}</main>
    </>
  );
}

function App() {
  const [userId, setUserId] = useState(null);
  const [name, setName] = useState('');

  useEffect(() => {
    // 페이지 로드 시 localStorage에서 사용자 정보를 읽어와서 상태를 초기화
    const storedUserId = localStorage.getItem('userId');
    const storedName = localStorage.getItem('name');
    if (storedUserId && storedName) {
      setUserId(storedUserId);
      setName(storedName);
    }
  }, []);

  // 로그인 성공 시 호출할 함수
  const handleLoginSuccess = (userId, name) => {
    localStorage.setItem('userId', userId);
    localStorage.setItem('name', name);

    setName(name);
    setUserId(userId);
  };

  const handleLogout = () => {
    localStorage.removeItem('userId');
    localStorage.removeItem('name');

    setUserId(null);
    setName('');
  };

  return (
    <UserProvider>
      <Routes>
        <Route
          path="/"
          element={
            <DefaultLayout userId={userId} name={name} onLogout={handleLogout}>
              <Main setUserId={setUserId} setName={setName}></Main>
            </DefaultLayout>
          }
        ></Route>
        <Route
          path="/detail/:id"
          element={
            <DefaultLayout userId={userId} name={name} onLogout={handleLogout}>
              <Detail setUserId={setUserId} setName={setName}></Detail>
            </DefaultLayout>
          }
        ></Route>

        <Route path="/login" element={<Login onLoginSuccess={handleLoginSuccess}></Login>}></Route>
        <Route path="/join" element={<Join></Join>}></Route>
        <Route path="/myPage/:userId" element={<MyPage />}></Route>
        <Route path="/search" element={<Search></Search>}></Route>
        <Route path="/add" element={<ShopAdd></ShopAdd>}></Route>
        <Route path="/findPassword" element={<FindPassword></FindPassword>}></Route>
        <Route path='/editPw/:userId' element={<EditPassword></EditPassword>}></Route>
      </Routes>
      <Footer />
    </UserProvider>
  );
}

export default App;
