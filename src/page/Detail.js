import React, { useState, useEffect } from 'react';
import Header from '../component/Header';
import '../styles/detail.css';
import DetailMain from '../component/DetailMain';
import DetailPhoto from '../component/DetailPhoto';
import DetailReview from '../component/DetailReview';

function Detail() {
  return (
    <body>
      <Header />
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
