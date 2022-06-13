/* eslint-disable @next/next/no-img-element */
// TODO: convert this to NextImage when given the chance
import React from "react";
import styles from "./index.module.scss";
import Header from "../../components/Header";
import Gallery from "../../components/Gallery/index";
import Collections from "../../components/Collections/index";
import Favourites from "../../components/Favourites/index";
import Following from "../../components/Following/index";
import Footer from "../../components/Footer/index";

const ProfilePage = () => {
  const [open, setOpen] = React.useState(0);
  // document.body.style = "background: black;";
  return (
    <div>
      <Header />
      <div className={styles.profilepagesec1con}>
        <div className={styles.profilepagesec1}>
          <button>
            Edit profile
            <span>
              <img alt="edit icon" src={`/assets/editicon.svg`} />
            </span>
          </button>
        </div>
      </div>
      <div className={styles.profilepagesec2parent}>
        <div className={styles.profilepagesec2con}>
          <div className={styles.profilepagecard}>
            <div className={styles.profilecardimg}>
              <img alt="profile photo" src={`/assets/profilephoto.png`} />
            </div>
            <div className={styles.profilecardname}>
              <h4>Sarah Shaibu</h4>
              <div className={styles.profileid}>
                <p>0xc4c16a645...b21a</p>
                <img alt="" src={`/assets/copyicon.svg`} />
              </div>
            </div>
            <div className={styles.profilecarddesc}>
              <p>
                A wholesome farm owner in Abuja. Upcoming gallery solo show in
                Lagos
              </p>
            </div>
            <div className={styles.profilecardwebsitelink}>
              <img alt="" src={`/assets/webicon.svg`} />
              <p>https://ui8.net</p>
            </div>
            <div className={styles.profilecardbtns}>
              <button className={styles.followbtn}>Follow</button>
              <button className={styles.iconbtn}>
                <span>
                  <img alt="" src={`/assets/upload.svg`} />
                </span>
              </button>
              <button className={styles.iconbtn}>
                <span>
                  <img alt="" src={`/assets/dots.svg`} />
                </span>
              </button>
            </div>
            <div className={styles.profilecardsocialicons}>
              <img alt="" src={`/assets/twittericonone.svg`} />
              <img alt="" src={`/assets/instagramiconone.svg`} />
              <img alt="" src={`/assets/facebookiconone.svg`} />
            </div>
            <div className={styles.profilecarddivider}></div>
            <div className={styles.membersince}>
              <p>Member since Mar 15, 2021</p>
            </div>
          </div>
          <div className={styles.profilepagesec2headparent}>
            <div className={styles.profilepagesec2con}>
              <div className={styles.profilepagesec2head}>
                <div className={styles.headlinks}>
                  <ul>
                    <li
                      className={open === 0 ? styles.active : styles.tablink}
                      onClick={() => setOpen(0)}
                    >
                      Gallery
                    </li>
                    <li
                      className={open === 1 ? styles.active : styles.tablink}
                      onClick={() => setOpen(1)}
                    >
                      Collections
                    </li>
                    <li
                      className={open === 2 ? styles.active : styles.tablink}
                      onClick={() => setOpen(2)}
                    >
                      Favourites
                    </li>
                    <li
                      className={open === 3 ? styles.active : styles.tablink}
                      onClick={() => setOpen(3)}
                    >
                      Following
                    </li>
                  </ul>
                </div>
                <div className={styles.uploaditembtn}>
                  <button>Upload Item</button>
                </div>
              </div>
            </div>
            {open === 1 && <Collections />}
            {open === 2 && <Favourites />}
            {open === 0 && <Gallery />}
            {open === 3 && <Following />}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};
export default ProfilePage;
