import React, { useEffect } from 'react'
import {BrowserRouter, Routes, Route} from "react-router-dom"
import LandingPage from './components/pages/LandingPage';
import Nav from './components/inc/Nav';

// customs styles
import "./components/styles/styles.css"
import ProductsPage from './components/pages/ProductsPage';

import {createStore} from 'redux'
import ShopReducer from "./components/reducers/ShopReducer";
import {Provider} from "react-redux"
import Footer from './components/inc/Footer';
import axios from 'axios';
import SingleProductPage from './components/pages/SingleProductPage';
import CheckOut from './components/pages/CheckOut';
import SignForms from './components/pages/SignForms';
import ProtectedRoute from './components/ProtectedRoute';


function App() {

  const store = createStore(ShopReducer)

  const initialSetup=async()=>{
    const getUser = JSON.parse(localStorage.getItem("simplishopuser"))
    getUser?
    store.dispatch({ type: "UPDATE_USER_TYPE", payload:"registered"}):
    store.dispatch({ type: "UPDATE_USER_TYPE", payload: "unregistered" });

    let cart = []
    if(getUser){
      const response = await axios.get(`http://localhost:7000/api/cart/${getUser._id}`)
      cart = response.data.getUserCart
    }
    else{
      cart = JSON.parse(localStorage.getItem("simplishopcart")) || []
    }
    store.dispatch({ type: "UPDATE_CART", payload: cart });

    //get all products to store
    const res = await axios("http://localhost:7000/api/products")
    store.dispatch({ type: "RENDER_STORE_PRODUCTS", payload: res.data.getProducts });
  }

  useEffect(()=>{
    initialSetup()
  }, [])

  return (
    <BrowserRouter>
      <Provider store={store}>
        <div className="simplishop_app">
          <Nav />
          <SignForms/>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="products" element={<ProductsPage />} />
            <Route path="products/:id" element={<SingleProductPage />} />
            <Route path="checkout" element={ <ProtectedRoute><CheckOut/></ProtectedRoute>} />
          </Routes>
          <Footer />
        </div>
      </Provider>
    </BrowserRouter>
  );
}

export default App