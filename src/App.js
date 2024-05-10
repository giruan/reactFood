import 'bootstrap/dist/css/bootstrap.min.css';
import Main from './page/Main';
import Login from './page/Login';
import MyPage from './page/MyPage';
import Join from './page/Join';
import Search from './page/Search';
import Detail from './page/Detail';
import FindPassword from './page/FindPassword';
import EditPassword from './page/EditPassword';
import ShopAdd from './page/ShopAdd';
import MyReviews from './page/MyReviews';
import Map from './page/Map';
import ReviewWrite from './page/ReviewWrite';
import Header from './component/Header';
import Footer from './component/Footer';

import { Routes, Route } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { UserProvider } from './contexts/UserContext';
import MyReviewEdit from './page/MyReviewEdit';




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
    const storedUserId = sessionStorage.getItem('userId');
    const storedName = sessionStorage.getItem('name');
    if (storedUserId && storedName) {
      setUserId(storedUserId);
      setName(storedName);
    }
  }, []);

  // 로그인 성공 시 호출할 함수
  const handleLoginSuccess = (userId, name) => {
    sessionStorage.setItem('userId', userId);
    sessionStorage.setItem('name', name);

    setName(name);
    setUserId(userId);
  };

  const handleLogout = () => {
    sessionStorage.removeItem('userId');
    sessionStorage.removeItem('name');

    setUserId(null);
    setName('');
  };

  return (
    <UserProvider>
      <Routes>

        {/* 메인 페이지 */}
        <Route
          path="/"
          element={
            <DefaultLayout userId={userId} name={name} onLogout={handleLogout}>
              <Main setUserId={setUserId} setName={setName}></Main>
            </DefaultLayout>
          }
        ></Route>

        {/* 상세 페이지 */}
        <Route
          path="/detail/:id"
          element={
            <DefaultLayout userId={userId} name={name} onLogout={handleLogout}>
              <Detail setUserId={setUserId} setName={setName}></Detail>
            </DefaultLayout>
          }
        ></Route>

        <Route
          path="/review/:restaurantId"
          element={
            <DefaultLayout userId={userId} name={name} onLogout={handleLogout}>
              <ReviewWrite setUserId={setUserId} setName={setName}></ReviewWrite>
            </DefaultLayout>
          }
        ></Route>

        {/* 검색 */}
        <Route path="/search" 
        element={ 
        <DefaultLayout userId={userId} name={name} onLogout={handleLogout}>
          <Search setUserId={setUserId} setName={setName}></Search>
        </DefaultLayout>
        }
        ></Route>

        {/* 로그인 */}
        <Route path="/login" element={<Login onLoginSuccess={handleLoginSuccess}></Login>}></Route>
        <Route path="/join" element={<Join></Join>}></Route>
        <Route path="/myPage/:userId" element={<MyPage/>}></Route>
        <Route path="/myReview/:userId" element={<MyReviews/>}></Route>
        <Route path="/add" element={<ShopAdd></ShopAdd>}></Route>
        <Route path="/findPassword" element={<FindPassword></FindPassword>}></Route>
        <Route path='/editPw/:userId' element={<EditPassword></EditPassword>}></Route>
        <Route path='/map' element={<Map></Map>}></Route>
        <Route path='/reviewEdit/reviewId' element={<MyReviewEdit></MyReviewEdit>}></Route>
      </Routes>
      <Footer />
    </UserProvider>
  );
}

export default App;
