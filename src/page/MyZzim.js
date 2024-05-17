import { useState, useEffect } from "react";
import MyZzimPage from "../component/MyZzimPage";
import { useParams } from "react-router-dom";
import '../styles/myZzim.css'


function MyZzim(){
  const [myFavorites, setMyFavorites ] = useState([]);
  const [restaurantName, setRestaurantName] = useState([]);
  const [restaurantImg, setRestaurantImg] = useState([0]);
  const {userId} = useParams();
  console.log(userId)
  useEffect(() => {
    const getMyZzims = async () => {
      try {
        const response = await fetch(`/zzimList/users/${userId}`, {
          method: 'GET',
        });
        
        const data = await response.json(); // 데이터를 기다림
        console.log('Data from server:', data);
        setMyFavorites(data.myFavorites);
        setRestaurantName(data.restaurantName);
        setRestaurantImg(data.restaurantImg);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    getMyZzims(); // useEffect에서 데이터 가져오는 함수 호출
  }, [userId]);

  return(
    <main>
      <section className="container-lg z-c">
        <div className="zzim">
          <h1 className="zzimTitle">관심목록</h1>
          <div className="zzimContent">
            <MyZzimPage myFavorites={myFavorites} restaurantName={restaurantName} restaurantImg={restaurantImg}></MyZzimPage> 
          </div>
        </div>
      </section>
    </main>
  )
}

export default MyZzim;