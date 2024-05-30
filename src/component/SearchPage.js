import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { MdDeleteForever } from "react-icons/md";
import TruncatedText from './TruncatedText';

function SearchPage(props) {
  const { shops, handleReviewCount, name } = props;
  const location = useLocation(); 
  const navigate = useNavigate();
  console.log(name)

  const handleDelete = (restaurantId) => {
    const isConfirmed = window.confirm(' 가게를 삭제하시겠습니까?');
  
    if (isConfirmed) {
      fetch(`/searchPage/delete/${restaurantId}`, {
        method: 'DELETE'
      })
      .then(response => {
        if (!response.ok) {
          throw new Error('가게 삭제에 실패했습니다.');
        }

        navigate(location.pathname + location.search, { replace: true });
      })
      .catch(error => {
        console.error('가게 삭제 실패:', error.message);
      });
    }
  }

  return (
    <div className="select-shop">
      <ul className="shop-box">
        {shops.map((shop) => (
          <li key={shop.restaurantId} className="look-shop" onClick={() => handleReviewCount(shop.restaurantId)}>
            <div className="shop-h row">
              <Link to={`/detail/${shop.restaurantId}`} className="search d-flex">
                <img src={`/store/${shop.imgUrl}`} alt={shop.restaurantName} className="col-3 title-img" />
                <div className="info col-9">
                  <h3 className="shop-name">{shop.restaurantName}</h3>
                  <p className="category">{shop.category}</p>
                  <div className="rate d-flex">
                    <div>
                      <p className="score">
                        <span>{shop.avg_rating ? parseFloat(shop.avg_rating).toFixed(1) : '0'}점</span>{' '}
                        <span>({shop.review_count || 0}명)</span>
                      </p>
                      {shop.content && (
                        <div className="contentbody">
                          <TruncatedText text={`"${shop.content}"`}  />
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                <div className="li-delete">
                  {name === '관리자' ? (
                    <Link onClick={() => handleDelete(shop.restaurantId)}>
                      <MdDeleteForever />
                    </Link>
                  ) : (
                    <></>
                  )}
                </div>
              </Link>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default SearchPage;
