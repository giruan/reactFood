import { useEffect, useState } from "react";
import { Dropdown } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import '../styles/shopAdd.css'


function AdminComplainList(){

  const [complainList, setComplainList] = useState([]);
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState('카테고리'); // 선택된 카테고리 상태 설정
  const [loading, setLoading] = useState(true);


  // 문의 내역 가져오기
  useEffect(()=>{
        fetch(`/complainList/admin`)
        .then((response) => response.json())
        .then((data) => {
            console.log(data)
            setComplainList(data.complainList)
            setLoading(false);
       
        })
        .catch(err =>{
          console.error("Error", err);  
          setLoading(false);
        }) ;
},[])
    


  return (
    <div className="shopAdd adminComplain">
      <header>
        <div className="header">
          <a href="/">
            <img src="/image/logo.PNG" alt="yumYard" />
          </a>
        </div>
      </header>

      <div className="container addPage ">
        <div className="addtitle">
          <h2>사용자 문의 목록</h2>
        </div>
        {complainList
          .filter((complain) => complain.status !== '처리 완료')
          .map((complain, index) => (
            <Link to={`/complainDetailPost/admin/${complain.complainId}`}>
              <div className="addForm">
                <div key={index} className="addItem">
                  <div className="addItem">
                    <strong>문의 ID</strong>
                    <p>{complain.userId}</p>
                  </div>

                  <div className="addItem">
                    <strong>제목</strong>
                    <p>{complain.title}</p>
                  </div>

                  <div className="addItem">
                    <strong>상태</strong>
                    <p>{complain.status}</p>
                  </div>
                </div>
              </div>
            </Link>
          ))}
      </div>
    </div>
  );
}

export default AdminComplainList;