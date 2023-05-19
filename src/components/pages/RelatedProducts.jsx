import React from 'react'
import { useNavigate } from 'react-router-dom'

function RelatedProducts({product}) {
    const {name, price, imageUrl, ratings} = product

    const navigate = useNavigate()


  return (
      <div className="single_product" onClick={() => { navigate(`/products/${product._id}`)}}>
          <div className="flex_image">
              <img src={imageUrl} alt="bestsellingproduct" />
          </div>

          <div className="nrp">
              <p className="product_name">{name}</p>
              <p className="ratings">Ratings : {ratings}</p>

              <p className="product_price">£{price}</p>
          </div>
      </div>
  )
}

export default RelatedProducts