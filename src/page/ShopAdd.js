import React from 'react';
import { useState } from 'react';
import { Dropdown } from 'react-bootstrap'; // Bootstrap Dropdown 가져오기
import { useNavigate } from 'react-router-dom'; // useHistory 가져오기
import '../styles/shopAdd.css'

function ShopAdd() {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState('카테고리'); // 선택된 카테고리 상태 설정

  // 폼 전송 핸들러
  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);

    if(selectedCategory === "카테고리"){
      alert("카테고리를 선택해주세요.")
      return ;
    }
    formData.set('category', selectedCategory);
  
    const restaurantName = event.target.restaurantName.value;
    const restaurantAddress = event.target.restaurantAddress.value;
  
    // 음식점 이름과 주소 유효성 검사
    if (!restaurantName || !restaurantAddress) {
      alert('음식점 이름과 주소를 모두 입력하세요.');
      return;
    }
  
    // 파일 업로드 유효성 검사
    const imgUrlInput = event.target.imgUrl;
    if (!imgUrlInput.files || imgUrlInput.files.length === 0) {
      alert('사진을 1개 이상 등록하세요.');
      return;
    }
  
    try {
      const response = await fetch('/add', {
        method: 'POST',
        body: formData
      });
  
      if (response.ok) {
        alert('등록 성공');
        navigate('/');
      } else {
        alert('음식점이 존재합니다');
      }
    } catch (error) {
      console.error('Error adding shop:', error);
    }
  };

  // 카테고리 변경 핸들러
  const handleCategoryChange = (category) => { 
    setSelectedCategory(category);
  };

  // 이미지 미리보기 함수
  const previewImages = (event) => {
    const input = event.target;
    const preview = document.querySelector('.picPreview');
    const MAX_FILES = 2;

    if (input.files.length > MAX_FILES) {
      alert(`최대 ${MAX_FILES}개의 파일만 업로드할 수 있습니다.`);
      input.value = ''; // 선택한 파일 초기화
      preview.innerHTML = ''; // 미리보기 초기화
      return; // 함수 종료
    }

    // 이미지를 추가하기 전에 기존의 내용을 모두 지웁니다.
    preview.innerHTML = '';

    if (input.files && input.files.length > 0) {
      for (let i = 0; i < input.files.length; i++) {
        const reader = new FileReader();
        reader.onload = function (e) {
          const image = document.createElement('img');
          image.src = e.target.result;
          image.style.maxWidth = '400px'; // 이미지의 최대 너비를 지정합니다.
          image.style.maxHeight = '400px'; // 이미지의 최대 높이를 지정합니다.
          preview.appendChild(image);
        };
        reader.readAsDataURL(input.files[i]);
      }
    }
  };

  return (
    <div className="shopAdd">
      <header>
        <div className="header">
          <a href="/">
            <img src="/image/logo.PNG" alt="다이닝코드" />
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

              <Dropdown className='dropdown'>
                <Dropdown.Toggle variant="light" className="category-dropdown">
                  {selectedCategory}
                </Dropdown.Toggle>
                <Dropdown.Menu className="dropdown-menu">
                  <Dropdown.Item className='menu-li' onClick={() => handleCategoryChange('고기')}>고기</Dropdown.Item>
                  <Dropdown.Item className='menu-li' onClick={() => handleCategoryChange('돈까스')}>돈까스</Dropdown.Item>
                  <Dropdown.Item className='menu-li' onClick={() => handleCategoryChange('버거')}>버거</Dropdown.Item>
                  <Dropdown.Item className='menu-li' onClick={() => handleCategoryChange('분식')}>분식</Dropdown.Item>
                  <Dropdown.Item className='menu-li' onClick={() => handleCategoryChange('아시안')}>아시안</Dropdown.Item>
                  <Dropdown.Item className='menu-li' onClick={() => handleCategoryChange('양식')}>양식</Dropdown.Item>
                  <Dropdown.Item className='menu-li' onClick={() => handleCategoryChange('일식')}>일식</Dropdown.Item>
                  <Dropdown.Item className='menu-li' onClick={() => handleCategoryChange('족발 • 보쌈')}>족발 • 보쌈</Dropdown.Item>
                  <Dropdown.Item className='menu-li' onClick={() => handleCategoryChange('죽')}>죽</Dropdown.Item>
                  <Dropdown.Item className='menu-li' onClick={() => handleCategoryChange('중식')}>중식</Dropdown.Item>
                  <Dropdown.Item className='menu-li' onClick={() => handleCategoryChange('탕 • 찌개')}>탕 • 찌개</Dropdown.Item>
                  <Dropdown.Item className='menu-li' onClick={() => handleCategoryChange('치킨')}>치킨</Dropdown.Item>
                  <Dropdown.Item className='menu-li' onClick={() => handleCategoryChange('피자')}>피자</Dropdown.Item>
                  <Dropdown.Item className='menu-li' onClick={() => handleCategoryChange('디저트')}>디저트</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </div>

            <div className="addItem">
              <strong>매장 번호 (선택)</strong>
              <input name="callNumber" id="callNumber" type="text" placeholder="전화 번호" />
            </div>

            <div className="addItem row align-items-center">
              <div className="col picCheck">
                <strong className="col">가게 사진 :</strong>
                <input
                  name="imgUrl"
                  id="imgUrl"
                  type="file"
                  className="form-control-file"
                  onChange={previewImages}
                  placeholder="사진"
                  multiple
                />
              </div>
              <div className="col-12 picPreview">{/* 여기에 미리보기 이미지들이 표시됩니다. */}</div>
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
