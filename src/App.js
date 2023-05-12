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
  }

  useEffect(()=>{
    initialSetup()
  }, [])

  return (
    <BrowserRouter>
      <Provider store={store}>
        <div className="simplishop_app">
          <Nav />
          <Routes>
            <Route path="/" element={<LandingPage />} /> 
            <Route path="products" element={<ProductsPage />} />
          </Routes>
          <Footer/>
        </div>
      </Provider>
    </BrowserRouter>
  );
}

export default App