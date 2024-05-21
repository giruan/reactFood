import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import '../styles/complainList.css'

function formatDate(dateString) {
  const date = new Date(dateString);
  return `${date.getFullYear()}/${String(date.getMonth() + 1).padStart(2, '0')}/${String(date.getDate()).padStart(2, '0')}`;
}

function ComplainList() {
  const [complains, setComplains] = useState([]);
  const { userId } = useParams();
  console.log(userId);

  useEffect(() => {
    const getComplains = async () => {
      try {
        const response = await fetch(`/complainList/users/${userId}`, {
          method: 'GET',
        });

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const data = await response.json();
        console.log('complainList Data', data);

        // Ensure data.complains is an array
        if (Array.isArray(data.complains)) {
          setComplains(data.complains);
        } else {
          console.error('data.complains is not an array:', data.complains);
          setComplains([]);
        }

      } catch (error) {
        console.log('Error complainList', error);
        setComplains([]);
      }
    };

    getComplains();
  }, [userId]);

  return (

    <main>
      <header>
       <div className="header_login">
         <Link to="/">
           <img src="/image/logo.PNG" alt="다이닝코드"></img>
          </Link>
        </div>
      </header>

      <section className="container-lg">
        <h1 className="complainListTitle">문의 내역</h1>
        <div className="complainListContent">
          <table className="complainTable">
            <thead>
              <tr>
                <th>제목</th>
                <th>접수번호</th>
                <th>작성일</th>
                <th>상태</th>
              </tr>
            </thead>
            <tbody>
              {complains.length > 0 ? (
                complains.map((complain, i) => (
                  <tr key={i}>
                    <td><Link to={`/complainDetail/users/${complain.complainId}`}>{complain.title}</Link></td>
                    <td>{complain.complainId}</td>
                    <td>{formatDate(complain.createdAt)}</td>
                    <td>{complain.status}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5">문의 내역이 없습니다.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>
    </main>
  );
}

export default ComplainList;
