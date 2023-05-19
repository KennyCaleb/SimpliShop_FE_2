import React, { useState } from 'react'
import axios from "axios"

function SignIn() {
        const [userForm, setUserForm] = useState({
            email: "",
            password: ""
        })
        const {email, password} = userForm

    function handleInput(e) {
        const { name, value } = e.target
        setUserForm({ ...userForm, [name]: value })
    }

    async function handleSubmit(e) {
        e.preventDefault()

        // check for empty fields
        for (let key in userForm) {
            if (userForm[key] === "") {
                alert(`${key} is required`)
                return undefined
            }
        }

        const response = await axios.post("http://localhost:7000/api/users/login", { ...userForm, password: String(userForm.password) })
        alert(response.data.msg)
    }


  return (
      <form className='log_form sign_form' onSubmit={handleSubmit}>
          <input type='email' name='email' value={userForm.email} onChange={handleInput} placeholder='Email' />
          <input type='password' name='password' value={userForm.password} onChange={handleInput} placeholder='password' />
          <button disabled={!(email.length > 1 && password.length > 4)} style={{ cursor: (email.length > 1 && password.length > 4)?"pointer":"not-allowed"}} >Sign In</button>
      </form>
  )
}

export default SignIn