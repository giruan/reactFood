import React, {useState} from "react";
import '../styles/login.css'
import { useUser } from "../contexts/UserContext";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function Login(props){
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    if (!username && !password) {
      alert('아이디와 비밀번호를 입력해주세요.');
      return;
    } else if (username && !password) {
      alert('비밀번호를 입력해주세요.');
      return;
    } else if (!username && password) {
      alert('아이디를 입력해주세요.');
      return;
    }

    fetch('/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.exists && data.passwordCorrect) {
          props.onLoginSuccess(data.userId, data.name)
        
          alert(`로그인 되었습니다.${data.name}` );
          navigate('/')
        } else {
          alert('아이디 또는 비밀번호가 일치하지 않습니다.');
        }
      })
      .catch((error) => {
        console.error('Error', error);
        alert('서버 오류가 발생했습니다.');
      });
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
  

    <div className="container mainPage">
      <div className="title_login">
        <h2>로그인 및 회원가입</h2>
      </div>

      <div className="subtitle">
        <h2>로그인을 통해 YUM YARD 의 다양한 혜택을 누리세요.</h2>
      </div>

      <div className="loginForm loginBtn">
        <form className="form-box" onSubmit={handleLogin}>
          <input
            type="text"
            placeholder="휴대전화번호 또는 이메일 입력"
            id="username"
            name="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="password"
            placeholder="비밀번호 입력"
            name="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          

          <button type="submit" className="btn btn-dark loginButton" id="login">
            로그인
          </button>
        </form>
      </div>

      <div className="loginSet row ">
                <span className="col">
                    <input type="checkbox" className="btn-check" id="btncheck2" autocomplete="off"/>
                        <label className="btn btn-outline-primary" for="btncheck2">
                            <i className="bi bi-check-lg"></i>
                        </label>
                    로그인 상태 유지
                </span>
                <a className="col" href="/findPassword">비밀번호 찾기</a>
            </div>

            <div className="loginBtn">
                <div className="andLine row">
                    <div className="line col"></div>
                    <div className="and">또는</div>
                    <div className="line col"></div>
                </div>
                <button type="button" className="btn btn-warning loginButton">카카오톡으로 로그인</button>
            </div>

            <div className="join">
                <span className="upWord">아직 YUM YARD 회원이 아니신가요?</span>
                <br/>
                <span className="downWord">회원가입을 하시면 더 많은 정보와 혜택을 받으실수 있습니다</span>
                <a href="/join"><button type="button" className="btn btn-outline-secondary">회원가입</button></a>
            </div>
    </div>
    </>
  );
}
  
export default Login