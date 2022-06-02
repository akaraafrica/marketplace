import React from 'react'
import styles from './index.module.scss'

interface Props {
    text: string;
}
const OnboardingButton: React.FC<Props> = ({text}) => {
  return (
    <button className={styles.button}>{text}</button>
  )
}

export default OnboardingButton