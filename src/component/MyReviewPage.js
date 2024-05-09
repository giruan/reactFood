import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';

function MyReviewPage(props) {
  const {myReviews, restaurantName, myReviewsImg} = props;
  console.log(myReviews, restaurantName, myReviewsImg)

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
              
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
}

export default MyReviewPage;