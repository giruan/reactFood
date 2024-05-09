import React, { useState, useEffect } from 'react';
import MyReviewPage from '../component/MyReviewPage';
import { useParams } from 'react-router-dom';

function MyReviews() {
  const [myReviews, setMyReviews] = useState([]);
  const [restaurantName, setRestaurantName] = useState([]);
  const [myReviewsImg, setMyReviewsImg] = useState([]);

  const {userId} = useParams();
  console.log({userId})

  useEffect(() => {
    const getMyReviews = async () => {
      try {
        const response = await fetch(`/myReview/${userId}`, {
          method: 'GET',
        });

        if (response.ok) {
          console.log(response)
          const data = await response.json();
          setMyReviews(data); // 받은 데이터를 상태에 설정
        } else {
          console.error('Failed to fetch data');
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    getMyReviews(); // useEffect에서 데이터 가져오는 함수 호출
  }, [userId]); // userId가 변경될 때마다 실행되도록 useEffect의 의존성 배열에 추가

  return (
    <main>
      <section className="container-lg">
        <h1 className="myReviewTitle">내 리뷰 목록</h1>
        <div className="myReview-box">
          <MyReviewPage myReviews={myReviews} restaurantName={restaurantName} myReviewsImg={myReviewsImg}/>
        </div>
      </section>
    </main>
  );
}

export default MyReviews;