import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import '../styles/util.css';
import { Link } from 'react-router-dom';
import { useUser } from '../contexts/UserContext';

function Header(props){
  const { userId, name, onLogout } = props;
  const [keyword, setKeyword] = useState('');
  const [regionString, setRegionString] = useState('');
  const location = useLocation();

  const handleSearch = (e) => {
    e.preventDefault();
    if (keyword.trim() === '') {
      alert('검색어를 입력해주세요');
      return;
    }
    // 검색 로직 처리
    let targetUrl;
    if (regionString) {
      targetUrl = `/search?${regionString}&keyword=${keyword}`;
    } else {
      targetUrl = `/search?keyword=${keyword}`;
    }
    window.location.href = targetUrl;
  };

  useEffect(() => {
    const query = location.search;
    if(query){
      const queryParams = query.split('?')[1]; 
      const regionParam = queryParams.split('&')[0]; 
      setRegionString(regionParam);
      console.log(regionString.split('=')[0])
      if(regionParam.split('=')[0] !=='region'){
        setRegionString('')
      }
    }
    
  }, [location.search]);

  useEffect(() => {
    const links = document.querySelectorAll(".pic a");

    if (regionString !== undefined) {
      links.forEach(link => {
        const categoryString = link.href.split('?')[1];
        link.href = `/search?${regionString}&${categoryString}`;
      });
    }
  }, [regionString, location.search]);
  
  return (
    <header className="header container-lg d-flex align-items-center">
      <div className="container g-0">
        <form onSubmit={handleSearch} action="/search">
          <div className="row d-flex g-0 align-items-center">
            <div className="col-3">
              <Link to="/">
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
              <button type="submit" id="searchBtn">
                <i className="bi bi-search"></i>
                검색버튼
              </button>
            </div>
            <div className="col-3 d-flex justify-content-end loginBar">
              <ul className="user d-flex justify-content-end">
                {userId ? (
                  <>
                    {name === 'admin' ? (
                      <>
                        <li>관리자</li>
                        <Link to="/add">관리자페이지</Link>
                        <Link to={`/myPage/${userId}`}>마이페이지</Link>
                        <Link to="/">로그아웃</Link>
                      </>
                    ) : (
                      <>
                        <li>{name}님</li>
                        <Link to = {'/'} onClick={onLogout}>로그아웃</Link>
                        <Link to={`/myPage/${userId}`}>마이페이지</Link>
                      </>
                    )}
                  </>
                ) : (
                  <>
                    <li>
                      <Link to="/login">로그인</Link>
                    </li>
                    <li>
                      <Link to="/join">회원가입</Link>
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
