import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/detail.css';
import DetailMain from '../component/DetailMain';
import DetailPhoto from '../component/DetailPhoto';
import DetailReview from '../component/DetailReview';
import { Axios } from 'axios';

function Detail() {


  
  
  return (
    <body>
      <main>
        <div className="content">
          <DetailMain></DetailMain>

          <DetailPhoto></DetailPhoto>

         <DetailReview></DetailReview>
        </div>
      </main>
    </body>
  );
}

export default Detail;
