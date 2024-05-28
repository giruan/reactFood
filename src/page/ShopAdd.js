import React, { useState, useRef } from 'react';
import { Dropdown } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import '../styles/shopAdd.css';

function ShopAdd() {
  const [selectedCategory, setSelectedCategory] = useState('카테고리');
  const [previewImages, setPreviewImages] = useState([]);

  const inputFileRef = useRef(null);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);

    if (selectedCategory === '카테고리') {
      Swal.fire({
        icon: "error",
        title: "음식점 등록 실패",
        text: "카테고리를 선택해주세요.",
      });
      console.error('Error:', error);
      return;
    }
    formData.set('category', selectedCategory);
    const restaurantName = event.target.restaurantName.value;
    const restaurantAddress = event.target.restaurantAddress.value;

    if (!restaurantName || !restaurantAddress) {
      Swal.fire({
        icon: "error",
        title: "음식점 등록 실패",
        text: "음식점 이름과 주소를 모두 입력하세요.",
      });
      console.error('Error:', error);
      return;
    }

    const imgUrlInput = event.target.imgUrl;
    if (!imgUrlInput.files || imgUrlInput.files.length === 0) {
      Swal.fire({
        icon: "error",
        title: "음식점 등록 실패",
        text: "사진을 1개 이상 등록하세요.",
      });
      return;
    }

    try {
      const response = await fetch('/add', {
        method: 'POST',
        body: formData,
      });
      if (response.ok) {
        Swal.fire({
          position: "center",
          icon: "success",
          title: "음식점 등록 성공!",
          text : "정상적으로 음식점이 등록 되었습니다.",
          showConfirmButton: false,
          timer: 2000,
        }) 
        setTimeout(() => {
          window.location.href = "/"
        }, 2000);
      } else {
        Swal.fire({
          icon: "error",
          title: "음식점 등록 실패...",
          text: "이미 존재하는 음식점입니다.",
        });
      }
    } catch (error) {
      console.error('Error adding shop:', error);
    }
  };

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
  };


  // 미리보기 이미지 배열
  const handleImageChange = (e) => {
    const files = e.target.files;
    if (previewImages.length + files.length > 2) {
      Swal.fire({
        icon: "error",
        title: "사진",
        text: "사진은 최대 2개까지만 등록할 수 있습니다.",
      });
      inputFileRef.current.value = '';
      return;
    }

    Array.from(files).forEach((file) => {
      const reader = new FileReader();
      reader.onload = () => {
        const newImage = { url: reader.result, isFromServer: false, file: file };
        setPreviewImages((previewImages) => [...previewImages, newImage]);
      };
      reader.readAsDataURL(file);
    });
  };

  const handleDeleteImage = (image, index) => {
    // 상태에서 해당 이미지 제거
    setPreviewImages((prevImages) => prevImages.filter((_, i) => i !== index));
    resetFileInput()
  };

  const resetFileInput = () => {
    if (inputFileRef.current) {
      inputFileRef.current.value = '';
    }
  };



  return (
    <div className="shopAdd shopAddDetail">
      <header>
        <div className="header">
          <a href="/">
            <img src="/image/logo.PNG" alt="Yam Yard" />
          </a>
        </div>
      </header>

      <div className="container addPage">
        <div className="addtitle">
          <h2>식당 추가하기</h2>
        </div>

        <form onSubmit={handleSubmit} encType="multipart/form-data">
          <div className="addForm">
            <div className="addItem">
              <strong>음식점 이름</strong>
              <input name="restaurantName" id="restaurantName" type="text" placeholder="음식점 이름" />
            </div>
            <div className="addItem">
              <strong>음식점 주소</strong>
              <input name="restaurantAddress" id="restaurantAddress" type="text" placeholder="음식점 주소" />
            </div>
            <div className="addItem">
              <strong>영업 시간</strong>
              <input name="openTime" id="openTime" type="text" placeholder="영업 시간" />
            </div>
            <div className="addItem">
              <strong>카테고리</strong>
              <Dropdown className="dropdown">
                <Dropdown.Toggle variant="light" className="category-dropdown">
                  {selectedCategory}
                </Dropdown.Toggle>
                <Dropdown.Menu className="dropdown-menu">
                  <Dropdown.Item className="menu-li" onClick={() => handleCategoryChange('고기')}>
                    고기
                  </Dropdown.Item>
                  <Dropdown.Item className="menu-li" onClick={() => handleCategoryChange('돈까스')}>
                    돈까스
                  </Dropdown.Item>
                  <Dropdown.Item className="menu-li" onClick={() => handleCategoryChange('버거')}>
                    버거
                  </Dropdown.Item>
                  <Dropdown.Item className="menu-li" onClick={() => handleCategoryChange('분식')}>
                    분식
                  </Dropdown.Item>
                  <Dropdown.Item className="menu-li" onClick={() => handleCategoryChange('아시안')}>
                    아시안
                  </Dropdown.Item>
                  <Dropdown.Item className="menu-li" onClick={() => handleCategoryChange('양식')}>
                    양식
                  </Dropdown.Item>
                  <Dropdown.Item className="menu-li" onClick={() => handleCategoryChange('일식')}>
                    일식
                  </Dropdown.Item>
                  <Dropdown.Item className="menu-li" onClick={() => handleCategoryChange('족발 • 보쌈')}>
                    족발 • 보쌈
                  </Dropdown.Item>
                  <Dropdown.Item className="menu-li" onClick={() => handleCategoryChange('죽')}>
                    죽
                  </Dropdown.Item>
                  <Dropdown.Item className="menu-li" onClick={() => handleCategoryChange('중식')}>
                    중식
                  </Dropdown.Item>
                  <Dropdown.Item className="menu-li" onClick={() => handleCategoryChange('탕 • 찌개')}>
                    탕 • 찌개
                  </Dropdown.Item>
                  <Dropdown.Item className="menu-li" onClick={() => handleCategoryChange('치킨')}>
                    치킨
                  </Dropdown.Item>
                  <Dropdown.Item className="menu-li" onClick={() => handleCategoryChange('피자')}>
                    피자
                  </Dropdown.Item>
                  <Dropdown.Item className="menu-li" onClick={() => handleCategoryChange('디저트')}>
                    디저트
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </div>
            <div className="addItem">
              <strong>매장 번호 (선택)</strong>
              <input name="callNumber" id="callNumber" type="text" placeholder="전화 번호" />
            </div>
            <div className="addItem">
              <strong>가게사진</strong>
              <div className="review-img">
                <div className="upload-img">
                  <input
                    ref={inputFileRef}
                    name="imgUrl"
                    id="imgUrl"
                    type="file"
                    placeholder="리뷰사진"
                    onChange={handleImageChange}
                    multiple
                  />
                </div>
                <div className="review-img-preview">
                  {previewImages.map((image, index) => {
                    const imageUrl = image.isFromServer ? `/reviews/${image.url}` : image.url;
                    return (
                      <div key={index}>
                        <img
                          src={imageUrl}
                          alt="Preview"
                          style={{ width: '200px', height: '200px', objectFit: 'cover' }}
                        />
                        <button type="button" onClick={() => handleDeleteImage(image, index)}>
                          삭제
                        </button>
                      </div>
                    );
                  })}
                </div>
              </div>

             
            </div>
            <div className="addItem">
              <input name="views" id="views" type="hidden" value="0" placeholder="조회수" />
            </div>
            <div className="addBtn row">
              <button type="reset" className="btn btn-dark col-4">
                <a href="/">취소하기</a>
              </button>
              <button type="submit" className="btn btn-dark col-4">
                등록하기
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ShopAdd;
