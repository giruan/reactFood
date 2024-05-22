import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

function KakaoLogin(){
  const { login, logout } = useAuth();
 
  const navigate = useNavigate();

  const Rest_api_key='3ce68a4b4fe0845cf10e27373e9d893f' //REST API KEY
  const redirect_uri = 'http://localhost:3000/auth' //Redirect URI
  // oauth 요청 URL
  const kakaoURL = `https://kauth.kakao.com/oauth/authorize?client_id=${Rest_api_key}&redirect_uri=${redirect_uri}&response_type=code`
  
const handleKakaoLogin = ()=>{
    window.location.href = kakaoURL
}
useEffect(() => {
  const code = new URL(window.location.href).searchParams.get('code');
  if (code) {
    // 로그인 후 백엔드에서 사용자 정보를 받아옴
    fetch(`http://localhost:3000/auth?code=${code}`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data); // 사용자 정보를 처리
        
        navigate('/')
      })
      .catch((error) => console.error('Error:', error));
  }
}, []);


const handleLogout = () => {

  if(user && user.kakao_account)
  fetch('http://localhost:3000/kakaoLogout', { 
    method: 'POST' ,
    headers : {
      'Content-Type' : 'application/json'
    },
    body : JSON.stringify({acc})
  
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data); // 로그아웃 결과 처리
      logout()
      
    })
    .catch((error) => console.error('Error:', error));
};
return (

  <>
    <button onClick={handleKakaoLogin}>카카오 로그인</button>
  </>
)




}

export default KakaoLogin;