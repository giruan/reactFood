import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import '../styles/myPage.css';
import { useAuth } from '../contexts/AuthContext';
import { FaHeart } from 'react-icons/fa';
import { MdOutlineRateReview } from 'react-icons/md';
import { RiLockPasswordLine } from 'react-icons/ri';
import { TbMessage2Question } from 'react-icons/tb';
import { FaListUl } from 'react-icons/fa';
import { ImExit } from 'react-icons/im';
import { MdAddBusiness } from 'react-icons/md';

function MyPage(props) {
  const { name } = props;
  const { user } = useAuth();
  const { userId } = useParams();
  const [member, setMember] = useState({
    userId: '',
    name: '',
    birthNum: '',
    phone: '',
  });
  const [previewSrc, setPreviewSrc] = useState(null);

  useEffect(() => {
    if (userId) {
      fetch(`/myPage/${userId}`)
        .then((response) => response.json())
        .then((data) => {
          setMember({
            ...data.member,
            memImg: data.memImg,
          });
          console.log(member.userId);
        })
        .catch((err) => console.error('Error', err));
    }
  }, [userId]);

  // 폼 제출을 처리하는 함수
  const handleSubmit = (e) => {
    e.preventDefault();

    // formData 인스턴스 생성
    const formData = new FormData();

    // 기존 데이터 추가
    formData.append('data', JSON.stringify(member));
    formData.append('imgUrl', document.getElementById('imgUrl').files[0]);

    fetch(`/edit/${member.userId}`, {
      method: 'PUT',
      body: formData,
    })
      .then((r) => r.text())
      .then((r) => {
        alert('회원 정보가 변경 되었습니다.');
        sessionStorage.setItem('name', member.name);
        window.location.href = '/';
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };

  //
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setMember((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // 이미지 미리보기를 위한 함수 수정
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // 파일로부터 URL 생성
      const previewUrl = URL.createObjectURL(file);
      setPreviewSrc(previewUrl);

      // 바로 생성된 URL 사용
      document.getElementById('profileImage').src = previewUrl;
    }
  };

  // 사진 기본이미지로 변경
  const handleDeleteImage = () => {
    setPreviewSrc(null);
    setMember((prevState) => ({
      ...prevState,
      memImg: null,
    }));
    document.getElementById('profileImage').src = '/test/Pic.jpg';
  };

  // 회원 탈퇴 기능
  const handleDelete = (e) => {
    e.preventDefault();
    if (window.confirm('정말로 탈퇴하시겠습니까?')) {
      // 회원 탈퇴 로직을 구현하세요.
      fetch(`/delete/${member.userId}`, {
        method: 'DELETE',
      })
        .then((response) => response.json())
        .then((data) => {
          if (data) {
            alert('정상적으로 탈퇴되었습니다.');
            window.location.href = '/login';
          } else {
            alert('회원 탈퇴에 실패했습니다.');
          }
        })
        .catch((error) => {
          console.error('Error:', error);
          alert('회원 탈퇴에 실패했습니다.');
        });
    }
  };

  // 핸드폰 번호 제한
  const handlePhoneChange = (e) => {
    let value = e.target.value.replace(/\D/g, ''); // 숫자가 아닌 모든 문자를 제거
    if (value.length > 11) {
      value = value.slice(0, 11); // 최대 11자리로 제한
    }

    let formattedValue = value;

    if (formattedValue.length > 3 && formattedValue.length <= 7) {
      formattedValue = value.replace(/(\d{3})(\d{1,4})/, '$1-$2');
    } else if (formattedValue.length > 7) {
      formattedValue = formattedValue.replace(/(\d{3})(\d{3,4})(\d{1,4})/, '$1-$2-$3');
    }

    setMember((prevState) => ({
      ...prevState,
      phone: formattedValue,
    }));
  };
  //

  return (
    <>
      <header className="">
        <div className="header_login">
          <Link to="/">
            <img src="/image/logo.PNG" alt="YUMYARD"></img>
          </Link>
        </div>
      </header>

      <section className="mySec">
        <div className="leftBar">
          {name === '관리자' ? (
            <>
              <ul className="SMN_effect-8">
                <h2 className="myInfo">내정보</h2>
                <hr />
                <li>
                  <Link to={`/zzimList/users/${member.userId}`} className="effect-link" data-hover="찜목록">
                    <span>
                      <FaHeart /> 찜목록
                    </span>
                  </Link>
                </li>
                <hr />
                <li>
                  <Link to={`/myReview/${member.userId}`} className="effect-link" data-hover="작성한 리뷰">
                    <span>
                      <MdOutlineRateReview /> 작성한 리뷰
                    </span>
                  </Link>
                </li>
                <hr />
                <li>
                  <Link to={`/editPw/${member.userId}`} className="effect-link" data-hover="비밀번호 변경">
                    <span>
                      <RiLockPasswordLine /> 비밀번호 변경
                    </span>
                  </Link>
                </li>
                <hr />
                <li>
                  <Link to={`/complainList/admin`} className="effect-link " data-hover="사용자 문의사항">
                    <span className="qestionList">
                      <FaListUl />
                      사용자 문의사항
                    </span>
                  </Link>
                </li>
                <hr />
                <li>
                  <Link to={`/add`} className="effect-link" data-hover="식당 추가">
                    <span className="shopAdd">
                      <MdAddBusiness />
                      식당 추가
                    </span>
                  </Link>
                </li>
                <hr />
                <li className="deleteId">
                  <Link to="#" id="deleteId" onClick={handleDelete} className="effect-link" data-hover="회원탈퇴">
                    <span>
                      <ImExit />
                      회원탈퇴
                    </span>
                  </Link>
                </li>
              </ul>
            </>
          ) : (
            <>
              <ul className="SMN_effect-8">
                <h2 className="myInfo">내정보</h2>
                <hr />
                <li>
                  <Link to={`/zzimList/users/${member.userId}`} className="effect-link" data-hover="찜목록">
                    <span>
                      <FaHeart /> 찜목록
                    </span>
                  </Link>
                </li>
                <hr />
                <li>
                  <Link to={`/myReview/${member.userId}`} className="effect-link" data-hover="작성한 리뷰">
                    <span>
                      <MdOutlineRateReview /> 작성한 리뷰
                    </span>
                  </Link>
                </li>
                <hr />
                <li>
                  <Link to={`/editPw/${member.userId}`} className="effect-link" data-hover="비밀번호 변경">
                    <span>
                      <RiLockPasswordLine /> 비밀번호 변경
                    </span>
                  </Link>
                </li>
                <hr />
                <li>
                  <Link
                    to={`/complainList/users/${member.userId}`}
                    className="effect-link qestionList"
                    data-hover="문의 내역"
                  >
                    <span>
                      <FaListUl />
                      문의 내역
                    </span>
                  </Link>
                </li>
                <hr />
                <li>
                  <Link to={`/complain/users/${member.userId}`} className="effect-link" data-hover="문의하기">
                    <span>
                      <TbMessage2Question /> 문의하기
                    </span>
                  </Link>
                </li>
                <hr />
                <li className="deleteId">
                  <Link to="#" id="deleteId" onClick={handleDelete} className="effect-link" data-hover="회원탈퇴">
                    <span>
                      <ImExit /> 회원탈퇴
                    </span>
                  </Link>
                </li>
              </ul>
            </>
          )}
        </div>
        <div className="rightBar">
          <form action="/edit" method="post" encType="multipart/form-data">
            <h2>내정보</h2>
            <div className="profile-img">
              <div className="img-edit">
                <label htmlFor="imgUrl" style={{ cursor: 'pointer' }}>
                  {member.memImg ? (
                    <div className="person-circle">
                      <img
                        id="profileImage"
                        name="profileImage"
                        src={`/users/${member.memImg.imgUrl}`}
                        alt="이미지변경"
                      />
                    </div>
                  ) : user ? (
                    <div className="person-circle">
                      <img
                        id="profileImage"
                        name="profileImage"
                        src={`${user.properties.profile_image}`}
                        alt="이미지변경"
                      />
                    </div>
                  ) : (
                    <div className="person-circle">
                      <img id="profileImage" name="profileImage" src="/test/Pic.jpg" alt="기본이미지" />
                    </div>
                  )}
                </label>
              </div>
              <div className="delBtn">
                <button type="button" onClick={handleDeleteImage}>
                  사진 삭제
                </button>
              </div>
              <input
                id="imgUrl"
                name="imgUrl"
                type="file"
                accept="image/*"
                style={{ display: 'none' }}
                onChange={handleImageChange}
              />
            </div>

            <div className="table">
              <table className="input-box">
                <tbody>
                  <tr className="tr-id">
                    <th>아이디</th>
                    <td>
                      <input
                        id="userId"
                        className="userId col"
                        name="userId"
                        value={user ? user.kakao_account.email : member.userId}
                        readOnly
                      />
                    </td>
                  </tr>
                  <tr className="tr-name">
                    <th>이름</th>
                    <td>
                      <input
                        id="name"
                        className="name"
                        name="name"
                        placeholder="name"
                        value={user ? user.properties.nickname : member.name}
                        onChange={handleInputChange}
                      />
                    </td>
                  </tr>
                  <tr className="tr-birth">
                    <th>생일</th>
                    <td>
                      <input
                        id="birthNum"
                        type="date"
                        className="birthNum"
                        name="birthNum"
                        placeholder="birthNum"
                        value={member.birthNum}
                        onChange={handleInputChange}
                      />
                    </td>
                  </tr>
                  <tr className="tr-num">
                    <th>휴대폰</th>
                    <td>
                      <input
                        id="phone"
                        type="text"
                        className="phone"
                        name="phone"
                        placeholder="phone"
                        value={member.phone}
                        onChange={handlePhoneChange}
                      />
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="edit-box">
              <button className="edit" data-id={member.userId} onClick={handleSubmit}>
                변경사항저장
              </button>
            </div>
          </form>
        </div>
      </section>
    </>
  );
}

export default MyPage;
