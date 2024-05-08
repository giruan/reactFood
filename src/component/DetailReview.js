function Detailreview() {
    
    return (
      <div className="restaurantReview container">
        <div className="reviewCount">
          <p> n건의 방문자 평가</p>
          <div className="gradeInfo">
            <div className="gradeRating">
              <span className="totalScore">평균점</span>
            </div>
          </div>
        </div>

        <div className="container userReview">
          <p className="personGrade">
            <span className="username">
              <strong>아이디</strong>
            </span>
            <span className="scoreInfo">
              평균별점 : 평가
              <span className="scoreCnt">n개</span>
            </span>
          </p>

          <div className="container">
            <div className="pointDetail">
              <div className="restaurantRating">
                <span className="totalScore">평가점수</span>
              </div>
            </div>
            <div className="reviewContent">리뷰내용</div>
            <div className="userReviewPic">
              <div className="picGrid row row-cols-4 g-3">
                <div className="col">사진</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
}

export default Detailreview