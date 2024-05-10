import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';



function Category(props) {
  
  const { categories } = props;
  const navigate = useNavigate()
  const location = useLocation()


  const getRegionFromUrl = () =>{
    const searchParams = new URLSearchParams(location.search)
    return searchParams.get('region') || '' ;
  }

  const handleCategoryClick = (categoryName) =>{
    const region = getRegionFromUrl();
    let targetUrl = `/search?keyword=${categoryName}`
    if(region){
      targetUrl = `/search?region=${region}&keyword=${categoryName}`  
    }
    navigate(targetUrl);
  }

return(
  <section className="main container-lg">
        <div className="category">
          <h2 className="title">카테고리</h2>
        </div>
        
        <div className="category_box">
          <div className="row row-cols-5 restoraunt_list g-0">
            {/* 카테고리 리스트 영역 */}
            
            {categories.map((category, index) => (
              <div className="col" key={index} >
                <div className="pic">
                    <img src={`image/category/category${index}.jpg`} alt={category.categoryName} onClick={() => handleCategoryClick(category.categoryName)}/>
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
