import React from 'react'
import { Link } from 'react-router-dom';

function LandingPage() {
  return (
    <div style={{ marginTop: "60px" }} className="landing_page">
      <div className="hero">
        <div className="hero_img_wrapper"></div>
        <div className="hero_text_wrapper">
          <Link to="/products" className='shop_now_btn'>Shop Now</Link>
        </div>
      </div>
    </div>
  );
}

export default LandingPage