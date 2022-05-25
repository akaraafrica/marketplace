import React from 'react'
import './index.module.scss'

function SubscribeModal () {
    return(
        <div className='subscribemodalcon'>
                <div className="subscribemodalhead">
                    <h1>Be notified on new collections</h1>
                    <p>We recommended you to subscribe to our Akara newsletter, enter your email below to be notified when have new stuff</p>
                </div>
                <div className="subscribemodalinput">
                    <input type="email" placeholder='Enter your email address' />
                    <button>Subscribe now</button>
                </div>
        </div>
    );
}
export default SubscribeModal