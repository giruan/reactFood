import React from "react";

function calculateAvgRating(reviews) {
  console.log(reviews);
  if (!reviews || reviews.length === 0) return 0;

  let totalRating = 0;
  for (let i = 0; i < reviews.length; i++) {
    totalRating += reviews[i].rating;
  }
  return (totalRating / reviews.length).toFixed(1);
}

function Detailreview({ reviews, userAvgRatings }) {
  const avgRating = calculateAvgRating(reviews);
  const reviewCount = reviews ? reviews.length : 0;

  return (
    <div className="restaurantReview container">
      <div className="reviewCount">
        <p> {reviewCount}건의 방문자 평가</p>
        <div className="gradeInfo">
          <div className="gradeRating">
            <span className="totalScore">{avgRating}점</span>
          </div>
        </div>
      </div>

      <div className="container userReview">
        <p className="personGrade">
          <span className="username">
            <strong>{reviews.userId}</strong>
          </span>
          <span className="scoreInfo">
            {userAvgRatings.userId && `${userAvgRatings.userId}점`} : 평가
            <span className="scoreCnt">{userAvgRatings.reviewCount}개</span>
          </span>
        </p>

        <div className="container">
          <div className="pointDetail">
            <div className="restaurantRating">
              <span className="totalScore">{reviews.rating}점</span>
            </div>
          </div>
          <div className="reviewContent">{reviews.content}</div>
          <div className="userReviewPic">
            <div className="picGrid row row-cols-4 g-3">
              <div className="col">사진</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Detailreview;
