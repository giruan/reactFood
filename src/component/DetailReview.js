import React from "react";

function calculateAvgRating(reviews) {
  if (!reviews || reviews.length === 0) return 0;

  let totalRating = 0;
  for (let i = 0; i < reviews.length; i++) {
    totalRating += reviews[i].rating;
  }
  return (totalRating / reviews.length).toFixed(1);
}

function Detailreview({ reviews, userAvgRatings, filteredreviewImgList }) {
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

      {reviews.map((review, index) => (
        <div key={index} className="container userReview">
          <p className="personGrade">
            <span className="username">
              <strong>{review.userId} </strong>
            </span>
            <span className="scoreInfo">
              리뷰작성=
              <span className="scoreCnt">
                {userAvgRatings[review.userId] && userAvgRatings[review.userId].reviewCount}개, 평균 :
                {userAvgRatings[review.userId] && <span>{userAvgRatings[review.userId].avgRating}점</span>}
              </span>
            </span>
          </p>

          <div className="container">
            <div className="pointDetail">
              <div className="restaurantRating">
                <span className="totalScore">{review.rating}점</span>
              </div>
            </div>
            <div className="reviewContent">{review.content}</div>
            <div className="userReviewPic">
              <div className="userReviewPic">
                <div className="picGrid row row-cols-4 g-3">
                  {filteredreviewImgList.map((img, index) =>
                    img.userId === review.userId ? (
                      <div key={index} className="col">
                        <img src={`/reviews/${img.imgUrl}`} alt={`Review Image ${index}`} />
                      </div>
                    ) : null
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Detailreview;
