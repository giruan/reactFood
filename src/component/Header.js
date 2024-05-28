import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import '../styles/util.css';
import { Link } from 'react-router-dom';
import { HiOutlineSearch } from 'react-icons/hi';
import { useAuth } from '../contexts/AuthContext';
import { IoLogOutOutline } from "react-icons/io5";
import { BsPersonFill } from "react-icons/bs";
import { GrUserAdmin } from "react-icons/gr";
import { FaUserPlus } from "react-icons/fa";


function Header(props){
  
  const {logout} = useAuth()
  // 헤더부분 props
  const {user} = useAuth();

  const {userId, name, onLogout} = props;

  const [keyword, setKeyword] = useState('');
  const [selectedRegion, setSelectedRegion] = useState('');
  const navigate = useNavigate() 
  const location = useLocation();

  const handleKakaoLogout = () => {
    if (user) {
      const APP_KEY = '3ce68a4b4fe0845cf10e27373e9d893f'; // 카카오 애플리케이션의 앱 키
      const LOGOUT_REDIRECT_URI = 'http://localhost:3000'; // 설정한 Logout Redirect URI
  
      // 카카오 로그아웃 API 호출
      window.location.href = `https://kauth.kakao.com/oauth/logout?client_id=${APP_KEY}&logout_redirect_uri=${LOGOUT_REDIRECT_URI}`;
      logout()
    }
  };
  

  const handleSearch = (e) => {
    e.preventDefault();
    if (keyword.trim() === '') {
      alert('검색어를 입력해주세요');
      return;
    }
    
    let targetUrl = `/search?`;
    if (selectedRegion) {
      targetUrl += `region=${selectedRegion}&`;
    }
    targetUrl += `keyword=${keyword}`;
    
    navigate(targetUrl);
  };

  
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const region = searchParams.get('region');
    
    if (region) setSelectedRegion(region);
  }, [location]);
  

return (
  <header className="header container-lg d-flex align-items-center">
    <div className="container g-0">
      <form action="/search" onSubmit={handleSearch}>
        <div className="row d-flex g-0 align-items-center">
          <div className="col-3">
            <Link
              to="/"
              onClick={() => {
                setSelectedRegion('');
                navigate('/');
              }}
            >
              <h1 className="logo">
                <img className="logo-img" src="/image/logo.PNG" alt="yumyard" />
              </h1>
            </Link>
          </div>
          <div className="col d-flex justify-content-center searchBar">
            <input
              className="search_box"
              name="keyword"
              id="keyword"
              placeholder="지역,음식 또는 식당명 입력"
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
            />

            <button type="submit" className="searchBtn">
              <HiOutlineSearch />
            </button>
          </div>  

          <div className="col-3 loginBar">
            <ul className="user d-flex justify-content-end">
              {userId || user? (
                <>
                  {name === '관리자' ? (
                    <>
                      <li><GrUserAdmin /> 관리자</li>
                      <Link to={`/myPage/${userId}`}> 관리자페이지</Link>
                      <Link to={'/'} onClick={onLogout}><IoLogOutOutline /> 로그아웃</Link>
                    </>
                  ) : user ? (
                    <>
                      <li><BsPersonFill /> {user.properties.nickname}님</li>
                      <Link to={`/myPage/${user.properties.nickname}`}>마이페이지</Link>
                      <Link to={'/'} onClick= {handleKakaoLogout} ><IoLogOutOutline /> 로그아웃</Link>
                    </>
                  ) : (
                    <>
                      <li><BsPersonFill /> {name}님</li>
                        <Link to={`/myPage/${userId}`}> 마이페이지</Link>
                        <Link to={'/'} onClick={onLogout}><IoLogOutOutline className='logout'/> 로그아웃</Link>
                    </>
                  )}
                </>
              ) : (
                <>
                  <li>
                    <Link to="/login">로그인</Link>
                  </li>
                  <li>
                    <Link to="/join"><FaUserPlus className='joinIcon' /> 회원가입</Link>
                  </li>
                </>
              )}
             
            </ul>
          </div>
        </div>
      </form>
     
    </div>
  </header>
);
}

export default Header;
