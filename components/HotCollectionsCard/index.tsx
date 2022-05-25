import React from 'react'
import './index.module.scss'
import avatar from '/assets/Avator.svg'

function HotCollectionCard () {
    return(
        <div className='hotcollectioncardcon'>
            <div className='hotcollectionseccon'>
                <div className='hotcollectionsec1'>
                </div>
                <div className='hotcollectionsec2con'>
                    <div className="hotcollectionsec2"></div>
                    <div className="hotcollectionsec2"></div>
                    <div className="hotcollectionsec2"></div>
                </div>
                <div className='hotcollectionsec3con'>
                    <h2>Awesome collection</h2>
                    <div className='hotcollectionsec3contentcon'>
                        <div className='artist'>
                            <img src={avatar} />
                            <p>By Tyrese Littel</p>
                        </div>
                        <div className='quantity'>
                            <p>28 items</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default HotCollectionCard