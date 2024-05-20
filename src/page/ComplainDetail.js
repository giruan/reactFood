import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { Link } from "react-router-dom";

function ComplainDetail(){
  const [complainList, setComplainList] = useState([]);
  const { userId } = useParams();

  // 문의 내역 가져오기
  useEffect(()=>{
    const getComplain = async () => {
      try {
        const response = await fetch(`/complainDetail/users/${userId}`,{
          method : 'GET'
        })

        const data = await response.json();
        console.log('잘 되? : ',data)
        setComplainList(data.complainList)
      } catch (error) {
        console.log('Error complainList', error);
      }
    }
    getComplain();
  },[userId])
    




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
        <div className="userComplianitle">
          <h2>사용자 문의 목록</h2>
        </div>
      </div>
    </div>
  );
}

export default ComplainDetail;