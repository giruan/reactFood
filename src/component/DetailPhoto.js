import React, { useEffect, useState } from "react";



function DetailPhoto({ restaurant, imgList, filteredreviewImgList }) {
  const [renderedImgCount, setRenderedImgCount] = useState(9); // 현재 렌더링된 사진 개수를 상태로 관리
  const [renderImgList, setRenderImgList] = useState([])
  // 렌더링할 이미지 배열 생성
  const [selectedImgUrl, setSelectedImgUrl] = useState(null);
  const [modalStyle, setModalStyle] = useState({});
    
  


// 컴포넌트 마운트 시 또는 renderedImgCount가 변경될 때 실행
useEffect(() => {
  setRenderImgList(filteredreviewImgList.slice(0, renderedImgCount)); // 현재 렌더링될 이미지 개수에 따라 imgList를 슬라이스하여 상태 업데이트
}, [renderedImgCount, filteredreviewImgList]); // 의존성 배열에 renderedImgCount와 imgList 추가

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

    

  // 사진 더보기 버튼 클릭 핸들러
  const handleMorePhotosClick = () => {
    setRenderedImgCount((prevCount) => prevCount + 9); // 기존 렌더링된 사진 개수에 6를 더하여 상태 업데이트
  };

  return (
    <section className="restaurantReviewPic container">
      <h2>
        <span className="text-primary">{restaurant.restaurantName}</span>
        <span>의 사진</span>
      </h2>
      <div className="photo-container">
        <div className="picGridPhoto ">
          {renderImgList.map((img, index) => (
            <div key={index} className="col imgCol">
              <img
                src={`/reviews/${img.imgUrl}`}
                alt={`imgId ${index}`}
                onClick={() => handlePhotoClick(`/reviews/${img.imgUrl}`)} // 이미지 클릭 이벤트 핸들러 추가
              />
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
    </section>
  );
}

export default DetailPhoto;
