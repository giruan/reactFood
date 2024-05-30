import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function MyZzimPage(props) {
  const { myFavorites, restaurantName, restaurantImg } = props;

  const [zzimStates, setZzimStates] = useState({});

  useEffect(() => {
    const initialZzimStates = {};
    myFavorites.forEach(favorite => {
      initialZzimStates[favorite.restaurantId] = true;
    });
    setZzimStates(initialZzimStates);
  }, [myFavorites]);

  const handleClick = (favoriteId) => {
    const currentZzim = !zzimStates[favoriteId];
    setZzimStates(prevState => ({
      ...prevState,
      [favoriteId]: currentZzim
    }));

    fetch(`/zzim/users/${myFavorites[0].userId}/restaurantId/${favoriteId}`, {
      method: 'DELETE',
    })
    .then(response => response.json())
    .then(data => {
      console.log(data)
      
    })
    .catch(error => {
      console.error('찜 상태 업데이트 중 오류 발생:', error);
      setZzimStates(prevState => ({
        ...prevState,
        [favoriteId]: !currentZzim
      }));
    });
  }

  return (
    <ul>
      {myFavorites.map((favorite, i) => {
        // favorite에 해당하는 이미지 찾기
        const matchingImg = restaurantImg.find(img => img.restaurantId === favorite.restaurantId);
        // 이미지를 찾은 경우에만 출력
        if (matchingImg && zzimStates[favorite.restaurantId]) {
          return (
            <li key={i}>
              <div className="lookmyFavorites">
                <div className="myZzimImg">
                  <img src={`/store/${matchingImg.imgUrl}`} className="col-3 title-img" />
                </div>
                <div className='zzimBox'>
                  <div className="ZzimResName">
                    {restaurantName.map((res, j) => {
                      if (res.restaurantId === favorite.restaurantId) {
                        return (
                          <h2 className="ZzimResTitle" key={j}>
                            <Link to={`/detail/${res.restaurantId}`}>{res.restaurantName}</Link>
                          </h2>
                        );
                      }
                      return null;
                    })}
                  </div>
                  <div className='zzimBtn-box'>
                    <span className='zzimBtn' onClick={() => handleClick(favorite.restaurantId)}>
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="32" height="32">
                        <path fill={zzimStates[favorite.restaurantId] ? "red" : "none"} stroke="black" strokeWidth="1" d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                      </svg>
                    </span>
                  </div>
                </div>
              </div>
            </li>
          );
        }
        return null;
      })}
    </ul>
  );
}

export default MyZzimPage;
