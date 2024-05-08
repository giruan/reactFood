import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';


function SearchPage(props) {
  const {shops} = props
  // 상태 관리 코드는 제거하고, props로 전달받은 shops를 사용
  return (
    <div className="select-shop">
      <ul className="shop-box">
        {/* shops 배열을 map 함수를 사용하여 각 상점을 표시 */}
        {shops.map(shop => (
          <li key={shop.restaurantId} className="look-shop">
            <Link to={`/detail/${shop.restaurantId}`} className="search">
              <div className="shop-h row">
                {shop.Images && shop.Images.length > 0 ? (
                  <img
                    src={`/test/${shop.Images[0].imgUrl}`}
                    alt={shop.restaurantName}
                    className="col-3 title-img"
                  />
                ) : (
                  <img
                    src="/path/to/default/image.png"
                    alt="Default Image"
                    className="col-3 title-img"
                  />
                )}
                <div className="info col-9">
                  <h3 className="shop-name">{shop.restaurantName}</h3>
                  <p className="category">{shop.category}</p>
                  <div className="rate d-flex">
                    <p className="score"><span>{shop.score}</span>점</p>
                    <p className="user-score">
                      <img src="/image/star.png" alt="" />{shop.userScore} ({shop.reviewCount}명)
                    </p>
                    <p className="heart">
                      <img src="/image/heart.png" alt="" /><span>{shop.favoriteCount}</span>
                    </p>
                  </div>
                </div>
                <div className="body">
                  <span> "{shop.reviewContent}" </span>
                </div>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default SearchPage;
