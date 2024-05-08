import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import '../styles/myPage.css'


function MyPage(){
  const {userId} = useParams()
  const [member, setMember] = useState({
    userId: '',
    name: '',
    birthNum: '',
    phone: '',
  });
  const [previewSrc, setPreviewSrc] = useState(null)

  useEffect(()=>{
    if(userId){
      fetch(`/myPage/${userId}`)
    .then(response => response.json())
    .then(data => {
      setMember({
        ...data.member,
        memImg: data.memImg
      })
      console.log(member.userId) 
    })
    .catch(err => console.error('Error', err))
   }
  },[userId])


// 폼 제출을 처리하는 함수
const handleSubmit = (e) => {
  e.preventDefault();
  
  // formData 인스턴스 생성
  const formData = new FormData();

  // 기존 데이터 추가
  formData.append('data', JSON.stringify(member))
  formData.append('imgUrl', document.getElementById('imgUrl').files[0]);
  


  fetch(`/edit/${member.userId}`, {
    method: "PUT",
    body: formData,
  })
    .then((r) => r.text())
    .then((r) => {
      alert('회원 정보가 변경 되었습니다.')
      window.location.href = "/";
    })
    .catch((error) => {
      console.error("Error:", error);
    });
};

// 
const handleInputChange = (e) => {
  const { name, value } = e.target;
  switch (name) {
    case "name":
      setMember({name : value});
      break;
    case "address":
      setMember({address : value});
      break;
    case "phone":
      setMember({phone : value});
      break;
    default:
      break;
  }
};

// const handleImageChange = (e) => {
//   const file = e.target.files[0];
//   if (file) {
//     const reader = new FileReader();

//     reader.onloadend = () => {
//       setPreviewSrc(reader.result);
//     };

//     reader.readAsDataURL(file);
//   }
// };


const handleImageChange = (e) => {
  const file = e.target.files[0];
  setPreviewSrc(URL.createObjectURL(file));
  
  // 이미지 미리보기 설정
  document.getElementById('profileImage').src = previewSrc;
};
  return(
    <>
      <header>
        <div className="header_login">
          <a href="/">
            <img src="/image/logo.PNG" alt="다이닝코드"></img>
          </a>
        </div>
    </header>

<section className="sec row d-flex justify-content-center">
      <div className="col-1 leftBar">
        <ul>
          <li><Link to={`/editPw/${member.userId}`}>비밀번호변경</Link></li>
          <li><Link to={`/myReview/${member.userId}`}>작성한 리뷰</Link></li>
          <li><Link to="#" id="deleteId">회원탈퇴</Link></li>
        </ul>
      </div>
      <div className="col-5 rightBar">
        <form action="/edit" method="post" encType="multipart/form-data">
          <h2>내정보</h2>
          <div className="profile-img">
            <div className="img-edit">
              <label htmlFor="imgUrl" style={{ cursor: 'pointer' }} className="find">사진변경</label>
              <input id="imgUrl" name="imgUrl" type="file" accept="image/*" style={{ display: 'none' }} src={previewSrc}  onChange={handleImageChange} />
            </div>
            {member.memImg ? (
              <div className="person-circle">
                <img id="profileImage" name="profileImage" src={`/users/${member.memImg.imgUrl}`} alt="이미지변경" />
              </div>
            ) : (
              <div className="person-circle">
                <img id="profileImage" name="profileImage" src="/test/Pic.jpg" alt="기본이미지" />
              </div>
            )}
          </div>
          <div className="table">
        <table className="input-box">
          <tbody>
            <tr className="tr-id">
              <th>아이디</th>
              <td>
                <input id="userId" className="userId col" name="userId" value={member.userId} readOnly/>
              </td>
            </tr>
            <tr className="tr-name">
              <th>이름</th>
              <td>
                <input id="name" className="name" name="name" placeholder="name" value={member.name} onChange={handleInputChange}  />
              </td>
            </tr>
            <tr className="tr-birth">
              <th>생일</th>
              <td>
                <input id="birthNum" className="birthNum" name="birthNum" placeholder="birthNum" value={member.birthNum} onChange={handleInputChange}  />
              </td>
            </tr>
            <tr className="tr-num">
              <th>휴대폰</th>
              <td>
                <input id="phone" className="phone" name="phone" placeholder="phone" value={member.phone} onChange={handleInputChange} />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="edit-box">
        <button className="edit" data-id={member.userId} onClick={handleSubmit}>변경사항저장</button>
      </div>
        </form> 
      </div>
    </section>



    </>
  )
}

export default MyPage;