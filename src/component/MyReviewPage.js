import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';


function MyReviewPage({ myReviews, restaurantName, myReviewsImg }) {
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
                      <a href={`/detail/${res.restaurantId}`}>{res.restaurantName}</a>
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
          </div>
        </li>
      ))}
    </ul>
  );
}

export default MyReviewPage;

