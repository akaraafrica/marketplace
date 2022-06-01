import React, {useState} from 'react'

function ForgotPassword() {
    const [email, setEmail] = useState('')
  return (
  <div>
    <input type='text' value={email} placeholder='Enter your email'/>
  <button onSubmit={(email)=> console.log(email)}> Submit </button>
  </div>
  )
}

export default ForgotPassword