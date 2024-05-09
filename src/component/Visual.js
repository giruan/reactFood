import { useState,useEffect } from "react"
import axios from "axios"

function Visual(props){
  const {userId, name} = props
  
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedCity, setSelectedCity] = useState(""); // 선택된 도시 상태 추가
   // 구 목록 상태 추가
   const [guList, setGuList] = useState([]);
   const [selectedGu, setSelectedGu] = useState(""); // 

  const openModal = () =>{
    setIsModalOpen(true)
  }

  const closeModal = () =>{
    setIsModalOpen(false)
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
    const cityButtons = document.querySelectorAll(".selectCity");
    const handleClick = (event) => {
      cityButtons.forEach((btn) => {
        btn.classList.remove("selected");
      });
      event.target.classList.add("selected");
      const city = event.target.innerText;
      setSelectedCity(city);
    };
  
    cityButtons.forEach((button) => {
      button.addEventListener("click", handleClick);
      return () => {
        button.removeEventListener("click", handleClick);
      };
    });
  
    // Cleanup 함수를 반환하여 이벤트 리스너를 제거합니다.
    return () => {
      cityButtons.forEach((button) => {
        button.removeEventListener("click", handleClick);
      });
    };
  }, [isModalOpen]);
  


  useEffect(() => {
    const guButtons = document.querySelectorAll(".selectGu");
    const handleClick = (event) => {
      // 선택된 버튼에 "selected" 클래스 추가
      guButtons.forEach((btn) => {
        btn.classList.remove("selected");
      });
      event.target.classList.add("selected");
      
      const selectedGu = event.target.innerText;
      const selectedGuElement = document.querySelector(".selectedGu");
      selectedGuElement.innerHTML = "선택된 지역 : " + selectedGu;
    };
  
    guButtons.forEach((button) => {
      button.addEventListener("click", handleClick);
      return () => {
        button.removeEventListener("click", handleClick);
      };
    });
  }, [guList]);


  const handleSelectRegionClick = () => {

    const currentUrl = new URL(window.location.href);
    currentUrl.searchParams.set("region", selectedGu);
    console.log(currentUrl.href);
    window.location.href = currentUrl.href;
  };






return(
  <section className="visual">
        <div className="select">
          {userId ? <p>{name} 님을 위한</p> : <p>회원님을 위한</p>}
          <h1>추천 맛집</h1>
          <button type="button" id="openModal" onClick={openModal}>지역 선택</button>
        </div>
        
        {isModalOpen && (
          <div id="myModal" className="modal container-fluid">
          <div className="modal-content">
          <span className="close" onClick={closeModal}>&times;</span>
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
                      <button type="radio" className="selectCity" onClick={()=> handleCityButtonClick("서울")}>
                        서울
                      </button>
                    </li>
                    <li>
                      <button type="radio" className="selectCity" onClick={()=> handleCityButtonClick("경기")}>
                        경기
                      </button> 
                    </li>
                    <li>
                      <button type="radio" className="selectCity" onClick={()=> handleCityButtonClick("인천")}>
                        인천
                      </button>
                    </li>
                  </ul>
                </div>
                <div className="col">
                  <ul className="gu">
                    {guList.map((gu,index)=>(
                      <li key={index}><button type= "radio" className="selectGu">{gu.gu}</button></li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
            <div className="selectedGu">선택된 지역 :</div>
            <div className="row selectBtn gx-2">
              <div className="col">
                <button onClick={closeModal}>취소</button>
              </div>
              <div className="col">
                <button type="button" id="selectRegion" onClick={handleSelectRegionClick}>
                  선택
                </button>
              </div>
            </div>
          </div>
        </div>
        )}
  </section>
)
}

export default Visual