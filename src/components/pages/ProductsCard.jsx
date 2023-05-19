import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import axios from "axios"
import { Link } from 'react-router-dom'

function ProductsCard({product}) {

    const store = useSelector((store) => store)
    const dispatch = useDispatch()

    const [addToCartTxt, setAddToCartTxt] = useState("Add to cart")
    const { _id, name, price, category, descr, imageUrl,shippingFee, ratings } = product
    
    const userType = store.userType

    function isItemIncart(){
        const inCart = store.cart.find(prdt=> prdt.productId=== String(product._id))
        if(inCart){
            setAddToCartTxt("In Cart")
        }
        else{
            addToCartTxt!=="Add to cart" && setAddToCartTxt("Add to cart")
        }
    }
    useEffect(()=>{
        isItemIncart()
    }, [product])

    async function handleAddTocart(){
        const addProduct = {
            productId : String(_id),
            name,
            price,
            category,
            descr,
            imageUrl,
            shippingFee,
            ratings
        }

      if(userType.toLowerCase() === "unregistered"){
          const getLocalCart = JSON.parse(localStorage.getItem("simplishopcart")) || []
          const productIncart = getLocalCart.find(prdt=> prdt.productId===String(product._id)) //checck if product in cart
          if(productIncart){ //if product in cart
            alert("product in cart")
          }
          else{             // product not in cart
            getLocalCart.push({...addProduct, qty:1})
            localStorage.setItem("simplishopcart", JSON.stringify(getLocalCart))
            setAddToCartTxt("Item Added")
            const cart = store.cart
            cart.push({ ...addProduct, qty: 1})
            dispatch({type:"UPDATE_CART", payload:cart})
          }
      }


      else if(userType.toLowerCase()==="registered"){
          const getUser = JSON.parse(localStorage.getItem("simplishopuser"))
          const userId = getUser._id
          const response = await axios.get(`http://localhost:7000/api/cart/${userId}`)
          let getUserCart = response.data.getUserCart
          
          const productInCart = getUserCart.find(prdt=>String(prdt.productId)===String(product._id))
          if(productInCart){
            alert("Product already in cart")
          }
          else{
            await axios.post(`http://localhost:7000/api/cart/${userId}`, {...addProduct, qty:1})
            const cart = store.cart
            cart.push({ ...addProduct, qty: 1, userId })
            dispatch({type:"UPDATE_CART", payload:cart})
            setAddToCartTxt("Item Added")
          }
      }
    }
    
    return (
        <div className="single_product">
            <div className="over_lay">
                <Link to={`/products/${product._id}`} className="view">View</Link>
                <button className="to_cart" onClick={handleAddTocart}>{addToCartTxt}</button>
            </div>

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

export default ProductsCard