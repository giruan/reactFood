

function DetailPhoto() {
    
    return (
      <section className="restaurantReviewPic container">
        <h2>
          <span className="text-primary">식당이름</span>
          <span>의 사진</span>
        </h2>
        <div className="photo-container">
          <div className="picGrid row row-cols-3 g-3">
            <div className="col">1</div>
            <div className="col">2</div>
            <div className="col">3</div>
            <div className="col">4</div>
            <div className="col">5</div>
            <div className="col">6</div>
            <div className="col">7</div>
            <div className="col">8</div>
            <div className="col">9</div>
          </div>

          <div className="d-grid gap-2" role="group">
            <button type="button" className="btn btn-secondary morePic">
              사진 더보기 ▼
            </button>
          </div>
        </div>
      </section>
    );
}

export default DetailPhoto