import React, { useEffect, useState } from 'react'
import axios from "axios"

import { CgClose } from "react-icons/cg"
import { useDispatch, useSelector } from 'react-redux';

function CartSideBar({ cartProduct }) {

    const store = useSelector(store => store)
    const dispatch = useDispatch()
    const { userType, cart } = store  //destructuring
    const[userId, setUserId] = useState("")

    function getUser(){
        const user = JSON.parse(localStorage.getItem("simplishopuser"))
        setUserId(user._id)
    }
    useEffect(()=>{
        getUser()
    }, [])


    async function handleQty(e) {
        const key = e.target.dataset.qty
        let updatedProduct

        //handling quantity
        if(key==="increase"){
            updatedProduct = { ...cartProduct, qty: cartProduct.qty + 1 }
        }
        else if(key==="decrease" && cartProduct.qty>1){
            updatedProduct = { ...cartProduct, qty: cartProduct.qty - 1 }
        }
        else if(key==="decrease" && cartProduct.qty===1){
            return alert("cannot be less than 1")
        }

        // send to destination store based on userTYpe
        const index = cart.findIndex(prod => String(prod.productId) === String(cartProduct.productId))
        if(userType==="registered"){
            const res = await axios.put(`http://localhost:7000/api/cart/${cartProduct._id}`, updatedProduct)

            let d = store.cart
            d[index] = updatedProduct
            dispatch({ type: "UPDATE_CART", payload: d })
        }
        else if(userType==="unregistered"){

            let d = store.cart
            d[index] = updatedProduct
            dispatch({type:"UPDATE_CART", payload:d})

            const getLocalUser = JSON.parse(localStorage.getItem("simplishopcart"))
            getLocalUser[index] = updatedProduct
            localStorage.setItem("simplishopcart", JSON.stringify(getLocalUser))
        }
        else{
            alert("something went wrong")
        }
    }

    async function removeItemFromCart(){
        const productCartId = cartProduct._id

        if(userType==="registered"){
            const res = await axios.delete(`http://localhost:7000/api/cart/${productCartId}`)

            let d = store.cart
            d = d.filter(prod=> prod._id!==productCartId)
            dispatch({ type: "UPDATE_CART", payload: d })
        }
        else if(userType==="unregistered"){

        }
        
    }

    return (
        <div className="ssbci">
            <div className="ssbci_item_img_desc">
                <div className="ssbci_img">
                    <img src={cartProduct.imageUrl} alt="single item" />
                </div>

                <div className="ssbci_desc">
                    <p style={{ fontSize: "1rem", fontWeight: "500", marginBottom: ".4em", }}>
                        {cartProduct.name}
                    </p>
                    <p>£{cartProduct.price}</p>
                </div>
            </div>

            <div className="ssbci_qty">
                <span data-qty='increase' style={{ cursor: "pointer" }} onClick={handleQty}>
                    +
                </span>

                <span className='qtyInput'>{cartProduct.qty}</span>

                <span data-qty="decrease" style={{ cursor: "pointer" }} onClick={handleQty}>
                    -
                </span>
            </div>

            <span className="ssbci_remove_item" onClick={removeItemFromCart}>
                <CgClose />
                {/* <CgTrash style={{ fontSize: "1.2rem" }} /> */}
            </span>
        </div>
    )
}

export default CartSideBar