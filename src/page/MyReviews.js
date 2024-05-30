import React, { useState, useEffect } from 'react';
import MyReviewPage from '../component/MyReviewPage';
import { useParams } from 'react-router-dom';
import '../styles/myReview.css'
import Swal from 'sweetalert2';

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
    Swal.fire({
      title: "리뷰 삭제",
      text: "정말로 삭제 하시겠습니까? ",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "삭제",
      cancelButtonText: '취소'
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`/deleteReview/${reviewId}`, {
          method: 'DELETE',
          headers : {'Content-Type' : 'application/json'},
          body: JSON.stringify({ reviewId: reviewId })
        })
          .then((response) => response.json())
          .then((data) => {
            if (data) {
              Swal.fire({
                title: "삭제 처리",
                text: "정상적으로 삭제 되었습니다!",
                icon: "success"
              })
              setTimeout(()=>{
                window.location.href = `/myReview/${userId}`;
              }, 1000)
              
            } else {
              alert('리뷰 삭제에 실패했습니다.');
            }
          })
          .catch((error) => {
            console.error('Error:', error);
            alert('리뷰 삭제 실패했습니다.');
          });
      }
    })      
  };

  return (
    <main>
      <section className="container-lg">
        <br/><br/>
        <h1 className="myReviewTitle">마이 리뷰</h1>
        <br/>
        <div className="myReview-box">
          <MyReviewPage myReviews={myReviews} restaurantName={restaurantName} myReviewsImg={myReviewsImg} handleDelete={handleDelete} />
        </div>
      </section>
    </main>
  );
}

export default MyReviews;