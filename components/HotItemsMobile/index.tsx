import React from 'react'
import Slider from 'infinite-react-carousel';
import HotItemCard from "../HotItemsCard";

function HotItemsMobile () {
    const settings =  {
        arrows: false,
        arrowsBlock: false,
        shift: 10,
        slidesPerRow: 1,
        autoplay: true
      };
    return(
        <div className="hotitemsmobilecon">
            <Slider { ...settings }>
          <div>
        <HotItemCard
          ProductImg={`/assets/productimg.png`}
          Name="Amazing digital art"
          Price="2.45 ETH"
          Stock="3 in stock"
          Avatar={`/assets/avatars.png`}
          HighestBid="0.001 ETH"
        />
        </div>
        <div>
        <HotItemCard
          ProductImg={`/assets/productimg.png`}
          Name="Amazing digital art"
          Price="2.45 ETH"
          Stock="3 in stock"
          Avatar={`/assets/avatars.png`}
          HighestBid="0.001 ETH"
        />
        </div>
        <div>
        <HotItemCard
          ProductImg={`/assets/productimg.png`}
          Name="Amazing digital art"
          Price="2.45 ETH"
          Stock="3 in stock"
          Avatar={`/assets/avatars.png`}
          HighestBid="0.001 ETH"
        />
        </div>
        <div>
        <HotItemCard
          ProductImg={`/assets/productimg.png`}
          Name="Amazing digital art"
          Price="2.45 ETH"
          Stock="3 in stock"
          Avatar={`/assets/avatars.png`}
          HighestBid="0.001 ETH"
        />
        </div>
        <div>
        <HotItemCard
          ProductImg={`/assets/productimg.png`}
          Name="Amazing digital art"
          Price="2.45 ETH"
          Stock="3 in stock"
          Avatar={`/assets/avatars.png`}
          HighestBid="0.001 ETH"
        />
        </div>
        <div>
        <HotItemCard
          ProductImg={`/assets/productimg.png`}
          Name="Amazing digital art"
          Price="2.45 ETH"
          Stock="3 in stock"
          Avatar={`/assets/avatars.png`}
          HighestBid="0.001 ETH"
        />
        </div>
        <div>
        <HotItemCard
          ProductImg={`/assets/productimg.png`}
          Name="Amazing digital art"
          Price="2.45 ETH"
          Stock="3 in stock"
          Avatar={`/assets/avatars.png`}
          HighestBid="0.001 ETH"
        />
        </div>
        <div>
        <HotItemCard
          ProductImg={`/assets/productimg.png`}
          Name="Amazing digital art"
          Price="2.45 ETH"
          Stock="3 in stock"
          Avatar={`/assets/avatars.png`}
          HighestBid="0.001 ETH"
        />
        </div>
        <div>
        <HotItemCard
          ProductImg={`/assets/productimg.png`}
          Name="Amazing digital art"
          Price="2.45 ETH"
          Stock="3 in stock"
          Avatar={`/assets/avatars.png`}
          HighestBid="0.001 ETH"
        />
        </div>
        </Slider>
        </div>
    );
}
export default HotItemsMobile