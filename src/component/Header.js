import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import '../styles/util.css';
import { Link } from 'react-router-dom';

function Header(props){
  
  // 헤더부분 props
  const {userId, name, onLogout} = props;

  const [keyword, setKeyword] = useState('');
  const [selectedRegion, setSelectedRegion] = useState('');
  const navigate = useNavigate() 
  const location = useLocation();

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

            <Link to="/" onClick={()=>{
              setSelectedRegion('')
              navigate('/')
            }}>
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
          <button type='submit' className='searchBtn'>검색</button>
   
          </div>

          <div className="col-3 d-flex justify-content-end loginBar">
            <ul className="user d-flex justify-content-end">
              {userId ? (
                <>
                  {name === '관리자' ? (
                    <>
                      <li>관리자</li>
                      <Link to="/add">관리자페이지</Link>
                      <Link to={`/myPage/${userId}`}>마이페이지</Link>
                      <Link to={'/'} onClick={onLogout}>로그아웃</Link>
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
