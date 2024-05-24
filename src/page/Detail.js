import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import axios from 'axios';
import '../styles/detail.css';

import DetailMain from '../component/DetailMain';
import DetailPhoto from '../component/DetailPhoto';
import DetailReview from '../component/DetailReview';

function Detail(props) {

const {userId, name} = props;
console.log(name)
const [data, setData] = useState(null);
const [loading, setLoading] = useState(true);
const [error, setError] = useState(null);
const { id } = useParams();

useEffect(() => {
  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`http://localhost:9090/detail/${id}`);
      const filteredImgList = response.data.imgList.filter(img => img.userId === null && img.reviewId === null);
      const filteredreviewImgList = response.data.imgList.filter(img => img.userId && img.reviewId);
      setData({ ...response.data, filteredImgList, filteredreviewImgList});
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
    
      <main className="main">
        <div className="content">
          <DetailMain restaurant={data.restaurant} reviews={data.reviews} filteredImgList={data.filteredImgList} restaurantId={id} userId={userId} name={name}/>

          <DetailPhoto
            restaurant={data.restaurant}
            imgList={data.imgList}
            filteredreviewImgList={data.filteredreviewImgList}
          />

          <DetailReview
            reviews={data.reviews}
            filteredreviewImgList={data.filteredreviewImgList}
          />
        </div>
      </main>
    
  );
}

export default Detail;
