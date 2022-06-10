/* eslint-disable @next/next/no-img-element */
// TODO: convert this to NextImage when given the chance
import React from "react";
import styles from "./index.module.scss";
import Header from "../../components/Header";
import HotItems from '../../components/HotItems/index'
import Footer from "../../components/Footer/index";

function ContactPage() {
 // document.body.style = "background: black;";
  return (
    <div className={styles.contactpagecon}>
      <div className={styles.contactpage}>
        <Header />
        <div className={styles.contactheadingcon}>
          <div className={styles.contactheading}>
            <h1>Contact The Akara Team</h1>
            <p>
              Thank you for your interest in Akara Marketplace. Please provide
              the following information, and we will respond.
            </p>
          </div>
        </div>
        <div className={styles.contactpagecontent}>
          <div className={styles.contentpagecontentsec1con}>
            <div className={styles.contentpagecontentsec1}>
              <div className={styles.contentpagecontentsec1input}>
                <label>First Name*</label>
                <input
                  style={{ width: "23vw" }}
                  type="text"
                  placeholder="Enter your first name"
                />
              </div>
              <div className={styles.contentpagecontentsec1input}>
                <label>Last Name*</label>
                <input
                  style={{ width: "23vw" }}
                  type="text"
                  placeholder="Enter your last name"
                />
              </div>
              <div className={styles.contentpagecontentsec1input}>
                <label>Email Address*</label>
                <input
                  style={{ width: "50vw" }}
                  type="text"
                  placeholder="Enter a valid email address"
                />
              </div>
              <div className="contentpagecontentsec1input">
                <label>Phone Number</label>
                <input
                  style={{ width: "23vw" }}
                  type="number"
                  placeholder="Enter phone number with country code"
                />
              </div>
              <div className={styles.contentpagecontentsec1input}>
                <label>Select Country*</label>
                <input
                  style={{ width: "23vw" }}
                  type="text"
                  placeholder="Select Country"
                />
              </div>
              <div className={styles.contentpagecontentsec1input}>
                <label>Message*</label>
                <textarea></textarea>
              </div>
            </div>
            <div className={styles.submitbtn}>
              <button>Submit</button>
            </div>
          </div>
          <div className={styles.contactpagecontentsec2}>
            <div className={styles.contactpagescontentsec2heading}>
              <h1>Contact Information</h1>
            </div>
            <div className={styles.contactpagecontentsec2informationcon}>
            <div className={styles.contactpagecontentsec2information}>
              <img alt="location icon" src={`/assets/locationIcon.svg`} />
              <p>
                3rd Floor, Suite 01, Nusaiba Tower Plot 117 Ahmadu Bello Way,
                Abuja, Nigeria
              </p>
            </div>
            </div>
            <div className={styles.contactpagecontentsec2informationcon}>
            <div className={styles.contactpagecontentsec2information}>
              <img alt="call icon" src={`/assets/callIcon.svg`} />
              <p>
              +2349084884444
              </p>
            </div>
            </div>
            <div className={styles.contactpagecontentsec2informationcon}>
            <div className={styles.contactpagecontentsec2information}>
              <img alt="mail icon" src={`/assets/mailIcon.svg`} />
              <p>
              info@akara.com
              </p>
            </div>
            </div>
          </div>
        </div>
      </div>
      <HotItems />
      <Footer />
    </div>
  );
}
export default ContactPage;
