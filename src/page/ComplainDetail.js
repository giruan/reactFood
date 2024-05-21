import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import '../styles/complainDetail.css'


function formatDate(dateString) {
  
  const date = new Date(dateString);
  return `${date.getFullYear()}/${String(date.getMonth() + 1).padStart(2, '0')}/${String(date.getDate()).padStart(2, '0')}`;
}

function ComplainDetail(){
  const {complainId} = useParams();
  console.log(complainId)
  const [complainList, setComplainList] = useState([]);
  const [responseContent, setResponseContent] = useState([]);
  
 
  // 문의 내역 가져오기
  useEffect(()=>{
    const getComplain = async () => {
      try {
        const response = await fetch(`/complainDetail/users/${complainId}`,{
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
  },[complainId])
    
  const [views, setViews] = useState()


  useEffect(() => {
    if (complainList && complainList.views !== undefined) {
      setViews(complainList.views); // complainList가 업데이트 될 때마다 views 상태를 설정합니다.
    }
  }, [complainList]);


  console.log(views)



async function updateViews(complainId, newViews) {
  try {
    const response = await fetch(`/complainDetail/views/${complainId}`, {
      method: 'PUT', // 또는 'PUT'
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ views: newViews }),
    });

    if (!response.ok) {
      throw new Error('서버에서 views를 업데이트하는 데 실패했습니다.');
    }

    const updatedData = await response.json();
    console.log('업데이트 성공:', updatedData);
  } catch (error) {
    console.error('views 업데이트 에러:', error);
  }
}


useEffect(() => {
  // responseContent가 존재하고, 처리 완료 상태일 때만 views를 증가시키고 서버에 업데이트합니다.
  if (responseContent && responseContent.content && complainList.status === "처리 완료") {
    setViews((preViews) => {
      const newViews = preViews + 1;
      updateViews(complainId, newViews); // 서버에 views를 업데이트하는 함수 호출
      return newViews;
    });
  }
}, [responseContent, complainList.status, complainId]);





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

          {responseContent && responseContent.content ? (
           
            <tr>
            <th>답변</th>
            <td colSpan={4}>{responseContent.content}</td>
          </tr>
          ):
          <tr>
            <th>답변</th>
            <td colSpan={4}>답변 대기중입니다...</td>
          </tr>
          }
          
        </tbody>
      </table>

      
    </div>
    </div>
  );
}

export default ComplainDetail;