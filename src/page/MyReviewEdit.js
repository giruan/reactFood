import { useState } from "react"



function MyReviewEdit(){

  const [review, setReview] = useState([])
  const [reviewImg, setReviewImg] = useState([])

  return(
    <>
    {/* <section>
        <div className="container-lg">
          <h2 className="review-title">리뷰 수정하기</h2>
          <div className="review-box">
            <form encType="multipart/form-data">
            <input id="userId" name="userId" value={userData.userId} type="hidden" />
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
                  수정하기
                </button>
              </div>
            </form>
          </div>
        </div>
      </section> */}
    </>
  )
}
export default MyReviewEdit