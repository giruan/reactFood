import React from 'react';

function DetailMain({ restaurant }) {
  return (
    <div className="restaurantMain container">
      <div className="restaurantInfo">
        <div className="infoImg">
          {restaurant &&
            restaurant.imgUrls &&
            restaurant.imgUrls.map((imgUrl, index) => (
              <img key={index} src={imgUrl} alt={`Restaurant Image ${index + 1}`} />
            ))}
        </div>

        <div className="infoName row justify-content-between">
          <h1 className="col">{restaurant && restaurant.restaurantName}</h1>
          <div className="col infoShare d-flex">
            <a>리뷰작성</a>
            <button className="col-3 shareBtn">공유</button>
          </div>
        </div>

        <div className="restaurantCategory">
          <a>{restaurant && restaurant.restaurantAddress}</a>
          <a>{restaurant && restaurant.category}</a>
        </div>

        <div className="restaurantRating">
          <div className="gradeInfo row row-cols-auto">
            <div className="gradeRating col"></div>
            <span className="totalScore col">평균점 {restaurant && restaurant.avgRating}</span>
            <p className="col">{restaurant && restaurant.reviewCount}명의 평가</p>
          </div>
        </div>
      </div>

      <div className="restaurantDetail">
        <ul>
          <li className="address row justify-content-between">
            {restaurant && restaurant.restaurantAddress}
            <button type="button" className="col-3 btn btn-info text-light">
              지도보기
            </button>
          </li>
          <li className="number">{restaurant && restaurant.callNumber}</li>
          <li className="category">{restaurant && restaurant.category}</li>
          <li className="openTime">{restaurant && restaurant.openTime}</li>
          <li>폐업신고 · 정보수정 제안</li>
        </ul>
      </div>
    </div>
  );
}

export default DetailMain;
