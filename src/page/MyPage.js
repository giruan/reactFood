import { useEffect, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import "../styles/myPage.css";

function MyPage(props) {
  const { name } = props;
  const { userId } = useParams();
  const [member, setMember] = useState({
    userId: "",
    name: "",
    birthNum: "",
    phone: "",
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
        .catch((err) => console.error("Error", err));
    }
  }, [userId]);

  // 컴포넌트 내부
  const profileImageRef = useRef(null);

  // 폼 제출을 처리하는 함수
  const handleSubmit = (e) => {
    e.preventDefault();

    if (member.name == "관리자") {
      alert("사용할 수 없는 이름입니다. 다시 입력해주세요.");
      return;
    }
    // formData 인스턴스 생성
    const formData = new FormData();

    // 기존 데이터 추가
    formData.append("data", JSON.stringify(member));
    formData.append("imgUrl", document.getElementById("imgUrl").files[0]);

    fetch(`/edit/${member.userId}`, {
      method: "PUT",
      body: formData,
    })
      .then((r) => r.text())
      .then((r) => {
        alert("회원 정보가 변경 되었습니다.");
        sessionStorage.setItem("name", member.name);
        window.location.href = "/";
      })
      .catch((error) => {
        console.error("Error:", error);
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
      document.getElementById("profileImage").src = previewUrl;
    }
  };

  // 회원 탈퇴 기능
  const handleDelete = (e) => {
    e.preventDefault();
    if (window.confirm("정말로 탈퇴하시겠습니까?")) {
      // 회원 탈퇴 로직을 구현하세요.
      fetch(`/delete/${member.userId}`, {
        method: "DELETE",
      })
        .then((response) => response.json())
        .then((data) => {
          if (data) {
            alert("정상적으로 탈퇴되었습니다.");
            window.location.href = "/login";
          } else {
            alert("회원 탈퇴에 실패했습니다.");
          }
        })
        .catch((error) => {
          console.error("Error:", error);
          alert("회원 탈퇴에 실패했습니다.");
        });
    }
  };

  return (
    <>
      <header className="">
        <div className="header_login">
          <Link to="/">
            <img src="/image/logo.PNG" alt="다이닝코드"></img>
          </Link>
        </div>
      </header>

      <section className="mySec">
        <div className="leftBar">
          {name === "관리자" ? (
            <>
              <ul>
                <li>
                  <Link to={`/zzimList/users/${member.userId}`}>찜목록</Link>
                </li>
                <li>
                  <Link to={`/myReview/${member.userId}`}>작성한 리뷰</Link>
                </li>
                <li>
                  <Link to={`/editPw/${member.userId}`}>비밀번호 변경</Link>
                </li>
                <li>
                  <Link to={`/complain/admin/${member.userId}`}>
                    사용자 문의사항
                  </Link>
                </li>
                <li className="deleteId">
                  <Link to="#" id="deleteId" onClick={handleDelete}>
                    회원탈퇴
                  </Link>
                </li>
              </ul>
            </>
          ) : (
            <>
              <ul>
                <li>
                  <Link to={`/zzimList/users/${member.userId}`}>찜목록</Link>
                </li>
                <li>
                  <Link to={`/myReview/${member.userId}`}>작성한 리뷰</Link>
                </li>
                <li>
                  <Link to={`/editPw/${member.userId}`}>비밀번호변경</Link>
                </li>
                <li>
                  <Link to={`/complain/users/${member.userId}`}>
                    1:1 문의 내역
                  </Link>
                </li>
                <li className="deleteId">
                  <Link to="#" id="deleteId" onClick={handleDelete}>
                    회원탈퇴
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
                <label
                  htmlFor="imgUrl"
                  style={{ cursor: "pointer" }}
                  className="find"
                >
                  사진변경
                </label>
                <input
                  id="imgUrl"
                  name="imgUrl"
                  type="file"
                  accept="image/*"
                  style={{ display: "none" }}
                  src={previewSrc}
                  onChange={handleImageChange}
                />
                {member.memImg ? (
                  <div className="person-circle">
                    <img
                      id="profileImage"
                      name="profileImage"
                      src={`/users/${member.memImg.imgUrl}`}
                      alt="이미지변경"
                    />
                  </div>
                ) : (
                  <div className="person-circle">
                    <img
                      id="profileImage"
                      name="profileImage"
                      src="/test/Pic.jpg"
                      alt="기본이미지"
                    />
                  </div>
                )}
              </div>
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
                        value={member.userId}
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
                        value={member.name}
                        onChange={handleInputChange}
                      />
                    </td>
                  </tr>
                  <tr className="tr-birth">
                    <th>생일</th>
                    <td>
                      <input
                        id="birthNum"
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
                        className="phone"
                        name="phone"
                        placeholder="phone"
                        value={member.phone}
                        onChange={handleInputChange}
                      />
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="edit-box">
              <button
                className="edit"
                data-id={member.userId}
                onClick={handleSubmit}
              >
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
