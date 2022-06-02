import React from 'react'
import styles from './index.module.scss'
import OnboardingLayout from '../../components/OnboardingLayout'
import OnboardingInput from '../../components/OnboardingInput'
import OnboardingButton from '../../components/OnboardingButton'
import {FcGoogle} from 'react-icons/fc'
import {FaFacebook} from 'react-icons/fa'

const Index = () => {

  return (
    <OnboardingLayout >
        <div className={styles.login}>
            <h6 className={styles.title}>Login</h6>
            <p className={styles.text}>Log in with your email address</p>
            <div className={styles.inputs}>
                <OnboardingInput label='Email' type='email' placeholder='sarah@gmail.com' />
                <OnboardingInput label='Password' type='password' placeholder='***********' />
            </div>
            <OnboardingButton text='Log in' />
            <span className={styles.forgot}>Forgot Password</span>
            <span className={styles.continue}>Or continue with</span>
            <div className={styles.socials}>
                <span>
                    <FcGoogle />
                </span>
                <span>
                    <FaFacebook color='#1877F2' />
                </span>
            </div>
            <p>Don’t have an account? <span className={styles.signup}> Sign up</span></p>
        </div>
    </OnboardingLayout>
  )
}

export default Index