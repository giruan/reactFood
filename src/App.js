import { Route, Router, Routes } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Main from './Main';
import './App.css';





function App() {
  const [mainData, setMainData] = useState([]); // message를 categories로 바꿈. 초기값도 배열로 설정
  useEffect(() => {
    fetch('/api/categories')
        .then(response => response.json())
        .then(data => {
          if(data){
            setMainData({
              categories: data.categories || [],
              userId: data.userId,
              name: data.name
            })
          }
        }).catch(error => console.error('Error:', error));
}, []);

  return (
    <div>
      <Main 
      categories = {mainData.categories} 
      userId  = {mainData.userId} 
      name = {mainData.name}
      ></Main>
    </div>
  );
}

export default App;
