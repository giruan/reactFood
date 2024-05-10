import React, { useState, useEffect } from 'react';
import MyReviewPage from '../component/MyReviewPage';
import { useParams } from 'react-router-dom';
import '../styles/myReview.css'

function MyReviews() {
  const [myReviews, setMyReviews] = useState([]);
  const [restaurantName, setRestaurantName] = useState([]);
  const [myReviewsImg, setMyReviewsImg] = useState([]);

  const { userId } = useParams();
  console.log({ userId });

  useEffect(() => {
    const getMyReviews = async () => {
      try {
        const response = await fetch(`/myReview/${userId}`, {
          method: 'GET',
        });
        
        const data = await response.json(); // 데이터를 기다림
        console.log('Data from server:', data);
        setMyReviews(data.myReviews);
        setRestaurantName(data.restaurantName);
        setMyReviewsImg(data.myReviewsImg);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
  
    getMyReviews(); // useEffect에서 데이터 가져오는 함수 호출
  }, [userId]);
  


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