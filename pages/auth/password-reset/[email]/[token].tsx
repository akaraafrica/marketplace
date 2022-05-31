import React,{useState} from 'react'
import {useRouter} from 'next/router'

function PasswordResset() {
    const [password, setPassword] = useState('')
    const [comfirmPassword, setComfirmPassword] = useState('')
    // const [email, setEmail] = useState<string | string[] | undefined>('')

    const {query} = useRouter()
    const email = query.email
    // setEmail(mail)
    
    const RessetPassword = async (event: { preventDefault: () => void; })=>{
      event.preventDefault();
      const res = await fetch('/api/password-reset', {
        body: JSON.stringify({
          password,
          email
        }),
        headers: {
          'Content-Type': 'application/json',
        },
        method: 'POST',
      });
    }
    
    
  return (
    <div>
        <input type='text' value={password} placeholder='Enter new password' onChange={(e) => setPassword(e.target.value)} />
        <input type='text' value={comfirmPassword} placeholder='Comfirm new password' onChange={(e) => setComfirmPassword(e.target.value)} />
    <button onSubmit={RessetPassword}> Reset Password</button>
    </div>
  )
}

export default PasswordResset