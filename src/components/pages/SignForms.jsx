import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import SignIn from './SignIn'
import Register from './Register'

function Signup() {
    const dispatch = useDispatch()
    const { regModal } = useSelector(store => store)
    const [showLog, setShowLog] = useState(false)

    return (
        <div className='form' style={{ marginTop: "60px", display: regModal ? "" : "none" }}>
            <div className='form_container'>
                <p className='btn_close' onClick={() => dispatch({ type: "UPDATE_REG_MODAL_STATE", payload: false })}></p>
                <div className='reg_log_header'>
                    <span onClick={() => setShowLog(false)} style={{marginRight:"1.2em"}}>Sign Up</span>
                    <span onClick={()=>setShowLog(true)}>Sign In</span>
                </div>

                {!showLog && <Register/>}

                {showLog && <SignIn/>}

            </div>
        </div>
    )
}

export default Signup