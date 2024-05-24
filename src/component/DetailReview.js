import React from "react";
import { useState } from "react";
import UserRatings from './UserRatings'

function calculateAvgRating(reviews) {
  if (!reviews || reviews.length === 0) return 0;

  let totalRating = 0;
  for (let i = 0; i < reviews.length; i++) {
    totalRating += reviews[i].rating;
  }
  return (totalRating / reviews.length).toFixed(1);
}

function Detailreview({ reviews, filteredreviewImgList }) {


  const avgRating = calculateAvgRating(reviews);
  const reviewCount = reviews ? reviews.length : 0;

  const [selectedImgUrl, setSelectedImgUrl] = useState(null);
  const [modalStyle, setModalStyle] = useState({});

  // 사진 클릭 이벤트 핸들러
  const handlePhotoClick = (imgUrl) => {
    setSelectedImgUrl(imgUrl);

    // 이미지가 로드된 후, 이미지의 크기를 측정하여 모달 창에 적용
    const img = new Image();
    img.src = imgUrl;
    img.onload = () => {
      setModalStyle({ maxHeight: `${img.height}px` });
    };
  };

  const closeModal = () => {
    setSelectedImgUrl(null);
  };

  const handleModalOutsideClick = (e) => {
    if (e.target.classList.contains('modal')) {
      closeModal();
    }
  };

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
          <UserRatings userId = {review.userId}></UserRatings>
          <div className="container reviewcontainer">
            <div className="pointDetail">
              <div className="restaurantRating">
                <span className="totalScore">{review.rating}점</span>
              </div>
            </div>
            <div className="reviewContent">{review.content}</div>
            <div className="userReviewPic">
              <div className="userReviewPic">
                <div className="picGrid">
                  {filteredreviewImgList.map((img, index) =>
                    img.userId === review.userId && img.reviewId === review.reviewId ? (
                      <div key={index} className="col">
                        <img
                          src={`/reviews/${img.imgUrl}`}
                          alt={`Review Image ${index}`}
                          onClick={() => handlePhotoClick(`/reviews/${img.imgUrl}`)}
                        />
                      </div>
                    ) : null
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
      {/* 모달 창 */}
      {selectedImgUrl && (
        <div
          className="modal"
          tabIndex="-1"
          role="dialog"
          style={{ display: 'block' }}
          onClick={handleModalOutsideClick}
        >
          <div className="modal-dialog modal-dialog-centered" role="document">
            <div className="modal-content style={modalStyle}">
              <div className="modal-body">
                <img src={selectedImgUrl} alt="Selected" />
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={closeModal}>
                  닫기
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      {/* 배경 */}
      {selectedImgUrl && <div className="modal-backdrop fade show"></div>}
    </div>
  );
}

export default Detailreview;
