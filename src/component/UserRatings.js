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
      <p className="personGrade">
        <span className="username">
          <strong>{rating.userId} </strong>
        </span>
        <span className="scoreInfo">
          작성한 리뷰 : 
          <span className="scoreCnt">
            {rating.rating_count}개, 평균 :
            {averageRating}점
          </span>
        </span>
      </p>
    </>
  )
}

export default UserRatings;