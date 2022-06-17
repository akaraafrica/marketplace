import React, {useState} from 'react'
import styles from './index.module.scss'
import OnboardingLayout from '../../components/OnboardingLayout'
import OnboardingInput from '../../components/OnboardingInput'
import OnboardingButton from '../../components/OnboardingButton'
import {FcGoogle} from 'react-icons/fc'
import {FaFacebook} from 'react-icons/fa'
import axios from 'axios'
import { useRouter } from 'next/router'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Index = () => {
    const [state, setState] = useState({email: '', password: ''})
    const router = useRouter()

    // create random strings for the wallet address
    const address = 'qwertyuiop'

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target
        setState(prevState => ({...prevState, [name]: value}))
    }


    const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
        console.log(state)
        const pattern = /[a-zA-Z0-9]+[\.]?([a-zA-Z0-9]+)?[\@][a-z]{3,9}[\.][a-z]{2,5}/g;
        const result = pattern.test(state.email);

        try {
          if(!state.email || !state.password) {
            return toast.error('Email or password field is empty')
          }
          if(!result) {
            return toast.error('Invalid email, check email and try again')
          }
          if(state.password.length < 6) {
            return toast.error('Password is too short, choose a more secured password')
          }


          const res = await axios.post('/api/signup', {
              address: address,
              email: state.email,
              password: state.password
          })

          if (res.status === 200) {
              toast.success('Welcome to Akara, Login to assess your account')
              router.push('/login')
          }
          console.log(res)

        } catch (error) {
            toast.error(error + '')
            console.log(error)
        }
        

    }
  return (
    <OnboardingLayout>
        <div className={styles.login}>
            <h6 className={styles.title}>Sign Up</h6>
            <p className={styles.text}>Sign up with your email and password</p>
            <div className={styles.inputs}>
                <OnboardingInput onChange={handleChange} label='Email' name='email' type='email' placeholder='sarah@gmail.com' />
                <OnboardingInput onChange={handleChange} label='Password' name='password' type='password' placeholder='***********' />
            </div>
            <OnboardingButton text='Sign up' onClick={handleSubmit} />
            {/* <span className={styles.forgot}>Forgot Password</span> */}
            <span className={styles.continue}>Or continue with</span>
            <div className={styles.socials}>
                <span>
                    <FcGoogle />
                </span>
                <span>
                    <FaFacebook color='#1877F2' />
                </span>
            </div>
            <p>Don’t have an account? <span className={styles.signup} onClick={() => router.push('/login')}> Log in</span></p>
        </div>
        <ToastContainer 
            position="top-center"
            autoClose={7000}
            hideProgressBar={true}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme='dark'
        />
    </OnboardingLayout>
  )
}

export default Index