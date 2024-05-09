import React, { useState } from "react";



function DetailPhoto({ restaurant, imgList }) {
  const [renderedImgCount, setRenderedImgCount] = useState(9); // 현재 렌더링된 사진 개수를 상태로 관리

  // 렌더링할 이미지 배열 생성
  const renderImgList = imgList.slice(0, renderedImgCount);

  // 사진 더보기 버튼 클릭 핸들러
  const handleMorePhotosClick = () => {
    setRenderedImgCount((prevCount) => prevCount + 9); // 기존 렌더링된 사진 개수에 9를 더하여 상태 업데이트
  };

  return (
    <section className="restaurantReviewPic container">
      <h2>
        <span className="text-primary">{restaurant.restaurantName}</span>
        <span>의 사진</span>
      </h2>
      <div className="photo-container">
        <div className="picGrid row row-cols-3 g-3">
          {renderImgList.map((img, index) => (
            <div key={index} className="col">
              <img src={img.imgUrl} alt={`imgId ${index}`} />
            </div>
          ))}
        </div>

        {renderedImgCount < imgList.length && (
          <div className="d-grid gap-2" role="group">
            <button type="button" className="btn btn-secondary morePic" onClick={handleMorePhotosClick}>
              사진 더보기 ▼
            </button>
          </div>
        )}
      </div>
    </section>
  );
}

export default DetailPhoto;
