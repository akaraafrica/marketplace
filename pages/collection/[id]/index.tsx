import NextImage from "../../../components/Image";
import React, { useContext, useState } from "react";
import { CollectionDs } from "../../../ds";
import styles from "./index.module.scss";
import { ICollection } from "../../../types/collection.interface";
import { GetServerSideProps } from "next";
import { IItem } from "../../../types/item.interface";
import { BiArrowBack } from "react-icons/bi";
import { AuthContext } from "../../../contexts/AuthContext";
import Link from "next/link";
import parse from "html-react-parser";
import dynamic from "next/dynamic";
const Layout: any = dynamic(() => import("../../../components/Layout"));
const DefaultAvatar: any = () => import("../../../components/DefaultAvatar");
const ItemGrid: any = dynamic(
  () => import("../../../components/CollectionAdmin/ItemGrid")
);
const Box: any = dynamic(() => import("@mui/material/Box"));

interface properties {
  collection: ICollection;
}
const Index = ({ collection }: properties) => {
  const total = collection.items.reduce(
    (total: number, item: { price: number }) => total + item.price,
    0
  );
  const [open, setOpen] = useState(1);
  const { user } = useContext(AuthContext);

  return (
    <Layout>
      <Box className={styles.container}>
        <div className={styles.breadcrumbWrap}>
          <div className={styles.backButton}>
            <Link href={`/`}>
              <BiArrowBack />
            </Link>
            <p className={styles.backText}>Back to collections</p>
          </div>
          {user?.id === collection.author.id && (
            <Link href={`/collection/${collection.id}/admin`}>
              <a>
                <span className={styles.currentCrumb}>Manage collection</span>
              </a>
            </Link>
          )}
        </div>
        <main>
          <div className={styles.heading}>
            <div className={styles.left}>
              <h2>{collection?.title}</h2>
              {collection?.lunchTime && (
                <div>Launches in {collection?.lunchTime}</div>
              )}
            </div>
          </div>
          <section className={styles.nav}>
            <span
              onClick={() => setOpen(1)}
              className={open === 1 ? styles.active : ""}
            >
              Items
            </span>

            <span
              onClick={() => setOpen(2)}
              className={open === 2 ? styles.active : ""}
            >
              Contributors
            </span>

            {collection.type === "FUNDRAISING" && (
              <span
                onClick={() => setOpen(4)}
                className={open === 4 ? styles.active : ""}
              >
                Beneficiary
              </span>
            )}
          </section>

          {open === 1 && (
            <div>
              <section className={styles.stats}>
                <div>
                  <span>{collection?.items?.length}</span>
                  <h3>Collection Items</h3>
                </div>
                <div>
                  <span>{total} ETH</span>
                  <h3>Total worth of Collection </h3>
                </div>
              </section>
              <section className="">
                <div className={styles.mainImg}>
                  <NextImage
                    className={styles.cardImg}
                    src={
                      collection?.images[0] || `/assets/placeholder-image.jpg`
                    }
                    width="1000px"
                    height="450px"
                    alt="product"
                  />
                </div>

                <div className={styles.bottomImg}>
                  <div>
                    {collection.images.slice(1).map((image, index) => (
                      <NextImage
                        className={styles.cardImg}
                        src={image || `/assets/placeholder-image.jpg`}
                        width="200px"
                        key={index}
                        height="150px"
                        alt="product"
                      />
                    ))}
                  </div>
                  <div>{user && parse(collection.description)}</div>
                </div>
              </section>
              <section>
                <div className={styles.bottom}>
                  <div>
                    <ItemGrid
                      collection={collection}
                      user={user!}
                      title="Collection Items"
                      view={true}
                    />
                  </div>
                </div>
              </section>
            </div>
          )}
          {open === 2 && (
            <div className={styles.section}>
              <div className={styles.sectionTop}>
                <div className={styles.btns}></div>
              </div>
              <div className={styles.content}>
                {collection?.contributors
                  ?.sort((a, b) => {
                    if (a.userId === user?.id) {
                      return -1;
                    } else {
                      return 1;
                    }
                  })
                  .map((contributor) => (
                    <div key={contributor.id} className={styles.row}>
                      <div className={styles.left}>
                        {contributor && (
                          <DefaultAvatar
                            url={contributor?.user?.profile?.avatar}
                            id={contributor.user.id}
                            width={"88px"}
                            height={"88px"}
                            walletAddress={contributor?.user.walletAddress}
                            fontSize={"8px"}
                          />
                        )}
                        <div className={styles.details}>
                          <div className={styles.dtop}>
                            <span className={styles.name}>
                              {contributor.user.email}
                            </span>
                            <span className={styles.number}>
                              {
                                collection.items?.filter((item) => {
                                  return item.ownerId === contributor.userId;
                                }).length
                              }{" "}
                              Item(s) in collection
                            </span>
                          </div>
                          <div className={styles.btnDiv}></div>
                        </div>
                      </div>
                      <div className={styles.center}>
                        <div className={styles.scroll}>
                          {collection.items
                            ?.filter(
                              (item) => item.ownerId === contributor.userId
                            )
                            .map((item: IItem, idx: number) => (
                              <div key={idx} className={styles.centerItem}>
                                <NextImage
                                  className={styles.image}
                                  src={item.images[0]}
                                  width="112px"
                                  height="88px"
                                />
                              </div>
                            ))}
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          )}
          {open === 3 && (
            <div className={styles.section}>
              <h2>Whitelist</h2>
            </div>
          )}
          {open === 4 && (
            <div className={styles.section}>
              <div className={styles.topB}>
                <div className={styles.sectionTop}></div>
              </div>
              <div className={styles.content}>
                {collection?.beneficiaries?.map((beneficiary) => (
                  <div key={beneficiary.id} className={styles.row}>
                    <div className={styles.left}>
                      <DefaultAvatar
                        url={""}
                        width={"88px"}
                        height={"88px"}
                        walletAddress={beneficiary.walletAddress}
                        fontSize={"8px"}
                      />
                      <div className={styles.details}>
                        <div className={styles.dtop}>
                          <span className={styles.name}>
                            {beneficiary.name}
                          </span>
                          <span className={styles.number}>Wallet address</span>
                        </div>
                        <div className={styles.btnDiv}>
                          <p>{beneficiary.walletAddress}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </main>
      </Box>
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { id }: any = ctx.params;
  let collection = await CollectionDs.getCollectionById(id);

  return {
    props: {
      collection: collection.data,
    },
  };
};

export default Index;
