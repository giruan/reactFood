import { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../contexts/AuthContext';

function Visual(props) {
  const { userId, name } = props;
  const {user} = useAuth();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCity, setSelectedCity] = useState(''); // 선택된 도시 상태 추가
  // 구 목록 상태 추가
  const [guList, setGuList] = useState([]);
  const [selectedGu, setSelectedGu] = useState(''); //

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };


const handleResetRegion = () =>{
  setSelectedCity(""); // 선택된 도시 상태 초기화
  setSelectedGu("");   // 선택된 구 상태 초기화
  setIsModalOpen(false)
  window.location.href = '/'
  
}



  //도시 선택했을 때 동작
  const handleCityButtonClick = (city) => {
    setSelectedCity(city);

    axios
      .get(`http://localhost:9090/region?city=${city}`)
      .then(function (response) {
        setGuList(response.data);
      })
      .catch(function (error) {
        console.error('서버로부터 데이터를 받아오는데 실패했습니다.', error);
      });
  };

  useEffect(() => {
    const cityButtons = document.querySelectorAll('.selectCity');
    const handleClick = (event) => {
      cityButtons.forEach((btn) => {
        btn.classList.remove('selected');
      });
      event.target.classList.add('selected');
      const city = event.target.innerText;
      setSelectedCity(city);
    };

    cityButtons.forEach((button) => {
      button.addEventListener('click', handleClick);
      return () => {
        button.removeEventListener('click', handleClick);
      };
    });

    // Cleanup 함수를 반환하여 이벤트 리스너를 제거합니다.
    return () => {
      cityButtons.forEach((button) => {
        button.removeEventListener('click', handleClick);
      });
    };
  }, [isModalOpen]);

  useEffect(() => {
    const guButtons = document.querySelectorAll('.selectGu');
    const handleClick = (event) => {
      // 선택된 버튼에 "selected" 클래스 추가
      guButtons.forEach((btn) => {
        btn.classList.remove('selected');
      });
      event.target.classList.add("selected");
      
      const selectedGu = event.target.innerText;
      const selectedGuElement = document.querySelector(".selectedGu");
      selectedGuElement.innerHTML = "선택된 지역 : " + selectedCity + selectedGu;
      console.log(selectedGu)

      //선택 버튼 동작
      const handleSelectRegionClick = () => {
        const currentUrl = new URL(window.location.href);
        currentUrl.searchParams.set('region', selectedGu); //파라미터에 region=? 으로 지정
        window.location.href = currentUrl.href;
      };

      const selectRegionButton = document.getElementById('selectRegion'); //선택버튼 요소 갖고옴
      if (selectRegionButton) {
        selectRegionButton.addEventListener('click', handleSelectRegionClick);
        return () => {
          selectRegionButton.removeEventListener('click', handleSelectRegionClick);
        };
      }
    };

    guButtons.forEach((button) => {
      button.addEventListener('click', handleClick);
      return () => {
        button.removeEventListener('click', handleClick);
      };
    });
    
  }, [guList, selectedCity]);

  return (
    <section className="mainVisual">
      <div className="select">
        {user ? <p>{user.properties.nickname} 님을 위한</p> : (userId ? <p>{name} 님을 위한</p> : <p>회원님을 위한</p>)}
        <h1>추천 맛집</h1>
        <button type="button" id="openModal" onClick={openModal}>
          <span>지역 선택</span>
        </button>
      </div>

      {isModalOpen && (
        <div id="myModal" className="modal container-fluid">
          <div className="modal-content">
            <span className="close" onClick={closeModal}>
              &times;
            </span>
            <h2>지역 선택</h2>

            <div className="table">
              <div className="region_option row">
                <div className="col">광역시도</div>
                <div className="col">시군구</div>
              </div>
              <div className="region_list d-flex row">
                <div className="col-6">
                  <ul className="city">
                    <li>
                      <button type="radio" className="selectCity" onClick={() => handleCityButtonClick('서울')}>
                        서울
                      </button>
                    </li>
                    <li>
                      <button type="radio" className="selectCity" onClick={() => handleCityButtonClick('경기')}>
                        경기
                      </button>
                    </li>
                    <li>
                      <button type="radio" className="selectCity" onClick={() => handleCityButtonClick('인천')}>
                        인천
                      </button>
                    </li>
                  </ul>
                </div>
                <div className="col">
                  <ul className="gu">
                    {guList.map((gu, index) => (
                      <li key={index}>
                        <button type="radio" className="selectGu">
                          {gu.gu}
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
            <div className="selectedGu">선택된 지역 :</div>
            <div className="row selectBtn gx-2">
              <div className="col">
                <button onClick={handleResetRegion}>초기화</button>
              </div>
              <div className="col">
                <button type="button" id="selectRegion">
                  선택
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

export default Visual;
