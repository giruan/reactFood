import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';



function SearchPage(props) {
  const {shops} = props
  // 상태 관리 코드는 제거하고, props로 전달받은 shops를 사용
  console.log(shops);
  return (
    <div className="select-shop">
      <ul className="shop-box">
        {/* shops 배열을 map 함수를 사용하여 각 상점을 표시 */}
        {shops.map((shop) => (
          <li key={shop.restaurantId} className="look-shop">
            <Link to={`/detail/${shop.restaurantId}`} className="search">
              <div className="shop-h row">
                <img src={`/test/${shop.imgUrl}`} alt={shop.restaurantName} className="col-3 title-img" />
                <div className="info col-9">
                  <h3 className="shop-name">{shop.restaurantName}  
                    <span className="heart">
                      <img src="/image/heart.png" alt="" />
                    </span>
                  </h3>
                  <p className="category">{shop.category}</p>
                  <div className="rate d-flex">
                    <div>
                      <p className="score">
                        <span>{shop.avg_rating ? parseFloat(shop.avg_rating).toFixed(1) : '0'}점</span>{" "}
                        <span>({shop.review_count || 0}명)</span>
                      </p>
                    </div>
                  </div>
                </div>
                {shop.content && (
                  <div className="body">
                    <span> "{shop.content}" </span>
                  </div>
                )}
                
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default SearchPage;
