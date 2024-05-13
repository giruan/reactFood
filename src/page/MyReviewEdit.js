import { useEffect, useState, useRef } from "react"
import { useNavigate, useParams } from "react-router-dom"



function MyReviewEdit(props){
  const {userId} = props;
  const [previewImages, setPreviewImages] = useState([]);
  const inputFileRef = useRef(null);

  const {reviewId} = useParams();
  const [review, setReview] = useState({
    reviewId : '',
    userId : '',
    restaurantId : '',
    content : '',
    rating : ''
  })
  const [restaurant, setRestaurant] = useState({
    restaurantName : '',
  })
 
 
  const [rating, setRating] = useState(1)

  const navigate = useNavigate();

  // 별점 
  const handleRatingChange = (event) => {
    setReview(preReview => ({ 
      ...preReview,
      reviewId : reviewId,
      rating : parseInt(event.target.value)
    }));
  };

  // 내용
  const handleContentChange = (event) => {
    setReview(preReview => ({ 
      ...preReview,
      reviewId : reviewId,
      content : event.target.value
    }));
  };

  // 렌더링 되면 데이터 값 불러옴
  useEffect(()=>{
    fetch(`/detailReview/${reviewId}`)
    .then(response => response.json())
    .then(data=>{
      setReview({
        ...data.review
      })
      setRestaurant({
        ...data.restaurant
      })
      setPreviewImages(data.img.map(imgObject => ({ url: imgObject.imgUrl, isFromServer: true })))
    })
    .catch(err => console.error('Error', err))  
  },[])


  const handleImageChange = (e) => {
    const files = e.target.files;
    // 미리보기 이미지 배열 복사
  
    Array.from(files).forEach(file => {
      const reader = new FileReader();
      console.log(file)

      reader.onload = () => {
        const newImage = { url: reader.result, isFromServer: false, file: file };
       
        setPreviewImages(previewImages => [...previewImages, newImage]); // 상태 업데이트
      };
      reader.readAsDataURL(file); // 파일을 Data URL로 읽기
    });
  };

  // 미리보기 이미지와 선택 초기화
  const handleResetPreviewImages = () => {
    setPreviewImages([]);
    if (inputFileRef.current) {
      inputFileRef.current.value = ""; // input 파일 필드 초기화
    }
  };

  const handleSubmit = async (e) =>{
    e.preventDefault();
    const formData = new FormData(e.target);
    formData.append('rating', review.rating);
    formData.append('content', review.content);

    previewImages.forEach((image) => {
      if (!image.isFromServer) {
        formData.append('imgUrl', image.file); // 'file'을 'imgUrl'로 변경. 여기서 image.file은 FileReader로 읽은 파일 데이터입니다.
      }
    });

    console.log(formData)
    try {
      const response = await fetch(`/editReview/${review.reviewId}`,{
        method: 'PUT',
        body: formData
      })
      console.log(response)
      if(response.ok){
        alert('등록성공');
        console.log(userId)
        navigate(`/myReview/${userId}`)
      } else{
        alert('등록 실패')
      }
    } catch (error) {
      console.error('Error write:', error);
    }
  }

  console.log(review.reviewId)  
  console.log(review.content)  
  console.log(restaurant.restaurantName)  
    
  return(
    <>
    <div>
        <section className="reviewWrite">
          <div className="container-lg">
            <h2 className="review-title">{restaurant.restaurantName} 리뷰 수정하기</h2>
            <div className="review-box">

              <form onSubmit={handleSubmit}>
                <input id="userId" name="userId" value={review.userId} type="hidden" />
                <input id="reviewId" name="reviewId" value={review.reviewId} type="hidden" />
                <div className="review-user"></div>
                <h3 className="rating-title">전체적으로 어떠셨나요?</h3>
                <p className="select-star">별점을 선택해주세요</p>
                <div className="review-rating">
                  <div className="rating">
                    ★★★★★
                    <span className="rating_star" style={{ width: `${review.rating * 20}%` }}>
                      ★★★★★
                    </span>
                    <input
                      name="rating"
                      id="rating"
                      type="range"
                      value={review.rating}
                      onChange={handleRatingChange}
                      step="1"
                      min="0"
                      max="5"
                    />
                  </div>
                </div>
                <div className="review-content">
                  <h3>방문후기</h3>
                  <textarea
                    name="content"
                    id="content"
                    cols="50"
                    rows="15"
                    value={review.content}
                    placeholder="음식 서비스 등의 방문경험을 작성해주세요"
                    onChange={handleContentChange}
                  ></textarea>
                </div>
                <h3>음식 및 메뉴판 사진</h3>
                <div className="review-img">
                  <div className="upload-img">
                    <input ref={inputFileRef} name="imgUrl" id="imgUrl" type="file" placeholder="리뷰사진" onChange={handleImageChange} multiple />
                    
                    {previewImages.map((image, index) => {
                      // 서버에서 불러온 이미지와 사용자가 선택한 이미지를 구분하여 처리
                      const imageUrl = image.isFromServer ? `/reviews/${image.url}` : image.url;
                      return <img key={index} src={imageUrl} alt="Preview" style={{ width: '100px', height: '100px' }} />;
                    })}
                  
                  </div>
                </div>
                <div className="review-btn" id="reviewBtn">
                  <button type="submit" className="write-btn">
                    작성하기
                  </button>
                  <button type="button" className="reset-btn" onClick={handleResetPreviewImages}>
                    이미지 초기화
                  </button>
                </div>
              </form>
            </div>
          </div>
        </section>
      </div>
    </>
  )
}
export default MyReviewEdit