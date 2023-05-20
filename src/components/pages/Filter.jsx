import React, { useState } from 'react'

import { AiOutlineStar } from "react-icons/ai"
import { useDispatch, useSelector } from 'react-redux'

function Filter() {

    const store = useSelector((store) => store)
    const dispatch = useDispatch()
    const [filters, setFilters] = useState(store.filters)
    const { displayOrder, minPrice, maxPrice, freeShipping, ratings } = store.filters


    function handleAscendDescend(e) {
        const selected = e.target.value
        let filtersClone = { ...filters }

        filtersClone = { ...filtersClone, displayOrder: selected }
        dispatch({ type: "UPDATE_FILTERS", payload: filtersClone })
        setFilters(filtersClone)
    }
    function handlePriceRange(e) {
        const name = e.target.name
        const value = e.target.value

        let filtersClone = store.filters
        filtersClone = { ...filtersClone, [name]: value }
        dispatch({ type: "UPDATE_FILTERS", payload: filtersClone })
        setFilters(filtersClone)
    }
    function handleFreeShipping() {
        let d = { ...store.filters }
        d = { ...d, freeShipping: !filters.freeShipping }
        setFilters(d)
        dispatch({ type: "UPDATE_FILTERS", payload: d })
    }
    function handleRatings(e){
        const ratingsValue = e.target.value
        let d = { ...store.filters }
        d = { ...d, ratings: ratingsValue }
        setFilters(d)
        dispatch({ type: "UPDATE_FILTERS", payload: d })

    }
    function clearFilter() {
        let reset = {
            displayOrder: "",
            minPrice: "",
            maxPrice: "",
            freeShipping: false,
            ratings: 0,
        }
        setFilters(reset)
        dispatch({ type: "UPDATE_FILTERS", payload: reset })
    }



    return (
        <div className='filter_container'>
            <p className='filter_header'>Filter by :</p>

            <form className='filter_form'>
                <label>
                    <input type='radio' name='ascend_descend' value='ascending' checked={displayOrder === "ascending"} onChange={handleAscendDescend} /> Ascending
                </label>

                <label>
                    <input type='radio' name='ascend_descend' value='descending' checked={displayOrder === "descending"} onChange={handleAscendDescend} /> Descending
                </label>

                <span className='price'>
                    Price:
                    <input type='number' name='minPrice' placeholder='min' value={minPrice} onChange={handlePriceRange} />
                    <input type='number' name='maxPrice' placeholder='max' value={maxPrice} onChange={handlePriceRange} />
                </span>

                <label>
                    <input type='checkbox' checked={filters.freeShipping} onChange={handleFreeShipping} /> Free Shipping
                </label>

                <p>
                    <span style={{ fontWeight: "500", marginRight: ".5em" }}>
                        Ratings :
                    </span>
                    {/* <AiOutlineStar style={{ cursor: "pointer" }} />
                    <AiOutlineStar style={{ cursor: "pointer" }} />
                    <AiOutlineStar style={{ cursor: "pointer" }} />
                    <AiOutlineStar style={{ cursor: "pointer" }} />
                    <AiOutlineStar style={{ cursor: "pointer" }} /> */}
                    <input type='number' min={0} max={5} value={ratings} onChange={handleRatings} style={{ textAlign: "center", height: "30px" }} />
                    <span style={{ marginLeft: ".5em" }}>& up</span>
                    
                </p>

                <button type='button' className='clear_filter_btn' onClick={clearFilter}>Clear Filters</button>
            </form>
        </div>
    )
}

export default Filter