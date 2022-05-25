import React from 'react'
import Slider from 'infinite-react-carousel';
import HotCollectionCard from '../HotCollectionsCard/index';

function HotCollectionMobile () {
    const settings =  {
        arrows: false,
        arrowsBlock: false,
        shift: 10,
        slidesPerRow: 1,
        autoplay: true
      };
    return(
        <div className="hotcollectionmobilecon">
            <Slider { ...settings }>
          <div>
        <HotCollectionCard />
        </div>
        <div>
        <HotCollectionCard />
        </div>
        <div>
        <HotCollectionCard />
        </div>
        <div>
        <HotCollectionCard />
        </div>
        <div>
        <HotCollectionCard />
        </div>
        <div>
        <HotCollectionCard />
        </div>
        <div>
        <HotCollectionCard />
        </div>
        <div>
        <HotCollectionCard />
        </div>
        <div>
        <HotCollectionCard />
        </div>
        </Slider>
        </div>
    );
}
export default HotCollectionMobile