import { useState } from "react"

function Visual(props){
  const {userId, name} = props
  const [isModalOpen, setIsModalOpen] = useState(false)


  const openModal = () =>{
    setIsModalOpen(true)
  }

  const closeModal = () =>{
    setIsModalOpen(false)
  }

return(
  <section className="visual">
        <div className="select">
          {userId ? <p>{name} 님을 위한</p> : <p>회원님을 위한</p>}
          <h1>추천 맛집</h1>
          <button id="openModal" onClick={openModal}>지역 선택</button>
        </div>
        
        {isModalOpen &&(
          <div id="myModal" class="modal container-fluid">
          <div class="modal-content">
          <span class="close" onClick={closeModal}>&times;</span>
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
                      <input type="radio" class="selectCity"/>
                        서울
                    </li>
                    <li>
                      <input type="radio" class="selectCity"/>
                        경기
                    </li>
                    <li>
                      <input type="radio" class="selectCity"/>
                        인천
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
                <input type="button" id="selectRegion"/>
                  선택
              </div>
            </div>
          </div>
        </div>
        )}
  </section>
)
   
}

export default Visual