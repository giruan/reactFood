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
    if (storedEmail && storedNickname && storedProfileImage) {
      setUser({
        kakao_account: {
          email: storedEmail,
        },
        properties: {
          nickname: storedNickname,
          profile_image : storedProfileImage
        },
      });
    }
  }, []);

  const login = (userData) => {
    // 로그인 성공 시 사용자 정보를 sessionStorage에 저장
    sessionStorage.setItem('user.kakao_account.email', userData.kakao_account.email);
    sessionStorage.setItem('user.properties.nickname', userData.properties.nickname);
    sessionStorage.setItem('user.properties.profile_image', userData.properties.profile_image);

    // 상태 업데이트
    setUser(userData);
  };

  const logout = () => {
    // 로그아웃 시 sessionStorage에서 사용자 정보를 삭제
    sessionStorage.removeItem('user.kakao_account.email');
    sessionStorage.removeItem('user.properties.nickname');
    sessionStorage.removeItem('user.properties.profile_image');
    
    // 상태 초기화
    setUser(null);
  };


  const value = {
    user,
    login,
    setUser,
    logout
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};