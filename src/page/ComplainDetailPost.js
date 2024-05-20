import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { Link } from "react-router-dom";

function ComplainDetailPost({adminId}){

  const {userId} = useParams();

  console.log(adminId)

  const [complain, setComplain] = useState({});
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState('카테고리'); // 선택된 카테고리 상태 설정
  const [loading, setLoading] = useState(true);

  const handleChange = () =>{
    setComplain({
      ...complain,
      status : "처리됨"
    })
  }

  // 문의 내역 가져오기
  useEffect(() => {
    const fetchComplainDetail = async () => {
      try {
        const response = await fetch(`/complainDetailPost/admin/${userId}`);
        const data = await response.json();
        console.log(data);
        setComplain(data.complain);
      } catch (err) {
        console.error("Error", err);
      } finally {
        setLoading(false);
      }
    };

    if (userId) {
      fetchComplainDetail();
    }
  }, [userId]);
    


  // 폼 전송 핸들러
  const handleSubmit = async (event) => {
    event.preventDefault();

  
    const formData = new FormData(event.target);
    const formDataObj = Object.fromEntries(formData);
    // FormData를 JSON 객체로 변환
    const json = JSON.stringify(formDataObj);
    console.log(json)
    try {
      const response = await fetch(`/complainDetailPost/admin/${adminId}`, {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
        },
        body: json
      });
  
      if (response.ok) {
        alert('등록 성공');
        window.location.href = `/myPage/${adminId}`
       
      } else {
        alert('오류가 발생했습니다.');
      }
    } catch (error) {
      console.error('Error adding shop:', error);
    }
  };


console.log(complain.userId)


  return (
    <div className="shopAdd">
      <header>
        <div className="header">
          <a href="/">
            <img src="/image/logo.PNG" alt="다이닝코드" />
          </a>
        </div>
      </header>

      <div className="container addPage">
        <div className="addtitle">
          <h2>문의 답변</h2>
          
        </div>
          <form onSubmit={handleSubmit}>
            <div className="addForm">
              {/* 접수번호 */}
              <input name = "complainId" id= "complainId" type="hidden" value={complain.complainId}></input>

              {/* 관리자 ID */}
              <input name = "adminId" id= "adminId" type="hidden" value={adminId}></input>
              
              {/* 관리자 ID */}
              <input name = "status" id= "status" type="hidden" value={complain.status}></input>

                <div className="addItem">
                  <strong>문의 ID</strong>
                  <p>{complain.userId}</p>
                </div>

                <div className="addItem">
                  <strong>카테고리</strong>
                  <p>{complain.complainCategory}</p>
                </div>
      
                <div className="addItem">
                  <strong>제목</strong>
                  <p>{complain.title}</p>
           
                </div>

                <div className="addItem">
                  <strong>내용</strong>
                  <p>{complain.content}</p>
                </div>

                <div className="addItem">
                  <strong>답변 내용</strong>
                  <textarea name="content" id="content" type="text" placeholder="답변"></textarea>
                </div>
                <div className="addBtn row">
            <button type="submit" className="btn btn-dark col-4">
                등록하기
              </button>
              <button type="reset" className="btn btn-dark col-4">
                <Link to={`/complainList/admin`}>취소하기</Link>
              </button>
             
            </div>
        
        </div>
      </form>
      </div>
    </div>
  );
}

export default ComplainDetailPost;