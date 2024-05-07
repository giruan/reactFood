import React, { useState, useEffect } from 'react';
import {Link} from 'react-router-dom'
import axios from 'axios';

function Main() {
  const [userId, setUserId] = useState(null);
  const [name, setName] = useState('');
  const [categories, setCategories] = useState([]);
  console.log(categories)

  useEffect(() => {
    // 서버로부터 데이터를 받아오는 함수 정의
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:9090/'); // 서버의 루트 경로로 GET 요청
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

  const openModal = () => {
    // 모달 열기 로직
  };

  const closeModal = () => {
    // 모달 닫기 로직
  };

  const updateGuList = (guList) => {
    // 구 목록 업데이트 로직
  };

  return (
    <main>
      <nav>
        {/* 네비게이션 영역 */}
      </nav>
      
      <section className="visual">
        {/* 비주얼 영역 */}
      </section>

      <div className="info d-flex justify-content-center">
        {/* 정보 영역 */}
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
