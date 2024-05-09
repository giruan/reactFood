import React from 'react';
import styles from '../styles/detail.module.css'

function calculateAvgRating(reviews) {
  console.log(reviews);
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
    <div className={styles.restaurantMain}>
      <div className={styles.restaurantInfo}>
        <div className={styles.infoImg}>
          {filteredImgList &&
            filteredImgList.map((img, index) => {
              return <img key={index} src={`/test/${img.imgUrl}`} alt={`Restaurant Image ${index + 1}`} />;
            })}
        </div>

        <div className={styles.infoName}>
          <h1 className="col">{restaurant.restaurantName}</h1>
          <div className={styles.infoShare}>
            <a>리뷰작성</a>
            <button className={styles.shareBtn}>공유</button>
          </div>
        </div>

        <div className={styles.restaurantCategory}>
          <a>{restaurant.restaurantAddress}</a>
          <a> {restaurant.category}</a>
        </div>

        <div className={styles.restaurantRating}>
          <div className={styles.gradeInfo}>
            <div className={styles.gradeRating}>
              {[...Array(5)].map((_, index) => (
                <i key={index} className={`bi bi-star${index + 1 <= avgRating ? '-fill' : ''}`}></i>
              ))}
            </div>
            <span className={styles.totalScore}>{avgRating}점</span>
            <p className="col">{reviewCount}명의 평가</p>
          </div>
        </div>
      </div>

      <div className={styles.restaurantDetail}>
        <ul>
          <li className={styles.address}>
            {restaurant.restaurantAddress}
            <button type="button" className="col-3 btn btn-info text-light">
              지도보기
            </button>
          </li>
          <li className={styles.number}>{restaurant.callNumber}</li>
          <li className={styles.category}>{restaurant.category}</li>
          <li className={styles.openTime}>{restaurant.openTime}</li>
          <li>폐업신고 · 정보수정 제안</li>
        </ul>
      </div>
    </div>
  );
}

export default DetailMain;
