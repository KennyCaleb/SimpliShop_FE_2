import React, { useState } from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import fullogo from "../images/logo.png"
import logoIcon from "../images/logoicon.png"

import { RiSearch2Line } from "react-icons/ri"
import { MdOutlineShoppingCart } from "react-icons/md"
import { HiUser } from "react-icons/hi"
import { AiFillCaretDown } from "react-icons/ai"
import { CgClose } from "react-icons/cg"
import CartSideBar from '../pages/CartSideBar'

function Nav() {

  const store = useSelector(store => store)
  const dispatch = useDispatch()

  const { userType, cart } = store
  const [searchQuery, setSearchQuery] = useState("")
  const [width, setWidth] = useState("0%")

  const navigate = useNavigate()

  function handleSearch(e) {
    const query = e.target.value
    dispatch({ type: "UPDATE_FILTERS", payload: { searchQuery: query } })
    setSearchQuery(query)
  }

  const handleRegister = () => {
    dispatch({ type: "UPDATE_REG_MODAL_STATE", payload: true })
  }
  const handleLogout = () => {

    // clear user in localStorage
    localStorage.removeItem("simplishopuser")

    // change user type to unregistered
    dispatch({ type: "UPDATE_USER_TYPE", payload: "unregistered" })

    // display signup modal
    dispatch({ type: "UPDATE_REG_MODAL_STATE", payload: false })

    // update store
    dispatch({ type: "UPDATE_CART" , payload:[]})

    //redirect to home page
    navigate("/")
  }

  const handleCheckoutBtn=()=>{
    setWidth("0%")
    navigate("/checkout")
  }

  return (
    <nav>
      <div className="simplishop_logo">
        <Link to="/"><img src={fullogo} alt="Simpli Shop Logo" className="full_logo" /></Link>
        <Link to="/"><img src={logoIcon} alt="Simpli Shop Logo" className="half_logo" /></Link>
      </div>

      <div className="search_bar_wrapper">
        <input type="text" value={searchQuery} onChange={handleSearch} />
        <span className="search_icon">
          <RiSearch2Line style={{ fontSize: "1.2rem" }} />
        </span>
      </div>

      <div className="cart_and_user_wrapper">
        <p className="cart_wrapper" onClick={() => { setWidth("100%") }}>
          <MdOutlineShoppingCart style={{ fontSize: "1.3rem" }} />
          <span className="cart_item_count">{cart.length}</span>
        </p>

        <div className="user_wrapper">
          <HiUser style={{ fontSize: "1rem" }} />
          <div className='drop_down_parent'>
            Account
            <AiFillCaretDown
              style={{ fontSize: "1rem", marginBottom: "-5px" }}
            />
            <ul className='drop_down_user'>
              {userType === "registered" && <li>Welcome back {localStorage.getItem("simplishopuser") && JSON.parse(localStorage.getItem("simplishopuser")).fullName.split(" ")[0]}</li>}
              {userType === "registered" && <li className='register' onClick={handleLogout}>Log Out</li>}

              {userType === "unregistered" && < li > Welcome to SimpliShop</li>}
              {userType === "unregistered" && <li className='register' onClick={handleRegister}>Register</li>}

            </ul>
          </div>
        </div>
      </div>

      {/* cart side bar */}
      <div className="cart_side_bar" style={{ width: width }}>
        <div className="cart_side_bar_header_section">
          <span style={{ fontSize: "1.05rem", fontWeight: "500"}}>
            Shopping Cart
          </span>

          <span className="close_cart_sidebar" style={{ cursor: "pointer" }} onClick={() => { setWidth("0%") }}>
            <CgClose />
          </span>
        </div>

        <div className="cart_side_bar_cart_items_sections">
          {
            cart.map((product, index) => {
              return (
                <div key={index}>
                  <CartSideBar cartProduct={product} />
                </div>

              )
            })
          }
        </div>

        <div className="cart_side_bar_bottom_element">
          <div className="subtotals">
            <span>Subtotal</span>
            <span>£{cart.reduce((subTotal, prod) => subTotal + (prod.price * prod.qty), 0)}</span>
          </div>

          <button onClick={handleCheckoutBtn}>CHECKOUT</button>
        </div>
      </div>

    </nav>
  );
}

export default Nav