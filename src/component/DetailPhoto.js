import React, { useEffect, useState } from "react";



function DetailPhoto({ restaurant, imgList, filteredreviewImgList }) {
  const [renderedImgCount, setRenderedImgCount] = useState(6); // 현재 렌더링된 사진 개수를 상태로 관리
  const [renderImgList, setRenderImgList] = useState([{}])
  // 렌더링할 이미지 배열 생성
    
  console.log(renderImgList)


// 컴포넌트 마운트 시 또는 renderedImgCount가 변경될 때 실행
useEffect(() => {
  setRenderImgList(filteredreviewImgList.slice(0, renderedImgCount)); // 현재 렌더링될 이미지 개수에 따라 imgList를 슬라이스하여 상태 업데이트
}, [renderedImgCount, filteredreviewImgList]); // 의존성 배열에 renderedImgCount와 imgList 추가



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
        <div className="picGridPhoto">
          {renderImgList.map((img, index) => (
            <div key={index} className="col">
              <img src={`/reviews/${img.imgUrl}`} alt={`imgId ${index}`} />
            </div>
          ))}
        </div>

        {renderedImgCount < filteredreviewImgList.length && (
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
