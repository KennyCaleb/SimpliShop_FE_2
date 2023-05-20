import React, { useEffect, useState } from 'react'
import axios from "axios"
import Filter from './Filter'

import { AiFillCaretDown } from "react-icons/ai"
import ProductsCard from './ProductsCard'
import { useDispatch, useSelector } from 'react-redux'
import LandingPage from './LandingPage'

function ProductsPage() {

    const store = useSelector(store => store)
    const dispatch = useDispatch()

    const filters = store.filters
    const [productData, setProductData] = useState([])
    const [auxProductData, setAuxProductData] = useState([])
    const [categories, setCategory] = useState([])

    async function getProducts() {
        const response = await axios.get("http://localhost:7000/api/products")
        const data = response.data.getProducts
        setProductData(data)
        setAuxProductData(data)

        let cats = []
        data.map((product) => {
            if (!cats.includes(product.category)) {
                cats = [...cats, product.category.toLowerCase()]
            }
        })
        setCategory(cats)
    }
    useEffect(() => {
        getProducts()
    }, [])



    function filterProduct() {

        const { displayOrder, minPrice, maxPrice, freeShipping, ratings } = filters

        const filteredProducts = productData
            .filter(product => {
                if (filters.searchQuery === "") {
                    return product
                }
                else {
                    console.log(filters.searchQuery.toLowerCase())
                    return product.name.toLowerCase().includes(filters.searchQuery.toLowerCase())
                }
            })
            .filter((product) => {
                if (filters.category === "all") {
                    return product
                }
                else {
                    return product.category.toLowerCase() === filters.category.toLowerCase()
                }
            })
            .filter((product) => {
                if (minPrice === "" && maxPrice === "") {
                    return product
                }
                else if (filters.minPrice === "") {
                    return product.price >= 0 && product.price <= filters.maxPrice;
                } else if (filters.maxPrice === "") {
                    return product.price >= filters.minPrice && product.price <= 1000;
                }
                return (
                    product.price >= filters.minPrice &&
                    product.price <= filters.maxPrice
                );
            })
            .filter((product) => {
                if (freeShipping) {
                    return product.shippingFee === 0
                }
                else {
                    return product
                }
            })
            .sort((a, b) => {
                if (displayOrder === "ascending") {
                    if (Number(a.price) < Number(b.price)) {
                        return -1;
                    }
                } else if (displayOrder === "descending") {
                    if (Number(a.price) > Number(b.price)) {
                        return -1;
                    }
                }
                //else arrange the product as they come(this is by default).
            })
            .filter((product) => product.ratings >= ratings)

        setAuxProductData(filteredProducts)
    }
    useEffect(() => {
        filterProduct()
    }, [filters])

    function handleCategory(e) {
        if (e.target.tagName === "LI") {
            dispatch({ type: "UPDATE_FILTERS", payload: { category: e.target.dataset.cat } })
        }
    }


    return (

        <div style={{ marginTop: "60px" }} className='products_page'>
            <Filter />

            <div className='products_section'>
                <div className='catalogue_header'>
                    <h1>Shop</h1>
                    <div className="drop_down_category" style={{ minWidth: "150px" }}>
                        <AiFillCaretDown style={{ marginBottom: "-2px" }} /> {filters.category.slice(0, 1).toUpperCase() + filters.category.slice(1)}
                        <ul onClick={handleCategory}>
                            <li data-cat="all" style={{ paddingTop: "1em" }}>All</li>
                            {
                                categories.map((cat, index) => {
                                    return (
                                        <li data-cat={cat} key={index}>{cat.slice(0, 1).toUpperCase() + cat.slice(1).toLowerCase()}</li>
                                    )
                                })
                            }
                        </ul>
                    </div>
                </div>

                <div className='products_catalogue'>

                    {auxProductData.length === 0 && <h1 style={{ textAlign: "center" }}>No Match Found</h1>}

                    {
                        auxProductData.map((product, index) => {
                            return (
                                <div key={index}>
                                    <ProductsCard product={product} />
                                </div>
                            )
                        })
                    }

                </div>
            </div>
        </div>
    )
}

export default ProductsPage