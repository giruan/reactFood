import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom'; // useLocation 가져오기
import SearchPage from '../component/SearchPage';
import Dropdown from 'react-bootstrap/Dropdown';
import Map from './Map';

import '../styles/Search.css'




function Search(props) {

  const {userId, name} = props;
  // useLocation 훅을 사용하여 현재 URL 정보 가져오기
  const location = useLocation();
  // URL의 쿼리스트링 파라미터에서 keyword 값을 가져오기
  const searchParams = new URLSearchParams(location.search);
  const keyword = searchParams.get('keyword');
  const region = searchParams.get('region');

  // 가게 상태
  const [shops, setShops] = useState([]);
  const [sortedShops, setSortedShops] = useState([]);

  // 평점 내림차순
  const sortByGrade = () => {
    const sorted = [...shops].sort((a, b) => b.avg_rating - a.avg_rating); 
    setSortedShops(sorted);
    console.log(sorted)
  };

  // 리뷰 많은순
  const sortByReviewCount  = () =>{
    const sorted = [...shops].sort((a, b)=> b.review_count - a.review_count);
    setSortedShops(sorted)
  }

    // 조회수 많은순
    const sortByVisitCount  = () =>{
      const sorted = [...shops].sort((a, b)=> b.views - a.views);
      setSortedShops(sorted)
    }

  const handleReviewCount = async (restaurantId) => {
    try {
      // 해당 식당의 조회수를 증가시키는 API를 호출
      const response = await fetch(`/increaseViews/${restaurantId}`, { method: 'POST' });
      if (response.ok) {
        console.log('조회수가 증가되었습니다.');
      } else {
        console.error('조회수 증가 실패:', response.statusText);
      }
    } catch (error) {
      console.error('API 호출 오류:', error);
    }
  };
  


  const fetchSearchResults = async () => {
    
    try {
      // API 호출 등의 로직으로 검색 결과를 가져옴
      let url = `/search?keyword=${encodeURIComponent(keyword)}`;
      if (region && keyword) {
        url = `/search?region=${encodeURIComponent(region)}&keyword=${encodeURIComponent(keyword)}`;
      }
      
      const response = await fetch(url, { method: 'GET' });
      
      const data = await response.json();
      //const fetchedShops = data.shops;
      setShops(data.shops);
      } catch (error) {
      console.error('Error fetching search results:', error);
      }
  };

  const [selectedItem, setSelectedItem] = useState('광역시도'); // 기본 값은 '광역시도'
  const handleItemClick = (item) => {
    setSelectedItem(item);
  };


  useEffect(() => {
    if (keyword) {
      fetchSearchResults();
    }
  }, [keyword, region]);



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
                  <div className="l-btn d-flex ">
                    <div className="range ">
                      <span>
                        <img src="/image/tab.png" alt="정렬" />
                        정렬
                      </span>
                    </div>
                    {/* <div className="order btn-group">
                      <button className="grade" onClick={sortByGrade}>
                        <span>평점순</span>
                      </button>
                      <button className="review" onClick={sortByReviewCount}>
                        <span>리뷰많은순</span>
                      </button>
                      <button className="like">
                        <span>좋아요많은순</span>
                      </button>
                      <button className="load" onClick={sortByVisitCount}>
                        <span>조회순</span>
                      </button>
                    </div> */}
                    <div className="order btn-group" role="group">
                      <input
                        type="radio"
                        className="grade btn-check"
                        onClick={sortByGrade}
                        name="btnradio"
                        id="btnradio1"
                        autocomplete="off"
                      />
                      <label class="btn btn-outline-primary" for="btnradio1">
                        평점순
                      </label>
                      <input
                        type="radio"
                        className="review btn-check"
                        onClick={sortByReviewCount}
                        name="btnradio"
                        id="btnradio2"
                        autocomplete="off"
                      />
                      <label class="btn btn-outline-primary" for="btnradio2">
                        리뷰많은순
                      </label>
                      <input
                        type="radio"
                        className="like btn-check"
                        name="btnradio"
                        id="btnradio3"
                        autocomplete="off"
                      />
                      <label class="btn btn-outline-primary" for="btnradio3">
                        좋아요많은순
                      </label>
                      <input
                        type="radio"
                        className="load btn-check"
                        onClick={sortByVisitCount}
                        name="btnradio"
                        id="btnradio4"
                        autocomplete="off"
                      />
                      <label class="btn btn-outline-primary" for="btnradio4">
                        조회순
                      </label>
                    </div>
                  </div>
                </div>
                <Map></Map>
                <div>
                  {/* 검색 페이지 컴포넌트 */}
                  <SearchPage
                    shops={sortedShops.length > 0 ? sortedShops : shops}
                    handleReviewCount={handleReviewCount}
                    name={name}
                  />
                </div>
              </div>

              <div className="request">
                <div className="inner">
                  <h1>불편한 점은 없으신가요?</h1>
                  <div className="request-btn">
                    <button>
                      <Link to={`/complain/users/${userId}`}>문의하기</Link>
                    </button>
                  </div>
                  <span>문의사항이나 궁금한점이 있으시면 언제든지 연락 부탁드립니다.</span>
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
