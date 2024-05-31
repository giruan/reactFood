import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Category from '../component/Category';
import '../styles/main.css';
import Visual from '../component/Visual';

function Main(props) {
  const {userId, name} = props;
  const [categories, setCategories] = useState([]);
  
  useEffect(() => {
    // 서버로부터 데이터를 받아오는 함수 정의
    const fetchData = async () => {
      try {

        const response = await axios.get(`http://localhost:9090`); // 서버의 루트 경로로 GET 요청
        const { data } = response;
        const { userId, categories, name } = data;
        setCategories(categories); // 카테고리 목록 설정
      } catch (error) {
        console.error('서버로부터 데이터를 받아오는데 실패했습니다.', error);
      }
    };

    fetchData(); // fetchData 함수 호출하여 데이터 받아오기
  }, []);

  
 




  return (
    <main className='mainPage'>
      <nav>
        <div className="container g-0 nav-box">
          <ul className="mainNav-ul d-flex">
            <li className="nav-li">
              <Link to="#">YUM YARD 소개</Link>
            </li>
            <li className="nav-li">
              <Link to="#">YUM YARD 이용안내</Link>
            </li>
            <li className="nav-li">
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
      <>
      
  
      </>


      {/* 모달창, 비쥬얼 */}

      <Visual userId = {userId} name = {name}></Visual>



      <div className="info d-flex justify-content-center">
        <p>로그인하여 전국에 있는 맛집들을 확인하세요!</p>
      </div>

      {/* 카테고리 */}

      <Category categories={categories}></Category>
    </main>
  );
}

export default Main;
