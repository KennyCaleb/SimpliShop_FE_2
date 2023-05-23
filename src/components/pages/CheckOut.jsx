import React from 'react'
import OrderSummary from './OrderSummary'

function Cart() {
  return (
    <div className='checkout_container' style={{ marginTop: "60px" }}>
      <p className='checkout_header'>Billing details</p>
      <div className='checkout' >
        <div className='checkout_form_container'>
          <form className='checkout_form'>
            <label>
              Full Name
              <input type='text' />
            </label>

            <label>
              Email Address
              <input type='text' />
            </label>

            <label>
              Street Address
              <input type='text' />
            </label>

            <label>
              State
              <input type='text' />
            </label>

            <label>
              Country
              <input type='text' />
            </label>

            <label>
              Phone Number
              <input type='text' />
            </label>
          </form>
        </div>

        <OrderSummary />
      </div>
    </div>
  )
}

export default Cart