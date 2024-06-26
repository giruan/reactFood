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
import MyReviewEdit from './page/MyReviewEdit';
import Complain from './page/Complain';
import MyZzim from './page/MyZzim';
import ComplainList from './page/ComplainList';
import AdminComplainList from './page/AdminComplainList';
import ComplainDetailPost from './page/ComplainDetailPost';
import { Routes, Route } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { UserProvider } from './contexts/UserContext';
import ComplainDetail from './page/ComplainDetail';
import KakaoLogin from './component/KakaoLogin';
import ShopEdit from './page/ShopEdit';



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
    // 페이지 로드 시 sessionStorage에서 사용자 정보를 읽어와서 상태를 초기화
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


  useEffect(() => {
    if (!window.Kakao.isInitialized()) {
      window.Kakao.init('aef65a923d1e178fe495a1c9d64034e1'); // 여기에 자신의 JavaScript 키를 입력하세요.
    }
  }, []);


  return (
    <UserProvider>

      <Routes>
        {/* 메인 페이지 */}
        <Route
          path="/"
          element={
            <DefaultLayout userId={userId} name={name} onLogout={handleLogout}>
              <Main setUserId={setUserId} setName={setName} userId={userId} name={name} ></Main>
            </DefaultLayout>
          }
        ></Route>

        {/* 상세 페이지 */}
        <Route
          path="/detail/:id"
          element={
            <DefaultLayout userId={userId} name={name} onLogout={handleLogout}>
              <Detail setUserId={setUserId} setName={setName} userId={userId} name={name}></Detail>
            </DefaultLayout>
          }
        ></Route>
        
        {/* 가게 수정하기 */}
        <Route
          path="/shopInfo/:restaurantId"
          element={<ShopEdit></ShopEdit>}>
        </Route>

         {/* 리뷰 페이지 */} 
        <Route
          path="/review/:restaurantId"
          element={
            <DefaultLayout userId={userId} name={name} onLogout={handleLogout}>
              <ReviewWrite setUserId={setUserId} setName={setName} userId={userId}></ReviewWrite>
            </DefaultLayout>
          }
        ></Route>

        {/* 검색 */}
        <Route path="/search" 
        element={ 
        <DefaultLayout userId={userId} name={name} onLogout={handleLogout}>
          <Search setUserId={setUserId} setName={setName} userId = {userId} name={name}></Search>
        </DefaultLayout>
        }
        ></Route>

        <Route path="/zzimList/users/:userId" 
        element={ 
        <DefaultLayout userId={userId} name={name} onLogout={handleLogout}>
          <MyZzim setUserId={setUserId} setName={setName} userId = {userId}/>
        </DefaultLayout>
        }
        ></Route>

        {/* 마이 리뷰 페이지 */}
        <Route path="/myReview/:userId" 
        element={
        <DefaultLayout userId={userId} name={name} onLogout={handleLogout}><MyReviews setUserId={setUserId} setName={setName}/></DefaultLayout> 
        }> 
        </Route>
        {/* 내 리뷰 수정 */}
        <Route path='/reviewEdit/:reviewId'
          element={
            <MyReviewEdit userId={userId}/>}></Route>

        {/* 로그인 및 회원가입 */}
        <Route path="/login" element={<Login onLoginSuccess={handleLoginSuccess}></Login>}></Route>
        <Route path="/join" element={<Join></Join>}></Route>
        <Route path="/myPage/:userId" element={<MyPage name = {name}/>}></Route>
        

        <Route path="/add" element={<ShopAdd></ShopAdd>}></Route>
        <Route path="/findPassword" element={<FindPassword></FindPassword>}></Route>
        <Route path='/editPw/:userId' element={<EditPassword></EditPassword>}></Route>
        <Route path='/map' element={<Map></Map>}></Route>

        <Route path='/complain/users/:userId' element= {<Complain userId = {userId}></Complain>}></Route>
        <Route path='/complainList/users/:userId' element= {<ComplainList userId = {userId}></ComplainList>}></Route>
        <Route path='/complainDetail/users/:complainId' element={<ComplainDetail userId={userId}/>}></Route>
        <Route path='/complainList/admin' element= {<AdminComplainList userId = {userId}></AdminComplainList>}></Route>

        <Route path='/complainDetailPost/admin/:complainId' element= {<ComplainDetailPost adminId = {userId}></ComplainDetailPost>}></Route>
        <Route path='/auth' element= {<KakaoLogin ></KakaoLogin>}></Route>    
      
        
      </Routes>
      
      <Footer />

    </UserProvider>
  );
}

export default App;
