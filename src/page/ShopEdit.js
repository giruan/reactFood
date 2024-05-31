import { useEffect, useState, useRef } from "react";
import { Link, useParams } from "react-router-dom";
import { Dropdown } from 'react-bootstrap';
import '../styles/shopEdit.css';

function ShopEdit(){
  const [storeInfo, setStoreInfo] = useState({});
  const [storeImg, setStoreImg] = useState([]);
  const [storeImgId, setStoreImgId] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('카테고리');
  const { restaurantId } = useParams();
  const inputFileRef = useRef(null);

  const [startTime, setStartTime] = useState('00:00');
  const [endTime, setEndTime] = useState('00:00');

  const handleStartTimeChange = (event) => {
    setStartTime(event.target.value);
  };

  const handleEndTimeChange = (event) => {
    setEndTime(event.target.value);
  };

  // 카테고리 변경 핸들러
  const handleCategoryChange = (category) => { 
    setSelectedCategory(category);
  };

  useEffect(() => {
    const getStoreInfo = async () => {
      try {
        const response = await fetch(`/shopInfo/${restaurantId}`, { method: 'GET' });
        const data = await response.json();
        console.log('store Data ', data);
        setStoreInfo(data.storeInfo);

        // 기존 이미지를 상태에 설정
        const existingImages = data.storeImg.map(img => ({
          imgUrl: `/store/${img.imgUrl}`, 
          isNew: false, 
          imgId: img.imgId
        }));
        setStoreImg(existingImages);

        if (data.storeInfo && data.storeInfo.category) {
          setSelectedCategory(data.storeInfo.category);
        }

        if (data.storeInfo && data.storeInfo.openTime) {
          const [start, end] = data.storeInfo.openTime.split('~').map((time) => time.trim());
          setStartTime(start);
          setEndTime(end);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    getStoreInfo();
  }, [restaurantId]);

  const handleImageChange = (e) => {
    const files = e.target.files;
    const updatedImages = [...storeImg];

    if (updatedImages.length + files.length > 2) {
      alert('이미지는 최대 두 개까지만 등록할 수 있습니다.');
      // 입력 필드 비우기
      inputFileRef.current.value = '';
      return;
    }

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      updatedImages.push({ file, preview: URL.createObjectURL(file), isNew: true });
    }

    setStoreImg(updatedImages);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Submitting form with restaurantId:', restaurantId);
  
    try {
      const formData = new FormData();
      formData.append('storeInfo', JSON.stringify(storeInfo));
  
      // 삭제된 이미지의 ID 배열을 formData에 추가합니다.
      storeImgId.forEach(id => {
        formData.append('storeImgId', id);
      });
  
      for (let i = 0; i < storeImg.length; i++) {
        if (storeImg[i].isNew) {
          formData.append('imgUrl', storeImg[i].file);
        }
      }
  
      const response = await fetch(`/shopInfo/shopEdit/${restaurantId}`, {
        method: 'PUT',
        body: formData,
      });
  
      if (!response.ok) {
        throw new Error('가게 정보를 수정하는 데 문제가 발생했습니다.');
      }
  
      const data = await response.json();
      alert(data.message);
      window.location.href=`/detail/${restaurantId}`
    } catch (error) {
      console.error('Error:', error.message);
      alert('가게 정보 수정에 실패했습니다.');
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setStoreInfo((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleDeleteImage = (index) => {
    const updatedImages = storeImg.filter((_, imgIndex) => imgIndex !== index);
    setStoreImg(updatedImages);
  
    const deletedImage = storeImg[index];
    
    // 삭제된 이미지가 새로 추가된 이미지가 아닌 경우에만 해당 이미지의 ID를 추적합니다.
    if (!deletedImage.isNew) {
      setStoreImgId((prevIds) => {
        // 기존 ID 배열을 복사하여 업데이트합니다.
        const updatedIds = [...prevIds];
        // 삭제된 이미지의 ID를 배열에 추가합니다.
        updatedIds.push(deletedImage.imgId);
        return updatedIds;
      });
    }
  };
  
  

  return (
    <div className="shopAdd">
      <header>
        <div className="shopheader">
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
            <strong>식당 이름</strong>
            <input
              name="restaurantName"
              id="restaurantName"
              type="text"
              value={storeInfo.restaurantName}
              onChange={handleInputChange}
            />
          </div>
          <div className="editItem">
            <strong>식당 주소</strong>
            <input
              name="restaurantAddress"
              id="restaurantAddress"
              type="text"
              value={storeInfo.restaurantAddress}
              onChange={handleInputChange}
            />
          </div>

          <div className="addItem time-range">
            <div>
              <strong>영업 시간 </strong>
            </div>
            <div className="time-select">
              <select id="start-time" value={startTime} onChange={handleStartTimeChange}>
                {[...Array(24).keys()].map((hour) => (
                  <option key={hour} value={`${hour < 10 ? '0' : ''}${hour}:00`}>{`${
                    hour < 10 ? '0' : ''
                  }${hour}:00`}</option>
                ))}
              </select>
              ~
              <select id="end-time" value={endTime} onChange={handleEndTimeChange}>
                {[...Array(24).keys()].map((hour) => (
                  <option key={hour} value={`${hour < 10 ? '0' : ''}${hour}:00`}>{`${
                    hour < 10 ? '0' : ''
                  }${hour}:00`}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="editItem">
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

          <div className="editItem">
            <strong>전화 번호 (선택)</strong>
            <input
              name="callNumber"
              id="callNumber"
              type="text"
              value={storeInfo.callNumber}
              onChange={handleInputChange}
            />
          </div>

          <div className="editItem">
            <input name="views" id="views" type="hidden" value={storeInfo.views} placeholder="조회수" />
          </div>

          <div className="addItem">
            <strong>식당 사진</strong>
            <div className="review-img">
              <div className="upload-img">
                <input
                  ref={inputFileRef}
                  name="imgUrl"
                  id="imgUrl"
                  type="file"
                  placeholder="가게 사진"
                  onChange={handleImageChange}
                  multiple
                />
              </div>

              <div className="review-img-preview shopEditImg">
                {storeImg.map((image, index) => (
                  <div key={index}>
                    <img
                      src={image.isNew ? image.preview : image.imgUrl}
                      alt={`Image ${index}`}
                      style={{ width: '200px', height: '200px', objectFit: 'cover' }}
                    />
                    <button type="button" onClick={() => handleDeleteImage(index)}>
                      삭제
                    </button>
                  </div>
                ))}
              </div>
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
