import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import axios from "axios"
import RelatedProducts from './RelatedProducts'

function SingleProductPage() {
    const { id } = useParams()
    const dispatch = useDispatch()
    const store = useSelector(store => store)
    const { products, userType, cart } = store
    const [singleProduct, setSingleProduct] = useState()
    const [imageUrl, setImageUrl] = useState("")
    const [purchaseQty, setPurchaseQty] = useState(1)
    const [itemInCart, setItemInCart] = useState("")

    const navigate = useNavigate()

    async function getProduct() {
        const res = await axios.get(`http://localhost:7000/api/products/${id}`)
        setSingleProduct(res.data.product)
        setImageUrl(res.data.product.imageUrl[0])
    }
    useEffect(() => {
        getProduct()
    }, [])

    function handleShowImg(e) {
        const newImgUrl = e.target.getAttribute("src")
        setImageUrl(newImgUrl)
    }

    function handleQtyChange(e) {
        const qtyChangeType = e.target.getAttribute("data-qty-btn")
        if (qtyChangeType === "increase") setPurchaseQty((prev) => prev + 1)
        else if (qtyChangeType === "decrease" && purchaseQty > 1) setPurchaseQty((prev) => prev - 1)
    }

    async function handleAddToCart() {
        const getProduct = products.find(prod => prod._id === id)
        const toCartItem = { ...getProduct, qty: purchaseQty, productId: getProduct._id }

        if (userType === "registered") {
            const userId = JSON.parse(localStorage.getItem("simplishopuser"))._id
            const res = await axios.post(`http://localhost:7000/api/cart/${userId}`, toCartItem)
            console.log(res)
        }
        else if (userType.toLowerCase() === "unregistered") {
            const getLocalCart = JSON.parse(localStorage.getItem("simplishopcart")) || []
            getLocalCart.push(toCartItem)
            localStorage.setItem("simplishopcart", JSON.stringify(getLocalCart))
        }
        dispatch({ type: "UPDATE_CART", payload:[...cart, toCartItem]})
        setItemInCart(toCartItem)
    }

    useEffect(() => {
        const inCart = cart.find(prod => prod.productId === id)
        setItemInCart(inCart)
    }, [cart])


    return (

        <div style={{ marginTop: "100px" }} className='single_product_page'>
            {/* single product */}
            <div className='single_product_container'>
                <div className='product_image_container'>
                    <div className='full_image_wrapper'>
                        {singleProduct && <img src={imageUrl} alt='image' />}
                    </div>

                    <div className='small_image_wrapper'>
                        {
                            singleProduct && singleProduct.imageUrl.map((imgUrl, index) => {
                                return (
                                    <img src={imgUrl} alt='image' style={{ cursor: "pointer" }} key={index} onClick={handleShowImg} />
                                )
                            })
                        }
                    </div>
                </div>

                {singleProduct &&
                    <div className='product_descr-container'>
                        <div>
                            <p className='product_name'>{singleProduct.name}</p>
                            <p className='product_prce'>{singleProduct.price}</p>
                            <p className='product_descr'>
                                <span style={{ marginLeft: "1em", fontSize: "1rem", fontWeight: "400" }}>
                                    {singleProduct.name}
                                </span>
                                {singleProduct.descr.slice(11, 200)}
                            </p>
                        </div>

                        <div>
                            { !itemInCart && <p className='spqty_wrapper'>
                                <span className='qty_modifier' data-qty-btn="increase" onClick={handleQtyChange}>+</span>
                                <span className='spqty'>{purchaseQty}</span>
                                <span className='qty_modifier' data-qty-btn="decrease" onClick={handleQtyChange}>-</span>
                            </p>
                            }
                            <div className='spbtn'>
                                {itemInCart && <button className="to_cart" onClick={() => navigate("/cart")}>View Cart</button>}
                                {!itemInCart && <button className="to_cart" onClick={handleAddToCart}>Add to Cart</button>}
                                <button className="buy_now ">Buy Now</button>
                            </div>
                        </div>

                    </div>
                }
            </div>

            {/* product  meta */}
            <div className='product_meta'>
                <p className='meta_category meta_property'> <span className='meat_value'></span></p>
            </div>

            {/* related product */}
            <div className='related_product products_section'>
                <h1 className='related_prod_header'>Related products</h1>

                <div className='related_product_grid products_catalogue'>
                    {
                        singleProduct && products.map((product, index) => {
                            if (product.category === singleProduct.category && product._id !== singleProduct._id) {
                                return (
                                    <div key={index}>
                                        <RelatedProducts product={product} />
                                    </div>
                                )
                            }
                        })
                    }
                </div>
            </div>
        </div>
    )
}

export default SingleProductPage