import React from 'react'
import { MdOutlineShoppingCart } from 'react-icons/md';
import bannerImg from "../images/trending-product.png"
import { Link } from 'react-router-dom';

function LandingPage() {
  return (
    <div style={{ marginTop: "60px" }} className="landing_page">
      <div className="hero_section">
        <div className="hero_img">
          <img src={bannerImg} alt="sweat-jacket" />
        </div>

        <div className="hero_text">
          <p className="banner_title">Best Quality Products</p>
          <p className="banner_desc">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit
            tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo.
          </p>

          <Link to="/products" className="banner_btn">
            <MdOutlineShoppingCart /> Shop Now
          </Link>
        </div>
      </div>

    </div>
  );
}

export default LandingPage