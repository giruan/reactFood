import React, { useState, useEffect } from 'react';
import axios from 'axios';

function IndexModal() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [cities, setCities] = useState([]); // 도시 목록 상태
  const [selectedCity, setSelectedCity] = useState('');
  const [guList, setGuList] = useState([]); // 구 목록 상태
  const [selectedGu, setSelectedGu] = useState('');

  useEffect(() => {
    // 도시 데이터를 가져오는 로직을 여기에 추가할 수 있습니다.
  }, []);

  useEffect(() => {
    if (selectedCity) {
      axios.get(`/region?city=${selectedCity}`)
        .then(response => {
          setGuList(response.data);
        })
        .catch(error => {
          console.error("서버로부터 데이터를 받아오는데 실패했습니다.", error);
        });
    }
  }, [selectedCity]);

  return (
    <div>
      <button onClick={() => setIsModalOpen(true)}>모달 열기</button>

      {isModalOpen && (
        <div id="myModal">
          <span className="close" onClick={() => setIsModalOpen(false)}>&times;</span>
          <div>
            {cities.map((city, index) => (
              <button key={index} className={selectedCity === city ? 'selected' : ''} onClick={() => setSelectedCity(city)}>
                {city}
              </button>
            ))}
          </div>
          <ul>
            {guList.map((gu, index) => (
              <li key={index}>
                <button className={selectedGu === gu.gu ? 'selected' : ''} onClick={() => setSelectedGu(gu.gu)}>
                  {gu.gu}
                </button>
              </li>
            ))}
          </ul>
          <div className="selectedGu">선택된 지역 : {selectedGu}</div>
          <button onClick={() => {
            const currentUrl = `?region=${selectedGu}`;
            console.log(currentUrl);
            window.location.href = currentUrl;
          }}>지역 선택</button>
        </div>
      )}
    </div>
  );
}

export default IndexModal;