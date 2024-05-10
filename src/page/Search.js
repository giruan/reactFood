import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom'; // useLocation 가져오기
import SearchPage from '../component/SearchPage';
import Dropdown from 'react-bootstrap/Dropdown';
import Map from './Map';
<<<<<<< HEAD
=======
// import container from 'react-bootstrap/Container';
// import row from 'react-bootstrap/Row';
// import col from 'react-bootstrap/Col';
>>>>>>> ff9364ad55ac8ead1263c23009614d14f718851d
import '../styles/Search.css'



function Search() {
  // useLocation 훅을 사용하여 현재 URL 정보 가져오기
  const location = useLocation();
  // URL의 쿼리스트링 파라미터에서 keyword 값을 가져오기
  const searchParams = new URLSearchParams(location.search);
  const keyword = searchParams.get('keyword');
  const region = searchParams.get('region');

  // 가게 상태
  const [shops, setShops] = useState([]);

  const fetchSearchResults = async () => {
    
    try {
      // API 호출 등의 로직으로 검색 결과를 가져옴
      let url = `/search?keyword=${encodeURIComponent(keyword)}`;
      if (region && keyword) {
        url = `/search?region=${encodeURIComponent(region)}&keyword=${encodeURIComponent(keyword)}`;
      }
<<<<<<< HEAD
      
      const response = await fetch(url, { method: 'GET' });
      
      const data = await response.json();
      //const fetchedShops = data.shops;
      setShops(data.shops);
      } catch (error) {
=======
    } catch (error) {
>>>>>>> ff9364ad55ac8ead1263c23009614d14f718851d
      console.error('Error fetching search results:', error);
      }
  };

  const [selectedItem, setSelectedItem] = useState('광역시도'); // 기본 값은 '광역시도'
  const handleItemClick = (item) => {
    setSelectedItem(item);
  };

  // 평점순으로 정렬하는 함수
  const sortByGrade = (shops) => {
    return shops.sort((a, b) => b.grade - a.grade);
  };


  //검색 키워드가 변경될 때마다 검색 결과를 가져오도록 useEffect 사용
  useEffect(() => {
    if (keyword) {
      fetchSearchResults();
    }
  }, [keyword]); // keyword가 변경될 때마다 useEffect가 실행됨

  return (
    <>
      <main className="searchBody">
        {/* 왼쪽 컨테이너 */}
        <div className="container-xl">
          <section className="row justify-content-center searchSection">
            <div className="select col-3">
              {/* 소셜 */}
              <div className="sel-social">
                {/* 내용 */}
                <div className="title d-flex">
                  <div className="square" style={{ backgroundColor: 'rgb(234, 99, 99)' }}></div>
                  <h4>소셜</h4>
                </div>

                <ul className="filterOption">
                  <li className="filterBtn">
                    <div className="filterBtn-click d-flex">
                      <img src="/image/plus.png" alt="+" />
                      <p>내가좋아요한</p>
                    </div>
                  </li>

                  <li className="filterBtn">
                    <div className="filterBtn-click d-flex">
                      <img src="/image/plus.png" alt="+" />
                      <p>나의팔로우추천</p>
                    </div>
                  </li>

                  <li className="filterBtn">
                    <div className="filterBtn-click d-flex">
                      <img src="/image/plus.png" alt="+" />
                      <p>다코미식가추천</p>
                    </div>
                  </li>
                </ul>
                <div className="bk">
                  <hr />
                </div>
              </div>

              {/* 이용자층 */}
              <div className="sel-user-age">
                {/* 내용 */}
                <div className="title d-flex">
                  <div className="square" style={{ backgroundColor: 'rgb(255, 125, 60)' }}></div>
                  <h4>이용자층</h4>
                </div>

                <ul className="gender row">
                  {/* 내용 */}
                  <div className="form-check col">
                    <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1" />
                    <label className="form-check-label" for="flexRadioDefault1">
                      {' '}
                      남자{' '}
                    </label>
                  </div>
                  <div className="form-check col">
                    <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1" />
                    <label className="form-check-label" for="flexRadioDefault1">
                      {' '}
                      여자{' '}
                    </label>
                  </div>
                </ul>
                <div className="bk">
                  <hr />
                </div>
              </div>

              {/* 연령대 */}
              <ul className="peopleGroup row">
                {/* 내용 */}
                <div className="form-check col-6">
                  <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault1" />
                  <label className="form-check-label" for="flexCheckDefault">
                    {' '}
                    20대{' '}
                  </label>
                </div>
                <div className="form-check col-6">
                  <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault1" />
                  <label className="form-check-label" for="flexCheckDefault">
                    {' '}
                    30대{' '}
                  </label>
                </div>
                <div className="form-check col-6">
                  <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault1" />
                  <label className="form-check-label" for="flexCheckDefault">
                    {' '}
                    40대{' '}
                  </label>
                </div>
                <div className="form-check col-6">
                  <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault1" />
                  <label className="form-check-label" for="flexCheckDefault">
                    {' '}
                    50대{' '}
                  </label>
                </div>
                <div className="form-check col-6">
                  <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault1" />
                  <label className="form-check-label" for="flexCheckDefault">
                    {' '}
                    60대 이상{' '}
                  </label>
                </div>
              </ul>
              <div className="bk">
                <hr />
              </div>

              {/* 카테고리 */}
              <div className="sel-category">
                {/* 내용 */}
                <div className="title d-flex">
                  <div className="square" style={{ backgroundColor: 'rgb(251, 201, 68)' }}></div>
                  <h4>카테고리</h4>
                </div>

                <ul className="categoryGroup row">
                  {/* 내용 */}
                  <li className="filterBtn col-6">
                    <div className="form-check">
                      <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault2" />
                      <label className="form-check-label" for="flexCheckDefault">
                        {' '}
                        한식{' '}
                      </label>
                    </div>
                  </li>
                  <li className="filterBtn col-6">
                    <div className="form-check">
                      <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault2" />
                      <label className="form-check-label" for="flexCheckDefault">
                        {' '}
                        일식{' '}
                      </label>
                    </div>
                  </li>
                  <li className="filterBtn col-6">
                    <div className="form-check">
                      <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault2" />
                      <label className="form-check-label" for="flexCheckDefault">
                        {' '}
                        중식{' '}
                      </label>
                    </div>
                  </li>
                  <li className="filterBtn col-6">
                    <div className="form-check">
                      <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault2" />
                      <label className="form-check-label" for="flexCheckDefault">
                        {' '}
                        아시안{' '}
                      </label>
                    </div>
                  </li>
                  <li className="filterBtn col-6">
                    <div className="form-check">
                      <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault2" />
                      <label className="form-check-label" for="flexCheckDefault">
                        {' '}
                        디저트{' '}
                      </label>
                    </div>
                  </li>
                </ul>
                <div className="dk">
                  <hr />
                </div>
              </div>

              {/* 지역 */}
              <div className="sel-location">
                {/* 내용 */}
                <div className="title d-flex">
                  <div className="square" style={{ backgroundColor: 'rgb(67, 163, 147)' }}></div>
                  <h4>지역</h4>
                </div>

                <Dropdown className="dropdown">
                  <Dropdown.Toggle className="btn dropdown-toggle question" type="button" data-bs-toggle="dropdown">
                    <span>{selectedItem}</span>
                  </Dropdown.Toggle>
                  <Dropdown.Menu className="dropdown-menu city_list" data-popper-placement="bottom-start">
                    <Dropdown.Item className="cityDetail" onClick={() => handleItemClick('서울')}>
                      서울
                    </Dropdown.Item>
                    <Dropdown.Item className="cityDetail" onClick={() => handleItemClick('경기')}>
                      경기
                    </Dropdown.Item>
                    <Dropdown.Item className="cityDetail" onClick={() => handleItemClick('인천')}>
                      인천
                    </Dropdown.Item>
                    <Dropdown.Item className="cityDetail" onClick={() => handleItemClick('강원')}>
                      강원
                    </Dropdown.Item>
                    <Dropdown.Item className="cityDetail" onClick={() => handleItemClick('세종')}>
                      세종
                    </Dropdown.Item>
                    <Dropdown.Item className="cityDetail" onClick={() => handleItemClick('부산')}>
                      부산
                    </Dropdown.Item>
                    <Dropdown.Item className="cityDetail" onClick={() => handleItemClick('경남')}>
                      경남
                    </Dropdown.Item>
                    <Dropdown.Item className="cityDetail" onClick={() => handleItemClick('경북')}>
                      경북
                    </Dropdown.Item>
                    <Dropdown.Item className="cityDetail" onClick={() => handleItemClick('광주')}>
                      광주
                    </Dropdown.Item>
                    <Dropdown.Item className="cityDetail" onClick={() => handleItemClick('전주')}>
                      전주
                    </Dropdown.Item>
                    <Dropdown.Item className="cityDetail" onClick={() => handleItemClick('목포')}>
                      목포
                    </Dropdown.Item>
                    <Dropdown.Item className="cityDetail" onClick={() => handleItemClick('전라')}>
                      전라
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </div>
            </div>

            <div className="col-9">
              <div className="food-shop">
                <div className="order-wrap row">
                  <div className="l-btn d-flex">
                    <div className="range">
                      <span>
                        <img src="/image/tab.png" alt="정렬" />
                        정렬
                      </span>
                    </div>
                    <div className="order">
                      <button className="grade">
                        <span>평점순</span>
                      </button>
                      <button className="review">
                        <span>리뷰많은순</span>
                      </button>
                      <button className="like">
                        <span>좋아요많은순</span>
                      </button>
                      <button className="load">
                        <span>조회순</span>
                      </button>
                    </div>
                  </div>
                </div>
                <Map></Map>
                <div>
                  {/* 검색 페이지 컴포넌트 */}
                  <SearchPage shops={shops} />
                </div>
              </div>

              <div className="request">
                <div className="inner">
                  <h1>찾으시는 식당이 없으신가요?</h1>
                  <div className="request-btn">
                    <button>
                      <a href="/add">맛집 등록 요청하기</a>
                    </button>
                  </div>
                  <span>보통 당일 등록이 이루어지며, 등록 시 즉시 푸시 알림을 드립니다.</span>
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>
    </>
  );
}

export default Search;
