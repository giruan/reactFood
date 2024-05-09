import { useState } from "react";
import { Link } from "react-router-dom";
import '../styles/findPassword.css'

function FindPassword(){

    // 상태 관리를 위한 useState 훅 사용
  const [method, setMethod] = useState('email'); // 'email' 또는 'phone'
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('010-0000-0000');
  const [isLoading, setIsLoading] = useState(false);


  // 이메일 정규식
  const validateEmail = (email) => {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }
  
  // 휴대폰 정규식 
  const validatePhone = (phone) => {
    const re = /^010-\d{4}-\d{4}$/;
    return re.test(String(phone));
  }

  // email 정규식 확인
  const [emailValidationMessage, setEmailValidationMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);

      fetch('/findEmail', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({userId : email}),
      })
      .then(response => {
        if (!response.ok) throw new Error('Network response was not ok');
        return response.json();
      })
      .then(data => {
        alert('비밀번호 재설정 링크가 이메일로 발송되었습니다.'); // 예: '비밀번호 재설정 링크가 이메일로 발송되었습니다.'
        window.location.href = '/login'
      })
      .catch(error => {
        console.error('Error:', error);
        alert('오류가 발생했습니다.');
      })
      .finally(() => setIsLoading(false));
    }


const handleEmailInputChange = (e) =>{
  const userIdValue = e.target.value;
    setEmail(userIdValue);
  fetch("/checkId", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ userId: userIdValue }),
  })
    .then((response) => response.json())
    .then((data) => {
      if (!validateEmail(userIdValue)) {
        setEmailValidationMessage("올바르지 않은 아이디 형식입니다.");
      } else if (data.exists) {
        setEmailValidationMessage("존재하는 이메일입니다.");
      } else if (!data.exists && validateEmail(userIdValue)) {
        setEmailValidationMessage("가입되지 않은 이메일입니다. 다시 입력해주세요");
      }
    })
    .catch((error) => {
      console.error("Error:", error);
      alert("서버 오류가 발생했습니다.");
    });
}






  return(
    <>
    <header>
        <div className="header_login">
          <Link to="/">
            <img src="/image/logo.PNG" alt="다이닝코드"></img>
          </Link>
        </div>
      </header>

      <main>
      <div className="container">
        <div className="content">
          <div className="title">
            <h2>비밀번호를 찾으시나요?</h2>
          </div>
          <div className="text">
            <p>YUM YARD 회원으로 인증이 완료된 휴대전화 혹은</p>
            <p>이메일로 비밀번호를 재설정 하실수 있습니다.</p>
          </div>
          <form onSubmit={handleSubmit} className="form-box">
            <div className="findEmail row justify-content-center">
              <div className="email-wrap">
                <div className="col-2 radiobtn">
                  <input 
                    type="radio" 
                    name="find" 
                    className="find" 
                    id="emailRadio"
                    checked={method === 'email'}
                    onChange={() => setMethod('email')}
                  />
                </div>
                <div className="col findMethod">
                  <label htmlFor="emailRadio" className="question">이메일로 찾기</label>
                </div>
              </div>
              {method === 'email' && (
                <div className="emailText-box find-box answer">
                  <p className="emailText">비밀번호 재설정 안내 이메일을 보내드리겠습니다.</p>
                  <div>
                    <input 
                      type="text" 
                      placeholder="이메일 입력" 
                      name="userId" 
                      id="userId"
                      onChange={handleEmailInputChange}
                    />
                  </div>
                  <div id="userIdValidation">{emailValidationMessage}</div>
                </div>
              )}
            </div>
            <div className="findPhone row justify-content-center">
              <div className="email-wrap">
                <div className="col-2 radiobtn">
                  <input 
                    type="radio" 
                    name="find" 
                    className="find" 
                    id="phoneRadio"
                    checked={method === 'phone'}
                    onChange={() => setMethod('phone')}
                  />
                </div>
                <div className="col findMethod">
                  <label htmlFor="phoneRadio" className="question">전화번호로 찾기</label>
                </div>
              </div>
              {method === 'phone' && (
                <div className="phoneText-box find-box answer">
                  <p className="phoneText">비밀번호 재설정 안내 문자를 보내드리겠습니다.</p>
                  <div>
                    <input 
                      type="text" 
                      placeholder="휴대전화번호" 
                      name="phone" 
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                    />
                  </div>
                </div>
              )}
            </div>
            <div className="btn-box">
              <button type="submit" className="btn btn-dark loginButton" disabled={isLoading}>{isLoading ? '처리 중...' : '발송'}</button>

            </div>
          </form>
        </div>
      </div>
    </main>
    </>
  )
}

export default FindPassword;