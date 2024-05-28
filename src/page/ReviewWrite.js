  import { useState, useRef } from 'react';
  import '../styles/reviewWrite.css';
  import { useNavigate, useParams } from 'react-router-dom';
  import { Dropdown } from 'react-bootstrap';

  function ReviewWrite(props) {
    const { userId } = props;
    const [rating, setRating] = useState(1);
    const { restaurantId } = useParams();

    // 이미지
    const [previewImages, setPreviewImages] = useState([]);
    const [deletedImages, setDeletedImages] = useState([]);

    const inputFileRef = useRef(null);
    // 이미지 삭제 처리 함수
    const handleDeleteImage = (image, index) => {
      if (image.isFromServer) {
        // 서버에서 불러온 이미지의 경우, 삭제 목록에 추가
        setDeletedImages((deletedImages) => [...deletedImages, image.url]);
      }
      // 상태에서 해당 이미지 제거
      setPreviewImages((prevImages) => prevImages.filter((_, i) => i !== index));
    };

    const handleImageChange = (e) => {
      const files = e.target.files;
      // 미리보기 이미지 배열 복사
      Array.from(files).forEach((file) => {
        const reader = new FileReader();
        reader.onload = () => {
          const newImage = { url: reader.result, isFromServer: false, file: file };
          setPreviewImages((previewImages) => [...previewImages, newImage]); // 상태 업데이트
        };
        reader.readAsDataURL(file); // 파일을 Data URL로 읽기
      });
    };
    

    //

    const [selectedTaste, setSelectedTaste] = useState('맛'); // 선택된 카테고리 상태 설정
    const [selectedPrice, setSelectedPrice] = useState('가격'); // 선택된 카테고리 상태 설정
    const [selectedService, setSelectedService] = useState('응대'); // 선택된 카테고리 상태 설정

    const navigate = useNavigate();

    console.log(restaurantId);

    const handleRatingChange = (event) => {
      setRating(parseInt(event.target.value));
    };

  const handleSubmit = async(e) =>{
    e.preventDefault();
    const formData = new FormData(e.target);
    formData.append('rating', rating);
    formData.append('taste', selectedTaste)
    formData.append('price', selectedPrice)
    formData.append('service', selectedService)
    
    formData.append('data', JSON.stringify({ deletedImages }));

    previewImages.forEach((image) => {
      if (!image.isFromServer) {
        formData.append('imgUrl', image.file); // 'file'을 'imgUrl'로 변경. 여기서 image.file은 FileReader로 읽은 파일 데이터입니다.
      }
    });
    try {
      const response = await fetch('/review',{
        method: 'POST',
        body: formData
      })
      console.log(response)
      if(response.ok){
        Swal.fire({
          position: "center",
          icon: "success",
          title: "리뷰 작성",
          text : "정상 처리 되었습니다!",
          showConfirmButton: false,
          timer: 2000,
        }) 
        setTimeout(() => {
          window.location.href = `/detail/${restaurantId}`
        }, 2000);
      } else{
        Swal.fire({
          icon: "error",
          title: "리뷰 작성 실패",
          text: "리뷰 작성에 실패하셨습니다.",
        });
      }
    } catch (error) {
      console.error('Error write:', error);
    }
  }
    // const handleSubmit = async (e) => {
    //   e.preventDefault();
    //   const formData = new FormData(e.target);
    //   formData.append('rating', rating);
    //   formData.append('taste', selectedTaste);
    //   formData.append('price', selectedPrice);
    //   formData.append('service', selectedService);

    //   // 이미지 작업
    
    //   // 

    //   try {
    //     const response = await fetch('/review', {
    //       method: 'POST',
    //       body: formData,
    //     });
    //     console.log(response);
    //     if (response.ok) {
    //       alert('등록성공');
    //       console.log(userId);
    //       navigate(`/detail/${restaurantId}`);
    //     } else {
    //       alert('등록 실패');
    //     }
    //   } catch (error) {
    //     console.error('Error write:', error);
    //   }
    // };

    // 카테고리 변경 핸들러
    const handleTasteChange = (taste) => {
      setSelectedTaste(taste);
    };

    const handlePriceChange = (price) => {
      setSelectedPrice(price);
    };

    const handleServiceChange = (service) => {
      setSelectedService(service);
    };

    return (
      <>
        <div>
          <section className="reviewWrite">
            <div className="container-lg">
              <h2 className="review-title">리뷰 작성하기</h2>
              <div className="review-box">
                <form onSubmit={handleSubmit} encType="multipart/form-data" className="formContainer">
                  <input id="userId" name="userId" value={userId} type="hidden" />
                  <input id="restaurantId" name="restaurantId" value={restaurantId} type="hidden" />
                  <div className="review-user"></div>
                  <h3 className="rating-title">전체적으로 어떠셨나요?</h3>
                  <p className="select-star">별점을 선택해주세요</p>
                  <div className="review-rating">
                    <div className="rating">
                      ★★★★★
                      <span className="rating_star" style={{ width: `${rating * 20}%` }}>
                        ★★★★★
                      </span>
                      <input
                        name="rating"
                        id="rating"
                        type="range"
                        value={rating}
                        onChange={handleRatingChange}
                        step="1"
                        min="0"
                        max="5"
                      />
                    </div>
                  </div>
                  <div className="dropList">
                    <strong>맛 </strong>
                    <Dropdown className="dropdown">
                      <Dropdown.Toggle variant="light" className="category-dropdown">
                        {selectedTaste}
                      </Dropdown.Toggle>
                      <Dropdown.Menu className="dropdown-menu">
                        <Dropdown.Item className="menu-li" onClick={() => handleTasteChange('맛있음')}>
                          맛있음
                        </Dropdown.Item>
                        <Dropdown.Item className="menu-li" onClick={() => handleTasteChange('보통')}>
                          보통
                        </Dropdown.Item>
                        <Dropdown.Item className="menu-li" onClick={() => handleTasteChange('맛없음')}>
                          맛없음
                        </Dropdown.Item>
                      </Dropdown.Menu>
                    </Dropdown>

                    <strong>가격</strong>
                    <Dropdown className="dropdown">
                      <Dropdown.Toggle variant="light" className="category-dropdown">
                        {selectedPrice}
                      </Dropdown.Toggle>
                      <Dropdown.Menu className="dropdown-menu">
                        <Dropdown.Item className="menu-li" onClick={() => handlePriceChange('만족')}>
                          만족
                        </Dropdown.Item>
                        <Dropdown.Item className="menu-li" onClick={() => handlePriceChange('보통')}>
                          보통
                        </Dropdown.Item>
                        <Dropdown.Item className="menu-li" onClick={() => handlePriceChange('불만족')}>
                          불만족
                        </Dropdown.Item>
                      </Dropdown.Menu>
                    </Dropdown>

                    <strong>응대</strong>
                    <Dropdown className="dropdown">
                      <Dropdown.Toggle variant="light" className="category-dropdown">
                        {selectedService}
                      </Dropdown.Toggle>
                      <Dropdown.Menu className="dropdown-menu">
                        <Dropdown.Item className="menu-li" onClick={() => handleServiceChange('만족')}>
                          만족
                        </Dropdown.Item>
                        <Dropdown.Item className="menu-li" onClick={() => handleServiceChange('보통')}>
                          보통
                        </Dropdown.Item>
                        <Dropdown.Item className="menu-li" onClick={() => handleServiceChange('불만족')}>
                          불만족
                        </Dropdown.Item>
                      </Dropdown.Menu>
                    </Dropdown>
                  </div>

                  <div className="review-content">
                    <h3>방문후기</h3>
                    <textarea
                      name="content"
                      id="content"
                      cols="50"
                      rows="15"
                      placeholder="음식 서비스 등의 방문경험을 작성해주세요"
                    ></textarea>
                  </div>
                  <h3>음식 및 메뉴판 사진</h3>
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
                            <img src={imageUrl} alt="Preview" style={{ width: '100px', height: '100px' }} />
                            <button type="button" onClick={() => handleDeleteImage(image, index)}>
                              삭제
                            </button>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                  <div className="review-btn" id="reviewBtn">
                    <button type="submit" className="write-btn">
                      작성하기
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </section>
        </div>
      </>
    );
  }

  export default ReviewWrite;
