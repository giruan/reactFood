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
    


  // 폼 전송 핸들러
  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    formData.set('category', selectedCategory);

    try {
      const response = await fetch('/add', {
        method: 'POST',
        body: formData
      });
  
      if (response.ok) {
        alert('등록 성공');
        navigate('/');
      } else {
        alert('음식점이 존재합니다');
      }
    } catch (error) {
      console.error('Error adding shop:', error);
    }
  };

  // 카테고리 변경 핸들러
  const handleCategoryChange = (category) => { 
    setSelectedCategory(category);
  };


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
          <h2>사용자 문의 목록</h2>
        </div>
        {complainList.map((complain, index) => (
          <Link to={`/complainDetail/users/${complain.userId}`} userId = {complain.userId}>
          <form onSubmit={handleSubmit}>
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
      </form>
      </Link>
    ))}

      </div>
    </div>
  );
}

export default AdminComplainList;