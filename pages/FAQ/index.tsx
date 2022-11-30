/* eslint-disable @next/next/no-img-element */

import Link from "next/link";
import React from "react";
import Footer from "../../components/global/Footer";
import Header from "../../components/global/Header";
import styles from "./index.module.scss";

const FAQ = (props: any) => {
  return (
    <div>
      <Header />
      <main className={styles.container}>
        <section className={styles.FAQHeading}>
          <h4>learn how to get started</h4>
          <h1>Frequently asked questions</h1>
          <p>
            Join Akara community now to get free updates and also alot of
            freebies are waiting for you or{" "}
            <Link href="/contact">
              <span>Contant Support</span>
            </Link>
          </p>
        </section>
        <section className={styles.secondSection}>
          <ul>
            <li className={styles.active}>
              <img src="/assets/general.svg" alt="general" />
              General
            </li>
            <li>
              <img src="/assets/support.svg" alt="support" /> Support
            </li>
            <li>
              <img src="/assets/hosting.svg" alt="hosting" />
              Hosting
            </li>
          </ul>
          <div className={styles.FAQ}>
            <details>
              <summary>How does it work</summary>
              <p>
                The Stacks series of products: Stacks: Landing Page Kit, Stacks:
                Portfolio Kit, Stacks: eCommerce Kit. &quot;Stacks is a
                production-ready library of stackable content blocks built in
                React Native. Mix-and-match dozens of responsive elements to
                quickly configure your favorite landing page layouts or hit the
                ground running with 10 pre-built templates, all in light or dark
                mode.&quot;
              </p>
              <button>Learn more</button>
            </details>
            <details>
              <summary>How to start with Akara</summary>
              <p>
                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Maxime
                eveniet eum dolore quibusdam culpa libero voluptate porro beatae
                architecto rerum vero enim blanditiis placeat, earum quaerat
                commodi minus tempore veritatis.
              </p>
            </details>
            <details>
              <summary>Does it support Dark Mode</summary>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Possimus suscipit, provident ipsam molestias fugiat at, soluta
                quidem quos, debitis obcaecati sequi. Facere suscipit in ullam
                aliquam voluptates placeat mollitia consequatur?
              </p>
            </details>
            <details>
              <summary>Does it support Auto-Layout</summary>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugit
                fuga corrupti dolore? Tenetur possimus labore quasi dolores
                cupiditate doloribus iusto accusantium ab! Perspiciatis quasi
                impedit quis eaque, dolorem asperiores explicabo.
              </p>
            </details>
            <details>
              <summary>What is Akara Design System</summary>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugit
                fuga corrupti dolore? Tenetur possimus labore quasi dolores
                cupiditate doloribus iusto accusantium ab! Perspiciatis quasi
                impedit quis eaque, dolorem asperiores explicabo.
              </p>
            </details>
          </div>
        </section>
      </main>

      <div className={styles.footercon}>
        <Footer />
      </div>
    </div>
  );
};

export default FAQ;
