import React from 'react'
import styles from './index.module.scss'
import DiscoverSelect from '../DiscoverSelect/index'
import CloseIcon from '/assets/crossicon.svg'
import ProgressBar from '../ProgressBar/index'
import AllItems from '../AllItems/index'
import Art from '../Art/index'
import Game from '../Game/index'
import Photography from '../Photography/index'
import Music from '../Music/index'
import Video from '../Video/index'

function Discover () {
    const [open,setOpen] = React.useState(0)
    return(
        <div className="discovercon">
           <div className='discover'>
               <div className="discoverheading">
                   <h1>Discover</h1>
               </div>
               <div className="discoversec1parent">
               <div className="discoversec1con">
                   <DiscoverSelect PlaceHolder="Recently added" />
                   <div className="discoversec1links">
                       <span className={open === 0 ? 'dactive' : 'dtablink'} onClick={() => setOpen(0)}>All items</span>
                       <span className={open === 1 ? 'dactive' : 'dtablink'} onClick={() => setOpen(1)}>Art</span>
                       <span className={open === 2 ? 'dactive' : 'dtablink'} onClick={() => setOpen(2)}>Game</span>
                       <span className={open === 3 ? 'dactive' : 'dtablink'} onClick={() => setOpen(3)}>Photography</span>
                       <span className={open === 4 ? 'dactive' : 'dtablink'} onClick={() => setOpen(4)}>Music</span>
                       <span className={open === 5 ? 'dactive' : 'dtablink'} onClick={() => setOpen(5)}>Video</span>
                   </div>
                   <div className="Filterbtn">
                       <button>Filter <span><img src={CloseIcon} /></span></button>
                   </div>
               </div>
               </div>
               <div className="discoverdividerwrapper">
               <div className="discoverdivider"></div>
               </div>
               <div  className="discoversec2parent">
               <div className="discoversec2con">
                   <div className="discoversec2select">
                       <label className='selectlabeldiscover'>Price</label>
                       <DiscoverSelect PlaceHolder="Highest price" />
                   </div>
                   <div className="discoversec2select">
                       <label className='selectlabeldiscover'>likes</label>
                       <DiscoverSelect PlaceHolder="Most liked" />
                   </div>
                   <div className="discoversec2select">
                       <label className='selectlabeldiscover'>Creator</label>
                       <DiscoverSelect PlaceHolder="Verified only" />
                   </div>
                   <div>
                       <ProgressBar />
                   </div>
               </div>
               </div>
               <div className='discoverlinkcontent'>
               {open === 0  && <AllItems />}
               {open === 1  && <Art />}
               {open === 2  && <Game />}
               {open === 3  && <Photography />}
               {open === 4  && <Music />}
               {open === 5  && <Video />}
               </div>
           </div>
        </div>
    )
}
export default Discover