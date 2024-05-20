import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { Link } from "react-router-dom";
import '../styles/complainDetail.css'

function formatDate(dateString) {
  const date = new Date(dateString);
  return `${date.getFullYear()}/${String(date.getMonth() + 1).padStart(2, '0')}/${String(date.getDate()).padStart(2, '0')}`;
}

function ComplainDetail(){
  const [complainList, setComplainList] = useState([]);
  const [responseContent, setResponseContent] = useState([]);
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
        setResponseContent(data.responseContent)
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
      <table className="complainTable">
        <tbody>
          <tr>
            <th>등록일</th>
            <td>{formatDate(complainList.createdAt)}</td>
            <th>상태</th>
            <td>{complainList.status}</td>
          </tr>
          <tr>
            <th>제목</th>
            <td colSpan={4}>{complainList.title}</td>
          </tr>
          <tr>
            <th>내용</th>
            <td colSpan={4}>{complainList.content}</td>
          </tr>
          <tr>
            <th>답변</th>
            <td colSpan={4}>{responseContent.content}</td>
          </tr>
        </tbody>
      </table>
    </div>
    </div>
  );
}

export default ComplainDetail;