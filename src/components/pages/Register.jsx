import React, {useState} from 'react'
import axios from "axios"
import { useDispatch, useSelector } from 'react-redux'

function Register() {

    const store = useSelector(store=>store)
    const dispatch = useDispatch()

    const [userForm, setUserForm] = useState({
        fullName: "",
        email: "",
        password: ""
    })
    const {fullName, email, password} = userForm

    function handleInput(e) {
        const { name, value } = e.target
        setUserForm({ ...userForm, [name]: value })
    }

    async function handleSubmit(e) {
        e.preventDefault()

        //form validations
        for (let key in userForm) {
            if (userForm[key] === "") {
                alert(`${key} is required`)
                return undefined
            }
        }
        if(userForm.password.length<=4 && userForm.password.length>0) alert("Password length too short, should be greater than 4.")

        else{
            const response = await axios.post("http://localhost:7000/api/users/register", {...userForm, password:String(userForm.password)})
            console.log(response)
            alert(response.data.msg)
            if (response.data.msg ==="User Successfully Created"){
                newUserEnvSetup(response.data.addUser)
            }
        }
        
    }

    async function newUserEnvSetup(newUser){

        // change user type
        dispatch({ type: "UPDATE_USER_TYPE", payload:"registered"})

        // export cart to remote DB, adding userId
        const getLocalCart = JSON.parse(localStorage.getItem("simplishopcart"))
        if(getLocalCart){
            await axios.post(`http://localhost:7000/api/cart/many/${newUser._id}`, getLocalCart)
        }

        // update cart in store ; deprecated.

        // save insensitive user details in localStorage
        const user = {
            fullName : newUser.fullName,
            email : newUser.email,
            _id : newUser._id
        }
        localStorage.setItem("simplishopuser", JSON.stringify(user))
        
        // clear previous cart collection in localStorage if any.
        localStorage.removeItem("simplishopcart")

        //display none modal after 1sec
        setTimeout(()=>{
            dispatch({ type: "UPDATE_REG_MODAL_STATE", payload:false })
        }, 500)

    }

  return (
      <form className='reg_form sign_form' onSubmit={handleSubmit}>
          <input type='text' name='fullName' value={userForm.fullName} onChange={handleInput} placeholder='Full Name....' />
          <input type='email' name='email' value={userForm.email} onChange={handleInput} placeholder='Email' />
          <input type='password' name='password' value={userForm.password} onChange={handleInput} placeholder='password' />
          <button disabled={!(fullName.length>1 && email.length>1 && password.length>4)} style={{cursor:(fullName.length>1&&email.length>1&&password.length>4)?"pointer":"not-allowed"}}>Register</button>
      </form>
  )
}

export default Register