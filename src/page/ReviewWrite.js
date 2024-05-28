import { useState } from "react";
import '../styles/reviewWrite.css';
import { useNavigate, useParams } from "react-router-dom";
import { Dropdown } from "react-bootstrap";


function ReviewWrite(props){
  const {userId} = props
  const [rating, setRating] = useState(1)
  const { restaurantId } = useParams();

  const [selectedTaste, setSelectedTaste] = useState('맛'); // 선택된 카테고리 상태 설정
  const [selectedPrice, setSelectedPrice] = useState('가격'); // 선택된 카테고리 상태 설정
  const [selectedService, setSelectedService] = useState('응대'); // 선택된 카테고리 상태 설정
  
  const navigate = useNavigate();

  console.log(restaurantId)
 

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
              <form onSubmit={handleSubmit} encType="multipart/form-data"className="formContainer" >
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
                  <Dropdown className='dropdown'>
                      <Dropdown.Toggle variant="light" className="category-dropdown">
                        {selectedTaste}
                      </Dropdown.Toggle>
                    <Dropdown.Menu className="dropdown-menu">
                      <Dropdown.Item className='menu-li' onClick={() => handleTasteChange('맛있음')}>맛있음</Dropdown.Item>
                      <Dropdown.Item className='menu-li' onClick={() => handleTasteChange('보통')}>보통</Dropdown.Item>
                      <Dropdown.Item className='menu-li' onClick={() => handleTasteChange('맛없음')}>맛없음</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>

                <strong>가격</strong>
                <Dropdown className='dropdown'>
                    <Dropdown.Toggle variant="light" className="category-dropdown">
                      {selectedPrice}
                    </Dropdown.Toggle>
                  <Dropdown.Menu className="dropdown-menu">
                    <Dropdown.Item className='menu-li' onClick={() => handlePriceChange('만족')}>만족</Dropdown.Item>
                    <Dropdown.Item className='menu-li' onClick={() => handlePriceChange('보통')}>보통</Dropdown.Item>
                    <Dropdown.Item className='menu-li' onClick={() => handlePriceChange('불만족')}>불만족</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>

                <strong>응대</strong>
                <Dropdown className='dropdown'>
                  <Dropdown.Toggle variant="light" className="category-dropdown">
                    {selectedService}
                    </Dropdown.Toggle>
                    <Dropdown.Menu className="dropdown-menu">
                    <Dropdown.Item className='menu-li' onClick={() => handleServiceChange('만족')}>만족</Dropdown.Item>
                    <Dropdown.Item className='menu-li' onClick={() => handleServiceChange('보통')}>보통</Dropdown.Item>
                    <Dropdown.Item className='menu-li' onClick={() => handleServiceChange('불만족')}>불만족</Dropdown.Item>
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
                    <input name="imgUrl" id="imgUrl" type="file" placeholder="리뷰사진" multiple />
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