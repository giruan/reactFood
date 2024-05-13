import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';

function MyReviewPage(props) {
  const { myReviews, restaurantName, myReviewsImg, handleDelete } = props;

  console.log(myReviews, restaurantName, myReviewsImg)

  const formatDate = (date) => {
    const d = new Date(date);
    return `${d.getFullYear()}.${String(d.getMonth() + 1).padStart(2, '0')}.${String(d.getDate()).padStart(2, '0')}`;
  };

  return (
    <ul>
      {myReviews.map((review, i) => (
        <li key={i}>
          <div className="lookMyReviews">
            <div className="resName">
              {restaurantName.map((res, j) => {
                if (res.restaurantId === review.restaurantId) {
                  return (
                    <h2 className="resTitle" key={j}>
                      <Link to={`/detail/${res.restaurantId}`}>{res.restaurantName}</Link>
                    </h2>
                  );
                }
              })}
            </div>
            <div className="myReviewImg">
              {myReviewsImg.map((img, j) => {
                if (img.reviewId === review.reviewId) {
                  return (
                    <img
                      key={j}
                      src={`/reviews/${img.imgUrl}`}
                      alt="Review Image"
                      className="myReviews-img"
                    />
                  );
                }
              })}
            </div>
            <div className="content">
              <p>{review.content}</p>
            </div>
            <div className="gradeRating col">
              {[...Array(review.rating)].map((_, j) => (
                <i key={j} className="bi bi-star-fill"></i>
              ))}
              {[...Array(5 - review.rating)].map((_, j) => (
                <i key={j + review.rating} className="bi bi-star"></i>
              ))}
            </div>
            <div className="createdAt">
            <p>작성일 : {formatDate(review.createdAt)}</p>
            </div>
            <div className='reviewEdit-Box'>
              <Link to={`/reviewEdit/${review.reviewId}`} id="editReview" reviewId={review.reviewId} restaurantName={restaurantName}>수정</Link>
              <Link to="#" id="delReview" onClick={(e) => handleDelete(e, review.reviewId)}>삭제</Link>
              
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
}

export default MyReviewPage;