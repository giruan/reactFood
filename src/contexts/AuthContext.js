import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // 로그인 상태 확인 및 사용자 정보 업데이트 로직을 여기에 추가
  useEffect(() => {
    // 페이지 로드 시 sessionStorage에서 사용자 정보를 읽어와서 상태를 초기화
    const storedEmail = sessionStorage.getItem('user.kakao_account.email');
    const storedNickname = sessionStorage.getItem('user.properties.nickname');
    const storedProfileImage = sessionStorage.getItem('user.properties.profile_image');
    const storedAccessToken = sessionStorage.getItem('user.access_token')
    if (storedEmail && storedNickname && storedProfileImage && storedAccessToken ) {
      console.log("Session storage values found");
      setUser({
        access_token : storedAccessToken,   
        kakao_account: {
          email: storedEmail,
        },
        properties: {
          nickname: storedNickname,
          profile_image : storedProfileImage
        },
      });
    }else {
      console.log("No valid session storage values found");
    }
  }, []);
 
  const login = (userData) => {
    // 로그인 성공 시 사용자 정보를 sessionStorage에 저장
    sessionStorage.setItem('user.kakao_account.email', userData.kakao_account.email);
    sessionStorage.setItem('user.properties.nickname', userData.properties.nickname);
    sessionStorage.setItem('user.properties.profile_image', userData.properties.profile_image);
    console.log(userData)
    // 상태 업데이트
    setUser(userData);
  };

  

  const token = (access_Token) => {
    sessionStorage.setItem('user.access_token', access_Token)
    console.log(access_Token)
    
    setUser((prevUser) => ({
      ...prevUser,
      access_token: access_Token,
    }));


  } 
  const logout = () => {
    // 로그아웃 시 sessionStorage에서 사용자 정보를 삭제
    sessionStorage.removeItem('user.kakao_account.email');
    sessionStorage.removeItem('user.properties.nickname');
    sessionStorage.removeItem('user.properties.profile_image');
    sessionStorage.removeItem('user.access_token');
    console.log("성공적으로 삭제됨.")
    // 상태 초기화
    setUser(null);
    // window.location.reload()
    
 
  };


  const value = {
    user,
    login,
    setUser,
    logout,
    token
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};