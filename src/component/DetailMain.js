import React, { useEffect, useRef, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';

// 리액트 아이콘
import { FaHouse } from 'react-icons/fa6';
import { FaPhoneAlt } from 'react-icons/fa';
import { BiSolidFoodMenu } from 'react-icons/bi';
import { MdAccessTimeFilled } from 'react-icons/md';
import { PiSirenFill } from 'react-icons/pi';
import { FaStar } from 'react-icons/fa';
import { IoPerson } from 'react-icons/io5';
import { FaRegEdit } from 'react-icons/fa';
import { FaRegShareFromSquare } from "react-icons/fa6";


//평점 계산
function calculateAvgRating(reviews) {
  if (!reviews || reviews.length === 0) return 0;

  let totalRating = 0;
  for (let i = 0; i < reviews.length; i++) {
    totalRating += reviews[i].rating;
  }
  return (totalRating / reviews.length).toFixed(1);
}


function DetailMain({ restaurant, reviews, filteredImgList ,restaurantId,userId,name}) {
  const [modalOpen, setModalOpen] = useState(false);
  const modalBackground = useRef();
  const [zzim, setZzim] = useState(false);
  console.log('디테일메인',name)

  const [selectedImgUrl, setSelectedImgUrl] = useState(null);
  const [modalStyle, setModalStyle] = useState({});

  useEffect(() => {
    fetch(`/zzim/users/${userId}/restaurantId/${restaurantId}`)
      .then((response) => response.json())
      .then((data) => {
        setZzim(data.zzim);
        console.log(data);
      });
  }, []);

  
  const handleClick = (e) => {

    if(userId){
      const currentZzim = !zzim;
    setZzim(currentZzim);

    fetch(`/zzim/users/${userId}/restaurantId/${restaurantId}`, {
      method: currentZzim ? 'POST' : 'DELETE',
    })
      .then((response) => response.json())
      .then((data) => {
        if (!data.success) {
          setZzim(!zzim);
        }
      })
      .catch((error) => {
        console.error('찜 상태 업데이트 중 오류 발생:', error);
        setZzim(!zzim);
      });
    }else{
      alert("로그인이 필요합니다.")
    }
  };

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

  const mapCloseModal = () => {
    setModalOpen(false);
  };

  const handleModalOutsideClick = (e) => {
    if (e.target.classList.contains('modal')) {
      closeModal();
    }
  };

  const avgRating = calculateAvgRating(reviews);
  const reviewCount = reviews ? reviews.length : 0;

  // 로그인이 되었을 경우에 리뷰 작성이 가능
  const handleSuccess = (e) =>{
    if(!userId){
      e.preventDefault();
      alert('로그인 후 이용 해주시길 바랍니다.')
      return ;
    }
  }

  const searchAddressToCoordinate = (address) => {
    if (!window.naver || !window.naver.maps || !window.naver.maps.Service) {
        console.error('Naver Maps API is not loaded.');
        return;
    }

    window.naver.maps.Service.geocode({ address: address }, (status, response) => {
        if (status !== window.naver.maps.Service.Status.OK) {
            return alert('Something went wrong!');
        }
        const result = response.v2.addresses[0];
        const coord = new window.naver.maps.Point(result.x, result.y);
        console.log(coord);
        // 여기서 coord를 사용하여 지도를 업데이트할 수 있습니다.
        
        // 지도 객체 찾기 또는 생성하기
        const map = new window.naver.maps.Map('map', {
          center: coord,
          zoom: 15,
        });

        // 마커 생성 및 지도에 추가
        const marker = new window.naver.maps.Marker({
          position: coord,
          map: map,
        });

        // 인포윈도우 설정 및 열기
        const infowindow = new window.naver.maps.InfoWindow({
          content: `<div style="padding:20px;">${restaurant.restaurantName}</div>`
        });
        infowindow.open(map, marker);
        
        console.log(coord); // 좌표 로깅
            
    });
};


useEffect(()=>{
  if(modalOpen){
    searchAddressToCoordinate(restaurant.restaurantAddress)
  }
},[modalOpen])


  return (
    <div className="restaurantMain container">
      <div className="restaurantInfo">
        <div className="infoImg">
          {filteredImgList &&
            filteredImgList.map((img, index) => {
              return (
                <img
                  key={index}
                  src={`/store/${img.imgUrl}`}
                  alt={`Restaurant Image ${index + 1}`}
                  onClick={() => handlePhotoClick(`/store/${img.imgUrl}`)}
                />
              );
            })}
        </div>

        <div className="infoName row justify-content-between">
          <div className="detailTitle d-flex">
            <h1 className="col detailName">
              {restaurant.restaurantName}
              {name === '관리자' ? (
                // <button className="fixBtn">
                <Link className="fixBtn" to={`/shopInfo/${restaurant.restaurantId}`}>
                  <FaRegEdit />
                </Link>
              ) : (
                // </button>
                <></>
              )}
            </h1>

            <div className="col infoShare d-flex">
              <span className="zzimBtn" onClick={handleClick}>
                찜하기
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="64" height="64">
                  <path
                    fill={zzim ? 'red' : 'none'}
                    stroke="black"
                    strokeWidth="1"
                    d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
                  />
                </svg>
              </span>
              <button className="col-3 reviewBtn">
                <Link to={`/review/${restaurant.restaurantId}`} onClick={handleSuccess}>
                  리뷰작성
                </Link>
              </button>
              <button className="col-3 shareBtn">
              <FaRegShareFromSquare /> 공유
              </button>
            </div>
          </div>
        </div>

        <div className="restaurantCategory">
          <p>{restaurant.restaurantAddress}</p>
          <p> {restaurant.category}</p>
        </div>

        <div className="restaurantRating">
          <div className="gradeInfo row row-cols-auto">
            <span className="totalScore col">
              <FaStar className="star" />
              {avgRating}점
            </span>
            <p className="col">
              <IoPerson className="star" />
              {reviewCount}명의 평가
            </p>
          </div>
        </div>
      </div>
      <div className="restaurantDetail">
        <ul>
          <li className="address ">
            <FaHouse className="iconHouse" />
            {restaurant.restaurantAddress}
            
            <button type="button" className=" btn btn-info text-light" onClick={() => setModalOpen(true)}>지도 보기</button>   
            {modalOpen && (
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
                      <div id="map" style={{ width: '800px', height: '450px' }}></div>
                    </div>
                    <div className="modal-footer">
                      <button type="button" className="btn btn-secondary" onClick={mapCloseModal}>
                        닫기
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            
          

            
          </li>
          <li className="number">
            <FaPhoneAlt />
            {restaurant.callNumber}
          </li>
          <li className="dtCategory">
            <BiSolidFoodMenu />
            {restaurant.category}
          </li>
          <li className="openTime">
            <MdAccessTimeFilled />
            {restaurant.openTime}
          </li>
          <li>
            <PiSirenFill />
            폐업신고 · 정보수정 제안
          </li>
        </ul>
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
      {modalOpen && <div className="modal-backdrop fade show"></div>}
    </div>
  );
}

export default DetailMain;
