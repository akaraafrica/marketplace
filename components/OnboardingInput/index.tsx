import React from 'react'
import styles from './index.module.scss'

interface Props {
    label: string;
    type: string;
    placeholder: string;

}
const OnboardingInput: React.FC<Props> = ({label, type, placeholder}) => {
  return (
    <div className={styles.input}>
        <label htmlFor={label}>{label}</label>
        <input type={type} placeholder={placeholder} />
    </div>
  )
}

export default OnboardingInput