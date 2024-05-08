import React, { useEffect, useState } from 'react';

function DetailMain() {
  return (
    <div class="restaurantMain container">
      <div class="restaurantInfo">
        <div class="infoImg">
          <img
            src={`https://image.fmkorea.com/files/attach/new3/20230522/494354581/4751395942/5793677340/99b983892094b5c6d2fc3736e15da7d1.jpg`}
            alt="My Image"
          />
          <img src={`https://pbs.twimg.com/media/FvmduXxaIAIOIIo.jpg`} alt="My Image" />
        </div>

        <div class="infoName row justify-content-between">
          <h1 class="col">식당이름</h1>
          <div class="col infoShare d-flex">
            <a>리뷰작성</a>
            <button class="col-3 shareBtn">공유</button>
          </div>
        </div>

        <div class="restaurantCategory">
          <a>지역구</a>
          <a> 카테고리</a>
        </div>

        <div class="restaurantRating">
          <div class="gradeInfo row row-cols-auto">
            <div class="gradeRating col"></div>
            <span class="totalScore col">평균점 </span>
            <p class="col">몇명의 평가</p>
          </div>
        </div>
      </div>

      <div class="restaurantDetail">
        <ul>
          <li class="address row justify-content-between">
            식당주소
            <button type="button" class="col-3 btn btn-info text-light">
              지도보기
            </button>
          </li>
          <li class="number">전화번호</li>
          <li class="category">카테고리</li>
          <li class="openTime">운영시간</li>
          <li>폐업신고 · 정보수정 제안</li>
        </ul>
      </div>
    </div>
  );
}

export default DetailMain;
