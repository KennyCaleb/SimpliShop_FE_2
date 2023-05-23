import React from 'react'

function OrderSummary() {
  return (
    <div className='order_summary_wrapper'>
        <p className='order_summary_header'>Order Summary</p>

        <p className='group'>Sub Total <span>$45</span></p>
        <p className='group'>Shipping Fee <span>$10</span></p>
        <div className='divider'></div>
        <p className='total'>Total <span>$55</span></p>

        <button className='place_order_btn'>Place Order</button>
        <p className='order_policy_text'>Upon clicking 'Place Order', I confirm I have read and<br/>acknowledged all terms and policies.</p>
    </div>
  )
}

export default OrderSummary