import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import axios from 'axios';
import '../styles/detail.css';
import DetailMain from '../component/DetailMain';
import DetailPhoto from '../component/DetailPhoto';
import DetailReview from '../component/DetailReview';

function Detail() {

const [data, setData] = useState(null);
const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { id } = useParams();

useEffect(() => {
  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`http://192.168.5.20:9090/detail/${id}`);
      setData(response.data);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  fetchData();
}, [id]);

if (loading) return <div>Loading...</div>;
if (error) return <div>Error! {error.message}</div>;
  
  
  return (
    <body>
      <main>
        <div className="content">
          <DetailMain restaurant={data.restaurant} reviews={data.reviews} userAvgRatings={data.userAvgRatings} />

          <DetailPhoto imgList={data.imgList} />

          <DetailReview reviews={data.reviews} userAvgRatings={data.userAvgRatings} />
        </div>
      </main>
    </body>
  );
}

export default Detail;
