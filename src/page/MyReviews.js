import React, { useState, useEffect } from 'react';
import MyReviewPage from '../component/MyReviewPage';
import { useParams } from 'react-router-dom';
import '../styles/myReview.css'

function MyReviews() {
  const [myReviews, setMyReviews] = useState([]);
  const [restaurantName, setRestaurantName] = useState([]);
  const [myReviewsImg, setMyReviewsImg] = useState([]);
  const [reviewId, setReviewId] = useState([])

  const { userId } = useParams();
  console.log({ userId });

  useEffect(() => {
    const getMyReviews = async () => {
      try {
        const response = await fetch(`/myReview/${userId}`, {
          method: 'GET',
        });
        
        const data = await response.json(); // 데이터를 기다림
        const reviewIds = data.myReviews.map(review => review.reviewId);
        setReviewId(reviewIds);
        console.log('Data from server:', data);
        setMyReviews(data.myReviews);
        setRestaurantName(data.restaurantName);
        setMyReviewsImg(data.myReviewsImg);
        console.log('이거 나옴?',reviewIds)
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
  
    getMyReviews(); // useEffect에서 데이터 가져오는 함수 호출
  }, [userId]);
  
  const handleDelete = (e, reviewId) => {
    e.preventDefault();
    if (window.confirm('삭제하시겠습니까?')) {
      console.log(reviewId);
      fetch(`/deleteReview/${reviewId}`, {
        method: 'DELETE',
      })
        .then((response) => response.json())
        .then((data) => {
          if (data) {
            alert('정상적으로 삭제되었습니다.');
            window.location.href = `/myReview/${userId}`;
          } else {
            alert('리뷰 삭제에 실패했습니다.');
          }
        })
        .catch((error) => {
          console.error('Error:', error);
          alert('리뷰 삭제 실패했습니다.');
        });
    }
  };

  return (
    <main>
      <section className="container-lg">
        <h1 className="myReviewTitle">내 리뷰 목록</h1>
        <div className="myReview-box">
          <MyReviewPage myReviews={myReviews} restaurantName={restaurantName} myReviewsImg={myReviewsImg} handleDelete={handleDelete} />
        </div>
      </section>
    </main>
  );
}

export default MyReviews;