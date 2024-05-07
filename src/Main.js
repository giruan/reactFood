import { Link } from "react-router-dom";

function Main({ categories, userId, name }) {
  return (
    <div>
      <nav>
        <div className="container g-0 nav-box">
          <ul className="nav-ul d-flex">
            <li className="nav-li">
              <Link to="#">YUM YARD 소개</Link>
            </li>
            <li className="nav-li">
              <Link to="#">YUM YARD 이용안내</Link>
            </li>
            <li className="nav-li">
              <Link to="#">공지사항</Link>
            </li>
            <li className="nav-li">
              <Link to="#">자주묻는질문</Link>
            </li>
            <li className="nav-li">
              <Link to="#">매거진</Link>
            </li>
          </ul>
        </div>
      </nav>
      <section className="visual">
        <div className="select">
          {userId ? <p>{name} 님을 위한</p> : <p>회원님을 위한</p>}
          <h1>추천 맛집</h1>
          <button id="openModal">지역 선택</button>
        </div>

        <div id="myModal" class="modal container-fluid">
          <div class="modal-content">
            <span class="close">&times;</span>
            <h2>지역 선택</h2>
            <div class="table">
              <div class="region_option row">
                <div class="col">광역시도</div>
                <div class="col">시군구</div>
              </div>
              <div class="region_list d-flex row">
                <div class="col-6">
                  <ul class="city">
                    <li>
                      <input type="radio" class="selectCity">
                        서울
                      </input>
                    </li>
                    <li>
                      <input type="radio" class="selectCity">
                        경기
                      </input>
                    </li>
                    <li>
                      <input type="radio" class="selectCity">
                        인천
                      </input>
                    </li>
                  </ul>
                </div>
                <div class="col">
                  <ul class="gu"></ul>
                </div>
              </div>
            </div>
            <div class="selectedGu">선택된 지역 :</div>
            <div class="row selectBtn gx-2">
              <div class="col">
                <button>취소</button>
              </div>
              <div class="col">
                <input type="button" id="selectRegion">
                  선택
                </input>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div class="info d-flex justify-content-center">
        <p>로그인하여 전국에 있는 맛집들을 확인하세요!</p>
      </div>

      <section class="main container-lg">
        <div class="category">
          <h2 class="title">카테고리</h2>
        </div>

        <div className="category_box">
        <div className="row row-cols-5 restaurant_list g-0">
          {categories.map((category, i) => (
            <div className="col" key={i}>
              <div className="pic">
                <a href={`/search?keyword=${category.categoryName}`}>
                  <img src={`/image/category/category${i}.jpg`} alt={category.categoryName}/>
                </a>
              </div>
              <p className="restaurant_title">{category.categoryName}</p>
            </div>
          ))}
        </div>
      </div>
      </section>
    </div>
  );
}

export default Main;
