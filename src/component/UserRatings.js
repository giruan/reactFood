import {  useState,useEffect } from "react";


function UserRatings({userId}){

  const [rating, setRating] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:9090/userRating/userId/${userId}`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setRating(data);
      } catch (error) {
        setError("유저 평점 갖고오기 error");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [userId]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }
  
  const averageRating = rating && rating.average_rating ? parseFloat(rating.average_rating).toFixed(1) : 'N/A';


  return(
    <>
      <div className="userInfo">
        <div className="userImg">
          <img src={ rating.imgUrl ? `/users/${rating.imgUrl}` : '/test/Pic.jpg' }> 
          </img>
        </div>
        <div className="userTxt">
          <p className="userName">
            <strong>{rating.userName} </strong>
          </p>
          <p>
            <span className="scoreInfo">
              <span className="averageRting">평균 별점</span> <span>{averageRating}&nbsp;</span>
              <span className="averageRting">평가 </span> {rating.rating_count}
            </span>
          </p>
        </div>
      </div>
    </>
  )
}

export default UserRatings;