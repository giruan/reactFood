import { useState } from "react";
import { Link } from "react-router-dom";

function FindPassword(){

// 상태 관리를 위한 useState 훅 사용
const [method, setMethod] = useState('email'); // 'email' 또는 'phone'
const [email, setEmail] = useState('');
const [phone, setPhone] = useState('010-0000-0000');

const handleSubmit = (e) => {
  e.preventDefault();
  // 폼 제출 로직 처리
  if (method === 'email') {
    console.log(`이메일로 비밀번호 재설정: ${email}`);
  } else {
    console.log(`전화번호로 비밀번호 재설정: ${phone}`);
  }
};


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
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
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
              <button type="submit" className="btn btn-dark loginButton">발송</button>
            </div>
          </form>
        </div>
      </div>
    </main>
    </>
  )
}

export default FindPassword;