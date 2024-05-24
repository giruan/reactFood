import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Dropdown } from 'react-bootstrap';
import '../styles/shopEdit.css'

function ShopEdit(){
  const [storeInfo, setStoreInfo]= useState({});
  const [storeImg, setStoreImg] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('카테고리');
  const {restaurantId} = useParams();

  // 카테고리 변경 핸들러
  const handleCategoryChange = (category) => { 
    setSelectedCategory(category);
  };

  useEffect(() => {
    const getStoreInfo = async () => {
      try {
        const response = await fetch(`/shopInfo/${restaurantId}`, {
          method: 'GET'
        });

        const data = await response.json();
        console.log('store Data ', data);
        setStoreInfo(data.storeInfo);
        setStoreImg(data.storeImg);
        
        // 카테고리 설정
        if (data.storeInfo && data.storeInfo.category) {
          setSelectedCategory(data.storeInfo.category);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    getStoreInfo();
  }, [restaurantId]);

// 이미지 추가 핸들러
const handleImageChange = (e) => {
  const files = e.target.files;
  const updatedImages = [...storeImg];

  for (let i = 0; i < files.length; i++) {
    updatedImages.push(files[i]);
  }

  setStoreImg(updatedImages);
};

// 폼 제출을 처리하는 함수
const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const formData = new FormData();
    formData.append('storeInfo', JSON.stringify({storeImg, storeInfo}));
    for (let i = 0; i < storeImg.length; i++) {
      formData.append('imgUrl', storeImg[i]);
    }

    const response = await fetch(`/shopEdit/${restaurantId}`, {
      method: 'PUT',
      body: formData,
    });

    if (!response.ok) {
      throw new Error('가게 정보를 수정하는 데 문제가 발생했습니다.');
    }

    const data = await response.json();
    alert(data.message);
  } catch (error) {
    console.error('Error:', error.message);
    alert('가게 정보 수정에 실패했습니다.');
  }
};

// 입력값 변경 핸들러
const handleInputChange = (e) => {
  const { name, value } = e.target;
  setStoreInfo((prevState) => ({
    ...prevState,
    [name]: value,
  }));
};

const handleDeleteImage = (imgIdToDelete) => {
  const updatedImages = storeImg.filter(image => image.imgId !== imgIdToDelete);
  setStoreImg(updatedImages);
};

  

  return(
    <div className="shopAdd">
      <header>
        <div className="header">
          <a href="/">
            <img src="/image/logo.PNG" alt="다이닝코드" />
          </a>
        </div>
      </header>

      <div className="container addPage">
        <div className="editTitle">
          <h2>식당 수정하기</h2>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="editItem">
            <strong>음식점 이름</strong>
            <input name="restaurantName" id="restaurantName" type="text" value={storeInfo.restaurantName} onChange={handleInputChange} />
          </div>
          <div className="editItem">
            <strong>음식점 주소</strong>
            <input name="restaurantAddress" id="restaurantAddress" type="text" value={storeInfo.restaurantAddress} onChange={handleInputChange}/>
          </div>
          <div className="editItem">
            <strong>영업 시간</strong>
            <input name="openTime" id="openTime" type="text" value={storeInfo.openTime} onChange={handleInputChange}/>
          </div>
          <div className="editItem">
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

          <div className="editItem">
            <strong>매장 번호 (선택)</strong>
            <input name="callNumber" id="callNumber" type="text" value={storeInfo.callNumber} onChange={handleInputChange}/>
          </div>

          <div className="editItem">
            <input name="views" id="views" type="hidden" value={storeInfo.views} placeholder="조회수" />
          </div>

          <div>
            <div className="upload-img">
              <input name="imgUrl" id="imgUrl" type="file" placeholder="가게 사진" onChange={handleImageChange} multiple />
            </div>
            
            <div className="uploaded-img">
              {storeImg.map((image, index) => (
                <div key={index}>
                  <img 
                    src={`/test/${image.imgUrl}`} 
                    alt={`Image ${index}`} 
                    style={{ width: '100px', height: '100px' }} 
                  />
                  <button type="button" onClick={() => handleDeleteImage(image.imgId)}>삭제</button>
                </div>
              ))}
            </div>
          </div>

          <div className="editBtn row">
            <button type="reset" className="btn btn-dark col-4">
              <Link to={'/'}>취소하기</Link>
            </button>
            <button type="submit" className="btn btn-dark col-4">
              수정하기
            </button> 
          </div>
        </form>
      </div>
    </div>
  );

}

export default ShopEdit;
