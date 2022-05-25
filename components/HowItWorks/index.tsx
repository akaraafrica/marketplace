import React from 'react'
import './index.module.scss'
import howitworksimg from '/assets/howitworksimg.png'

function HowitWorks () {
    return(
        <div className="howitworkscon">
            <h1 className="howitworksheading">How it works</h1>
            <div className="howitworksseccontent">
                <div className="howitworksseccontentsec1">
                    <img src={howitworksimg} />
                </div>
                <div className="howitworksseccontentsec2con">
                    <div className="howitworkseccontentsec2">
                        <h1>Set up your wallet</h1>
                        <p>Once you’ve set up your wallet of choice.</p>
                    </div>
                    <div className="howitworkseccontentsec2">
                        <h1>Make your collection</h1>
                        <p>Add social links, a description, profile & banner images adn name of your collection.</p>
                    </div>
                    <div className="howitworkseccontentsec2">
                        <h1>Add your NFTs </h1>
                        <p>Upload your artwork (image, 3D, videos) and customize with NFTs wit properties.</p>
                    </div>
                    <div className="howitworkseccontentsec2">
                        <h1>List for sale</h1>
                        <p>Choose between auctions, fixed-price listings, and declining-price listings.</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default HowitWorks