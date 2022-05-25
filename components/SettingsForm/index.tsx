import React from "react";
import styles from "./index.module.scss";
import Switch from "@mui/material/Switch";

function SettingsForm() {
  const label = { inputProps: { "aria-label": "Switch demo" } };
  return (
    <div className={styles.settingformcon}>
      <div className={styles.settingform}>
        <div className={styles.settingformheading}>
          <h1>Settings</h1>
          <p>
            You can set preferred display name, create{" "}
            <span>your profile URL</span> and manage other personal settings.
          </p>
        </div>
        <div className={styles.settingformcontentparent}>
        <div className={styles.settingformcontentcon}>
          <div className={styles.settimgformsec1}>
            <div className={styles.settingformsec1profilecard}>
              <img src={`/assets/profilephoto.png`} />
              <div className={styles.settingformprofilecardtext}>
                <h4>Profile photo</h4>
                <p>
                  We recommend an image of at least 400x400.Gifs work too 🙌
                </p>
                <button>Upload</button>
              </div>
            </div>
            <div className={styles.itemsetting}>
              <h4>Item Settings</h4>
              <div className={styles.itemsettinginput}>
                <div className={styles.itemsettingforminput}>
                  <label>MIN OFFER</label>
                  <input type="text" placeholder='Minimum Offer"' />
                </div>
                <div className={styles.itemsettingforminput}>
                  <label>MAX OFFER</label>
                  <input type="text" placeholder='Maximum Offer"' />
                </div>
              </div>
            </div>
            <div className={styles.turnonnotification}>
              <div className={styles.turnonnotificationtext}>
                <h4>Turn on Notifications?</h4>
                <p>This will unmute all notifications</p>
              </div>
              <Switch {...label} />
            </div>
          </div>
          <div className={styles.settingformsec2}>
            <div className={styles.settingformsec1content1}>
              <h4>Account info</h4>
              <div className={styles.settingformsec2inputs}>
                <div className={styles.itemsettingforminputsec2}>
                  <label>DISPLAY NAME</label>
                  <input type="text" placeholder='Enter your display name"' />
                </div>
                <div className={styles.itemsettingforminputsec2}>
                  <label>Custom url</label>
                  <input type="text" placeholder='ui8.net/Your custom URL"' />
                </div>
                <div className={styles.itemsettingforminputsec2}>
                  <label>Bio</label>
                  <textarea placeholder='About yourselt in a few words"'></textarea>
                </div>
              </div>
            </div>
            <div className={styles.settingformsec1content2}>
              <h4>Social</h4>
              <div className={styles.itemsettingforminputsec2}>
                <label>portfolio or website</label>
                <input type="text" placeholder='Enter URL"' />
              </div>
              <div className={styles.itemsettingforminputsec2twitter}>
                <label>twitter</label>
                <div className={styles.inputcon}>
                  <input type="text" placeholder="@twitter username" />
                  <button>Verify account</button>
                </div>
              </div>
              <div className={styles.addsocialaccountbtn}>
                <button>
                  <span>
                    <img src={`/assets/plusicon.svg`} />
                  </span>
                  Add more social account
                </button>
              </div>
              <div className={styles.socialtext}>
                <p>
                  To update your settings you should sign message through your
                  wallet. Click 'Update profile' then sign the message
                </p>
              </div>
              <div className={styles.clearallsec}></div>
              <div className={styles.clearallsec}>
                <button>Update Profile</button>
                <div className={styles.clearsecone}>
                  <img src={`/assets/closeicon.svg`} />
                  <p>Clear all</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        </div>
      </div>
    </div>
  );
}
export default SettingsForm;
