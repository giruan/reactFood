import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'; // React Router를 사용한다고 가정
import '../styles/util.css'


function Header(){
  const [keyword, setKeyword] = useState('');

  const handleSearch = (e) => {
    if (keyword === '') {
      alert('검색어를 입력해주세요');
      e.preventDefault();
      return;
    }
    // 검색 로직 처리
    console.log(keyword);
  };

  const [userId, setUserId] = useState(null);
  const [name, setName] = useState('');
  const [categories, setCategories] = useState([]);
  console.log(categories)

  useEffect(() => {
    // 서버로부터 데이터를 받아오는 함수 정의
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:9090/api/categories'); // 서버의 루트 경로로 GET 요청
        const { data } = response;
        const { userId, name, categories } = data;
        setUserId(userId); // 사용자 ID 설정
        setName(name); // 사용자 이름 설정
        setCategories(categories); // 카테고리 목록 설정
      } catch (error) {
        console.error('서버로부터 데이터를 받아오는데 실패했습니다.', error);
      }
    };

    fetchData(); // fetchData 함수 호출하여 데이터 받아오기
  }, []);

return (
  <body>
    <header className="header container-lg d-flex align-items-center">
      <div className="container g-0">
        <form action="/search">
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
              <button id="searchBtn" onClick={handleSearch}><i className="bi bi-search"></i></button>
              
            </div>

            <div className="col-3 d-flex justify-content-end loginBar">
              <ul className="user d-flex justify-content-end">
                {userId ? (
                  <>
                    {name === "admin" ? (
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
                    <li><Link to="/login">로그인</Link></li>
                    <li><Link to="/join">회원가입</Link></li>
                  </>
                )}
              </ul>
            </div>
          </div>
        </form>
      </div>
    </header>
  </body>
);
}

export default Header