import React from 'react'
import UpdateFromCreators from './index';
import styles from "./index.module.scss";


const data = [
    {
        name: "Payton Haris",
        value: "3.3",
        avatar: "/assets/Avator.svg",
        badgecontent: 5

    },
    {
        name: "Anita Bins",
        value: "2.5",
        avatar: "/assets/Avator.svg",
        badgecontent: 2

    },
    {
        name: "Jake Mende",
        value: "10.2",
        avatar: "/assets/avatar.png",
        badgecontent: 3

    },
    {
        name: "George Finish ",
        value: "2.32",
        avatar: "/assets/Logo.png",
        badgecontent: 7

    }
]
function UpdateFromCreatorsShow() {
    return (
        <div className={styles.show}>
            {
                data.map((item, i) => (
                    <div key={i} className={styles.show}>
                        <UpdateFromCreators badgecontent={item.badgecontent} name={item.name} value={item.value} avatar={item.avatar} />
                    </div>
                ))
            }
        </div>
    )
}

export default UpdateFromCreatorsShow