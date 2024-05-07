import React, { useState, useEffect } from 'react';
import {Link} from 'react-router-dom'
import axios from 'axios';
import '../styles/main.css'



function Main() {
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
        const { categories } = data;
        setCategories(categories); // 카테고리 목록 설정
      } catch (error) {
        console.error('서버로부터 데이터를 받아오는데 실패했습니다.', error);
      }
    };

    fetchData(); // fetchData 함수 호출하여 데이터 받아오기
  }, []); 

 
  




  return (
    <main>
      <nav>
        <div className="container g-0 nav-box">
          <ul className="nav-ul d-flex">
            <li className="nav-li">
              <Link to="#">YUM YARD 소개</Link>
            </li>
            <li className="nav-li">
              <Link to="#">YUM YARD 이용안내</Link>
            </li>
            <li className="nav-li">0
              <Link to="#">공지사항</Link>
            </li>
            <li className="nav-li">
              <Link to="#">자주묻는질문</Link>
            </li>
            <li className="nav-li">
              <Link to="#">매거진</Link>
            </li>
          </ul>
        </div>
      </nav>
      
      <section className="visual">
        <div className="select">
          {userId ? <p>{name} 님을 위한</p> : <p>회원님을 위한</p>}
          <h1>추천 맛집</h1>
          <button id="openModal">지역 선택</button>
        </div>

        <div id="myModal" class="modal container-fluid">
          <div class="modal-content">
            <span class="close">&times;</span>
            <h2>지역 선택</h2>
            <div class="table">
              <div class="region_option row">
                <div class="col">광역시도</div>
                <div class="col">시군구</div>
              </div>
              <div class="region_list d-flex row">
                <div class="col-6">
                  <ul class="city">
                    <li>
                      <input type="radio" class="selectCity"/>
                        서울
                    </li>
                    <li>
                      <input type="radio" class="selectCity"/>
                        경기
                    </li>
                    <li>
                      <input type="radio" class="selectCity"/>
                        인천
                    </li>
                  </ul>
                </div>
                <div class="col">
                  <ul class="gu"></ul>
                </div>
              </div>
            </div>
            <div class="selectedGu">선택된 지역 :</div>
            <div class="row selectBtn gx-2">
              <div class="col">
                <button>취소</button>
              </div>
              <div class="col">
                <input type="button" id="selectRegion"/>
                  선택
              </div>
            </div>
          </div>
        </div>
      </section>

      <div class="info d-flex justify-content-center">
        <p>로그인하여 전국에 있는 맛집들을 확인하세요!</p>
      </div>

      <section className="main container-lg">
        <div className="category">
          <h2 className="title">카테고리</h2>
        </div>
        
        <div className="category_box">
          <div className="row row-cols-5 restoraunt_list g-0">
            {/* 카테고리 리스트 영역 */}
            {categories.map((category, index) => (
              <div className="col" key={index}>
                <div className="pic">
                  <Link href={`/search?keyword=${category.categoryName}`}>
                    <img src={`/image/category/category${index}.jpg`} alt={category.categoryName} />
                  </Link>
                </div>
                <p className="restoraunt_title">{category.categoryName}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

              


    </main>
  );
}

export default Main;
