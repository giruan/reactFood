import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';

function calculateAvgRating(reviews) {
  if (!reviews || reviews.length === 0) return 0;

  let totalRating = 0;
  for (let i = 0; i < reviews.length; i++) {
    totalRating += reviews[i].rating;
  }
  return (totalRating / reviews.length).toFixed(1);
}

function DetailMain({ restaurant, reviews, filteredImgList }) {
  
   const avgRating = calculateAvgRating(reviews);
   const reviewCount = reviews ? reviews.length : 0;
  
  return (
    <div className="restaurantMain container">
      <div className="restaurantInfo">
        <div className="infoImg">
          {filteredImgList &&
            filteredImgList.map((img, index) => {
              return <img key={index} src={`/test/${img.imgUrl}`} alt={`Restaurant Image ${index + 1}`} />;
            })}
        </div>

        <div className="infoName row justify-content-between">
          <h1 className="col">{restaurant.restaurantName}</h1>
          <div className="col infoShare d-flex">
          <Link to={`/review/${restaurant.restaurantId}`}>리뷰작성</Link>
            <button className="col-3 shareBtn">공유</button>
          </div>
        </div>

        <div className="restaurantCategory">
          <a>{restaurant.restaurantAddress}</a>
          <a> {restaurant.category}</a>
        </div>

        <div className="restaurantRating">
          <div className="gradeInfo row row-cols-auto">
            <div className="gradeRating col">
              {[...Array(5)].map((_, index) => (
                <i key={index} className={`bi bi-star${index + 1 <= avgRating ? '-fill' : ''}`}></i>
              ))}
            </div>
            <span className="totalScore col">{avgRating}점</span>
            <p className="col">{reviewCount}명의 평가</p>
          </div>
        </div>
      </div>

      <div className="restaurantDetail">
        <ul>
          <li className="address row justify-content-between">
            {restaurant.restaurantAddress}
            <button type="button" className="col-3 btn btn-info text-light">
              지도보기
            </button>
          </li>
          <li className="number">{restaurant.callNumber}</li>
          <li className="dtCategory">{restaurant.category}</li>
          <li className="openTime">{restaurant.openTime}</li>
          <li>폐업신고 · 정보수정 제안</li>
        </ul>
      </div>
    </div>
  );
}

export default DetailMain;
