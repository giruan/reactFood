import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

function Category(props) {
  const { categories } = props;

  // 메인 홈페이지 카테고리 불러오는 훅

return(
  <section className="main container-lg">
        <div className="category">
          <h2 className="title">카테고리</h2>
        </div>
        
        <div className="category_box">
          <div className="row row-cols-5 restoraunt_list g-0">
            {/* 카테고리 리스트 영역 */}
            {categories.map((category, index) => (
              <div className="col" key={index}>
                <div className="pic">
                  <Link to={`/search?keyword=${category.categoryName}`}>
                    <img src={`image/category/category${index}.jpg`} alt={category.categoryName} />
                  </Link>
                </div>
                <p className="restoraunt_title">{category.categoryName}</p>
              </div>
          ))}
        </div>
      </div>
    </section>
  );
}
export default Category;
