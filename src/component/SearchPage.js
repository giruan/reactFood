import React from 'react';
import { Link } from 'react-router-dom';

function SearchPage(props) {
  const { shops, handleReviewCount } = props;

  return (
    <div className="select-shop">
      <ul className="shop-box">
        {shops.map((shop) => (
          <li key={shop.restaurantId} className="look-shop" onClick={() => handleReviewCount(shop.restaurantId)}>
            <Link to={`/detail/${shop.restaurantId}`} className="search">
              <div className="shop-h row">
                <img src={`/test/${shop.imgUrl}`} alt={shop.restaurantName} className="col-3 title-img" />
                <div className="info col-9">
                  <h3 className="shop-name">{shop.restaurantName}</h3>
                  <p className="category">{shop.category}</p>
                  <div className="rate d-flex">
                    <div>
                      <p className="score">
                        <span>{shop.avg_rating ? parseFloat(shop.avg_rating).toFixed(1) : '0'}점</span>{' '}
                        <span>({shop.review_count || 0}명)</span>
                      </p>
                    </div>
                  </div>
                </div>
                {shop.content && (
                  <div className="contentbody">
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
