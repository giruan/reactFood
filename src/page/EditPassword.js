import { useState } from "react";
import { Link, useNavigate } from "react-router-dom"
import { useParams } from
"react-router-dom";
import "../styles/pwEdit.css"

function EditPassword(){
  const passwordRegex = /^(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*()`])[a-z\d!@#$%^&*()`]{8,}$/;
  const [isCurrentPasswordCorrect, setIsCurrentPasswordCorrect] = useState(false);
  const [isCurrentRePasswordCorrect, setIsCurrentRePasswordCorrect] = useState(false);
  const [isCurrentNewPasswordCorrect, setIsCurrentNewPasswordCorrect] = useState(false);
  const navigate = useNavigate();
  const {userId} = useParams()

  const [password, setPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [rePassword, setRePassword] = useState('');
  const [passwordValidation, setPasswordValidation] = useState('');
  const [newPasswordValidation, setNewPasswordValidation] = useState('');
  const [rePasswordValidation, setRePasswordValidation] = useState('');

  const validateCurrentPassword = async (e) => {
    const pw = e.target.value
    setPassword(pw)
    try {
      const response = await fetch('/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username: userId, password: pw })
      });
      const data = await response.json();
      if (data.exists && data.passwordCorrect) {
        setPasswordValidation('현재 비밀번호가 일치합니다.');
        setIsCurrentPasswordCorrect(true);
      } else {
        setPasswordValidation('비밀번호가 일치하지 않습니다.');
        setIsCurrentPasswordCorrect(false);
      }
    } catch (error) {
      console.error('Error:', error);
      alert('서버 오류가 발생했습니다.');
    }
  };


  // 필요한 경우, 폼 제출 로직을 여기에 추가합니다.
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!isCurrentPasswordCorrect) {
      alert('현재 비밀번호가 올바르지 않습니다. 다시 입력해주세요.');
      return;
    }
    else if(!isCurrentNewPasswordCorrect){
      alert('비밀번호가 조건에 맞지 않습니다.')
      return;
    }
    else if(rePassword != newPassword ){
      alert('비밀번호가 맞지 않습니다.')
      return;
    }
    fetch(`/editPw/${userId}`, {
      method : 'PUT',
      headers: {
        "Content-Type": "application/json",
      },
      body : JSON.stringify({password : newPassword})
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('비밀번호 변경에 실패했습니다.');
      }
      return response.json();
    })
    .then((data) =>{
      Swal.fire({
        position: "center",
        icon: "success",
        title: "비밀번호 변경",
        text : "비밀번호가 정상적으로 변경 되었습니다.",
        showConfirmButton: false,
        timer: 2000,
      }) 
      setTimeout(() => {
        navigate('/');
      }, 2000);
      
    })
    .catch((error) => {
      Swal.fire({
        icon: "error",
        title: "비밀번호 변경 실패!",
        text: "비밀번호 변경에 실패하였습니다...",
      });
      console.error("Error:", error);
      
    });
  };

// 새로운 비밀번호 유효성 검사
  const handlePasswordChange = (e) => {
    const newPassword = e.target.value;
    setNewPassword(newPassword);

    if (passwordRegex.test(newPassword)) {
      setNewPasswordValidation("사용 가능한 비밀번호입니다.");
      setIsCurrentNewPasswordCorrect(true)
      // 여기서 추가적인 상태 변경이 필요하면 수행합니다.
    } else {
      setNewPasswordValidation("비밀번호는 최소 8자 이상이어야 하며, 숫자, 소문자, 특수문자를 포함해야 합니다.");
      setIsCurrentNewPasswordCorrect(false)

    }
  };

  // 새로운 비밀번호 재확인
  const handleRePasswordChange = (e) => {
    setRePassword(e.target.value);
    if (newPassword === e.target.value) {
      setRePasswordValidation("비밀번호가 일치합니다.");
    } else {
      setRePasswordValidation("비밀번호가 일치하지 않습니다.");
    }
  };

  return (
    <main className="editMain">
      
      <header>
        <div className="header_editPw">
          <Link to="/">
            <img src="/image/logo.PNG" alt="YumYard"></img>
          </Link>
        </div>
      </header>

        <div className="container editPage">
          <div className="editTitle">
            <h2>비밀번호 변경</h2>
          </div>
          <div className="content">
            <div className="text">
              <p>YUM YARD 회원으로 인증이 완료된 아이디의</p>
              <p> 비밀번호를 재설정 하실수 있습니다.</p>
            </div>
            <form onSubmit={handleSubmit} className="form-box">
              <div className="findEmail">
                {/* 아이디 (사용자가 볼 수 없음) */}
                <input type="hidden" name="userId" id="userId" value={userId} />

                {/* 현재 비밀번호 */}
                <div>
                  <input
                    type="password"
                    placeholder="현재 비밀번호 입력"
                    name="password"
                    id="password"
                    onChange={validateCurrentPassword}
                  />
                  <span
                    id="passwordValidation"
                    className={passwordValidation === '현재 비밀번호가 일치합니다.' ? 'valid' : 'invalid'}
                  >
                    {passwordValidation}
                  </span>
                </div>

                {/* 새로운 비밀번호 */}
                <div>
                  <input
                    type="password"
                    placeholder="새로운 비밀번호 입력"
                    name="newPassword"
                    id="newPassword"
                    onChange={handlePasswordChange}
                  />
                  <span
                    id="newPasswordValidation"
                    className={newPasswordValidation === '사용 가능한 비밀번호입니다.' ? 'valid' : 'invalid'}
                  >
                    {newPasswordValidation}
                  </span>
                </div>

                {/* 새로운 비밀번호 재확인 */}
                <div>
                  <input
                    type="password"
                    placeholder="새로운 비밀번호 재입력"
                    name="rePassword"
                    id="rePassword"
                    onChange={handleRePasswordChange}
                  />
                  <span
                    id="rePasswordValidation"
                    className={rePasswordValidation === '비밀번호가 일치합니다.' ? 'valid' : 'invalid'}
                  >
                    {rePasswordValidation}
                  </span>
                </div>
              </div>
              <div className="btn-box">
                <button type="submit" className="btn btn-dark loginButton">
                  변경
                </button>
              </div>
            </form>
          </div>
        </div>
      </main>
  );
}

export default EditPassword