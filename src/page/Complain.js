import { useState } from "react";
import { Dropdown } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import '../styles/shopAdd.css'

function Complain(props){
  const {userId} = props;
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState('카테고리'); // 선택된 카테고리 상태 설정

  // 폼 전송 핸들러
  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    formData.append('complainCategory', selectedCategory);

    const formDataObj = Object.fromEntries(formData);
    // FormData를 JSON 객체로 변환
    const json = JSON.stringify(formDataObj);

    // const restaurantName = event.target.restaurantName.value;
    // const restaurantAddress = event.target.restaurantAddress.value;
  
    try {
      const response = await fetch(`/complain/users/${userId}`, {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
        },
        body: json
      });
  
      if (response.ok) {
        Swal.fire({
          position: "center",
          icon: "success",
          title: "문의 사항",
          text : "문의 내용이 정상적으로 처리 되었습니다.",
          showConfirmButton: false,
          timer: 2000,
        }) 
        setTimeout(() => {
          window.location.href = `/complainList/users/${userId}`;
        }, 2000);
      } else {
        alert('오류가 발생했습니다.');
      }
    } catch (error) {
      console.error('Error adding shop:', error);
    }
  };

  // 카테고리 변경 핸들러
  const handleCategoryChange = (category) => { 
    setSelectedCategory(category);
  };


  return (
    <div className="shopAdd complain">
      <header>
        <div className="header">
          <a href="/">
            <img src="/image/logo.PNG" alt="다이닝코드" />
          </a>
        </div>
      </header>

      <div className="container addPage">
        <div className="addtitle">
          <h2>1:1 문의</h2>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="addForm">

          <div className="addItem">
              <strong>문의사항</strong>
              <Dropdown className='dropdown'>
                <Dropdown.Toggle variant="light" className="category-dropdown">
                  {selectedCategory}
                </Dropdown.Toggle>
                <Dropdown.Menu className="dropdown-menu">
                  <Dropdown.Item className='menu-li' onClick={() => handleCategoryChange('계정 관련 문의')}>계정 관련 문의</Dropdown.Item>
                  <Dropdown.Item className='menu-li' onClick={() => handleCategoryChange('기술적 문제 문의')}>기술적 문제 문의</Dropdown.Item>
                  <Dropdown.Item className='menu-li' onClick={() => handleCategoryChange('제품/서비스 관련 문의')}>제품/서비스 관련 문의</Dropdown.Item>
                  <Dropdown.Item className='menu-li' onClick={() => handleCategoryChange('맛집 요청 및 피드백')}>맛집 요청 및 피드백</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </div>

            {/* userId */}
            <div className="addItem">
              {/* <strong>userId</strong> */}
              <input name="userId" id="userId" type="hidden" value={userId}></input>
            </div>  

            <div className="addItem">
              <strong>제목</strong>
              <input name="title" id="title" type="text" placeholder="제목을 적어주세요."></input>
            </div>  

            <div className="addItem">
              <strong>내용</strong>
              <textarea name="content" id="content" type="text" placeholder="내용을 적어주세요."></textarea>
            </div>

            <div className="addItem">
              <input name="status" id="status" type="hidden" placeholder="상태" value="대기중"></input>
            </div>

            <div className="addItem row align-items-center">
              <div className="col-12 picPreview">{/* 여기에 미리보기 이미지들이 표시됩니다. */}</div>
            </div>

            <div className="addBtn row">
            <button type="submit" className="btn btn-dark col-4">
                등록하기
              </button>
              <button type="reset" className="btn btn-dark col-4">
                <Link to="/">취소하기</Link>
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );


  // // 이미지 미리보기 함수
  // const previewImages = (event) => {
  //   const input = event.target;
  //   const preview = document.querySelector('.picPreview');
  //   const MAX_FILES = 2;

  //   if (input.files.length > MAX_FILES) {
  //     alert(`최대 ${MAX_FILES}개의 파일만 업로드할 수 있습니다.`);
  //     input.value = ''; // 선택한 파일 초기화
  //     preview.innerHTML = ''; // 미리보기 초기화
  //     return; // 함수 종료
  //   }

  //   // 이미지를 추가하기 전에 기존의 내용을 모두 지웁니다.
  //   preview.innerHTML = '';

  //   if (input.files && input.files.length > 0) {
  //     for (let i = 0; i < input.files.length; i++) {
  //       const reader = new FileReader();
  //       reader.onload = function (e) {
  //         const image = document.createElement('img');
  //         image.src = e.target.result;
  //         image.style.maxWidth = '400px'; // 이미지의 최대 너비를 지정합니다.
  //         image.style.maxHeight = '400px'; // 이미지의 최대 높이를 지정합니다.
  //         preview.appendChild(image);
  //       };
  //       reader.readAsDataURL(input.files[i]);
  //     }
  //   }
  // };
}

export default Complain;