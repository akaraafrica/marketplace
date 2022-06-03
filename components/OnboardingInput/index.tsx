import React from 'react'
import styles from './index.module.scss'

interface Props {
    label: string;
    type: string;
    placeholder: string;
    name: string;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}
const OnboardingInput: React.FC<Props> = ({label, type, placeholder, name, onChange}) => {
  return (
    <div className={styles.input}>
        <label htmlFor={label}>{label}</label>
        <input type={type} placeholder={placeholder} name={name} onChange={onChange} />
    </div>
  )
}

export default OnboardingInput