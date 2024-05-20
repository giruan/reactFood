import { useState } from "react";
import { Dropdown } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import '../styles/shopAdd.css'

function Response(){

  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState('카테고리'); // 선택된 카테고리 상태 설정


  

  // 폼 전송 핸들러
  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    formData.set('category', selectedCategory);

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
          <h2>사용자 문의 내역</h2>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="addForm">

          <div className="addItem">
              <strong>문의사항</strong>
            </div>






            <div className="addItem">
              <strong>음식점 이름</strong>
              <input name="restaurantName" id="restaurantName" type="text" placeholder="음식점 이름" />
            </div>
           
           
            
            <div className="addItem">
              <strong>건의사항</strong>
              <textarea name="callNumber" id="callNumber" type="text" placeholder="전화 번호"></textarea>
            </div>

            <div className="addItem row align-items-center">
              
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

export default Response;