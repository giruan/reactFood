import { useState } from "react";
import { Link } from "react-router-dom";
import '../styles/findPassword.css'
import Swal from 'sweetalert2';

function FindPassword(){

    // 상태 관리를 위한 useState 훅 사용
  const [method, setMethod] = useState('email'); // 'email' 또는 'phone'
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

// Id 중복 확인
const [isIdValidated, setIsIdValidated] = useState(false);


 // phone 중복확인
 const [phoneValidationMessage, setPhoneValidationMessage] = useState('');

  // phone 정규식
  const [isPhoneValidated, setIsPhoneValidated] = useState(false);

  // 이메일 정규식
  const validateEmail = (email) => {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }
  
  // email 정규식 확인
  const [emailValidationMessage, setEmailValidationMessage] = useState("");

  const handleSubmitEmail = (e) => {
    e.preventDefault();
    setIsLoading(true);
      if(isIdValidated){
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
          Swal.fire({
            position: "center",
            icon: "success",
            title: "성공!",
            text : "비밀번호 재설정 링크가 이메일로 발송되었습니다.",
            showConfirmButton: false,
            timer: 1500,
          }) 
          setTimeout(() => {
            window.location.href = '/login'
          }, 1500);
          
        })
        .catch(error => {
          console.error('Error:', error);
          alert('오류가 발생했습니다.');
        })
        .finally(() => setIsLoading(false));
      }
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
        setIsIdValidated(false)
      } else if (data.exists) {
        setEmailValidationMessage("이메일이 일치합니다.");
        setIsIdValidated(true)
      } else if (!data.exists && validateEmail(userIdValue)) {
        setEmailValidationMessage("가입되지 않은 이메일입니다. 다시 입력해주세요");
        setIsIdValidated(false)
      }
    })
    .catch((error) => {
      console.error("Error:", error);
      alert("서버 오류가 발생했습니다.");
    });
}

// 휴대폰 번호 제약조건
const handlePhoneChange = async (e) => {
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

  fetch('/checkPhone', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ phone: formattedValue }),
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.exists && phone.length == 12) { 
        setPhoneValidationMessage('전화번호가 일치합니다.')
        setIsPhoneValidated(true);
      } else if (!data.exists && phone.length == 12) {
        setPhoneValidationMessage('존재하지 않는 전화번호입니다.');
        setIsPhoneValidated(false);
      }
      else if(phone.length > 0){
        setPhoneValidationMessage('전화번호를 입력해주세요.')
        setIsPhoneValidated(false);
      } 
    })
    .catch((error) => {
      console.error('Error:', error);
      alert('서버 오류가 발생했습니다.');
    });
    setPhone(formattedValue);

};


// submit SMS 
const handleSubmitSMS = async (e) => {
  e.preventDefault()
  if(isPhoneValidated){
    setIsLoading(true);
     await fetch('/send-sms', {
      method: 'POST', // HTTP 요청 메소드 설정
      headers: {
        'Content-Type': 'application/json', // 요청의 Content-Type 헤더를 application/json으로 설정
      },
      body: JSON.stringify({ phone: phone }), // JavaScript 객체를 JSON 문자열로 변환
    })
    .then(response => {
      if (!response.ok) throw new Error('Network response was not ok');
      return response.json();
    })
    .then(data => {
      setMessage('SMS sent successfully');
      Swal.fire({
        position: "center",
        icon: "success",
        title: "성공!",
        text : "메세지가 전송되었습니다.",
        showConfirmButton: false,
        timer: 2000,
      }) 
      setTimeout(() => {
        window.location.href = '/login'
      }, 2000);
      
    })
    .catch(error => {
      Swal.fire({
        icon: "error",
        title: "오류 발생!",
        text: "오류가 발생했습니다.",
      });
    })
    .finally(() => setIsLoading(false));
  }
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
      <div className="container findPw">
        <div className="content">
          <div className="findPwTitle">
            <h2>비밀번호를 찾으시나요?</h2>
          </div>
          <div className="text">
            <p>YUM YARD 회원으로 인증이 완료된 휴대전화 혹은</p>
            <p>이메일로 비밀번호를 재설정 하실수 있습니다.</p>
          </div>
          <div className="form-box">
            <div className="findEmail row justify-content-center">
              <div className="email-wrap">
                <div className="col-1 radiobtn">
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
                  <div className="btn-box">
                  <button type="submit" className="btn btn-dark loginButton" disabled={isLoading} onClick={handleSubmitEmail}>{isLoading ? '처리 중...' : '발송'}</button>
                </div>
                  <div id="userIdValidation" className={emailValidationMessage === "이메일이 일치합니다." ? 'valid' : 'invalid'}>{emailValidationMessage}</div>
                </div>
              )}
            </div>
            <div className="findPhone row justify-content-center">
              <div className="email-wrap">
                <div className="col-1 radiobtn">
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
                      onChange={handlePhoneChange}
                    />
                  </div>
                  <div className="btn-box">
                  <button type="submit" className="btn btn-dark loginButton" onClick={handleSubmitSMS} disabled={isLoading}>{isLoading ? '처리 중...' : '발송'}</button>
                </div>
                <div
                id="phoneValidation"
                className={phoneValidationMessage === '전화번호가 일치합니다.'? 'valid' : 'invalid'}
              >
                {phoneValidationMessage}
              </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
    </>
  )
}

export default FindPassword;