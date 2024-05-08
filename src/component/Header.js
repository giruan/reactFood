import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import '../styles/util.css';
import { useUser } from '../contexts/UserContext';
import axios from 'axios';

function Header(props) {
  const { userId, name } = props;
  const [keyword, setKeyword] = useState('');
  const location = useLocation();

  // URL에서 검색어 추출
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const keywordParam = searchParams.get('keyword');
    if (keywordParam) {
      setKeyword(keywordParam);
    }
  }, [location.search]);

  const handleSearch = () => {
    if (keyword.trim() === '') {
      alert('검색어를 입력해주세요');
      return;
    }
    // 검색 로직 처리
    console.log(keyword);
  };

<<<<<<< HEAD
  return (
    <header className="header container-lg d-flex align-items-center">
      <div className="container g-0">
=======
  
return (
  <header className="header container-lg d-flex align-items-center">
    <div className="container g-0">
      <form action="/search">
>>>>>>> 9e55a72b9065a5972b5f08840fcf66789e73baf3
        <div className="row d-flex g-0 align-items-center">
          <div className="col-3">
            <Link to="/">
              <h1 className="logo">
<<<<<<< HEAD
                <img className="logo-img" src="/image/logo.PNG" alt="yumyard" />
=======
                <img className="logo-img" src="http://192.168.5.20:9090/image/logo.PNG" alt="yumyard" />
>>>>>>> 9e55a72b9065a5972b5f08840fcf66789e73baf3
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
<<<<<<< HEAD
            <Link to={`/search?keyword=${keyword}`} onClick={handleSearch} className='searchBtn'>
              <button id="searchBtn"><i className="bi bi-search"></i></button>
            </Link>
=======
            <button id="searchBtn" onClick={handleSearch}>
              <i className="bi bi-search"></i>
            </button>
>>>>>>> 9e55a72b9065a5972b5f08840fcf66789e73baf3
          </div>

          <div className="col-3 d-flex justify-content-end loginBar">
            <ul className="user d-flex justify-content-end">
              {userId ? (
                <>
<<<<<<< HEAD
                  {name === "admin" ? (
=======
                  {name === 'admin' ? (
>>>>>>> 9e55a72b9065a5972b5f08840fcf66789e73baf3
                    <>
                      <li>관리자</li>
                      <Link to="/add">관리자페이지</Link>
                      <Link to={`/myPage/${userId}`}>마이페이지</Link>
                      <Link to="/logout">로그아웃</Link>
                    </>
                  ) : (
                    <>
                      <li>{name}님</li>
                      <Link to="/logout">로그아웃</Link>
                      <Link to={`/myPage/${userId}`}>마이페이지</Link>
                    </>
                  )}
                </>
              ) : (
                <>
<<<<<<< HEAD
                  <li><Link to="/login">로그인</Link></li>
                  <li><Link to="/join">회원가입</Link></li>
=======
                  <li>
                    <Link to="/login">로그인</Link>
                  </li>
                  <li>
                    <Link to="/join">회원가입</Link>
                  </li>
>>>>>>> 9e55a72b9065a5972b5f08840fcf66789e73baf3
                </>
              )}
            </ul>
          </div>
        </div>
<<<<<<< HEAD
      </div>
    </header>
  );
=======
      </form>
    </div>
  </header>
);
>>>>>>> 9e55a72b9065a5972b5f08840fcf66789e73baf3
}

export default Header;
