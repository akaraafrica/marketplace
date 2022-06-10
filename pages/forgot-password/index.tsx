import React from 'react'
import styles from './index.module.scss'
import OnboardingLayout from '../../components/OnboardingLayout'
import OnboardingInput from '../../components/OnboardingInput'
import OnboardingButton from '../../components/OnboardingButton'

const Index = () => {
  return (
    <OnboardingLayout >
        <div className={styles.forgot}>
            <h6 className={styles.title}>Forgot Password</h6>
            <p>Type your correct email address to get your password reset link</p>
            <div className={styles.action}>
                <OnboardingInput label='Email' name='email' type='email' placeholder='example@gmail.com' onChange={()=> console.log("email changed")}  />
                <OnboardingButton text='Reset Password' onClick={()=> console.log("reset password clicked")} />
            </div>
        </div>
    </OnboardingLayout>
  )
}

export default Index