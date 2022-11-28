import NextImage from "../../../components/global/Image";
import React, { useContext, useEffect, useState } from "react";
import { CollectionDs } from "../../../ds";
import styles from "./index.module.scss";
import { ICollection } from "../../../types/collection.interface";
import { GetServerSideProps } from "next";
import { IItem } from "../../../types/item.interface";
import { AuthContext } from "../../../contexts/AuthContext";
import parse from "html-react-parser";
import dynamic from "next/dynamic";
import Link from "next/link";
import Plyr from "plyr-react";
const Layout: any = dynamic(() => import("../../../components/Layout"));
// const DefaultAvatar: any = () => import("../../../components/DefaultAvatar");
import DefaultAvatar from "../../../components/global/DefaultAvatar";
const ItemGrid: any = dynamic(
  () => import("../../../components/CollectionAdmin/ItemGrid")
);
const Box: any = dynamic(() => import("@mui/material/Box"));

interface properties {
  collection: ICollection;
}
const Index = ({ collection }: properties) => {
  const total = collection?.items?.reduce(
    (total: number, item: { price: number }) => total + item?.price,
    0
  );
  const [open, setOpen] = useState(1);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    // @ts-ignore
    const element = document.querySelector("#videoSec video");
    if (element) {
      element.setAttribute("poster", collection?.images[0]);
    }
  });
  console.log(collection);

  return (
    <Layout>
      <Box className={styles.container}>
        <main>
          <div className={styles.heading}>
            <h2>{collection?.title}</h2>
            {user?.id === collection?.author?.id && (
              <div className={styles.breadcrumbWrap}>
                <Link href={`/collection/${collection?.id}/admin`}>
                  <a>
                    <span className={styles.currentCrumb}>
                      Manage collection
                    </span>
                  </a>
                </Link>
              </div>
            )}
          </div>
          <section className={styles.nav}>
            <span
              onClick={() => setOpen(1)}
              className={open === 1 ? styles.active : ""}
            >
              Home
            </span>
            <span
              onClick={() => setOpen(2)}
              className={open === 2 ? styles.active : ""}
            >
              Items
            </span>
            <span
              onClick={() => setOpen(3)}
              className={open === 3 ? styles.active : ""}
            >
              Participates
            </span>
          </section>

          {open === 1 && (
            <div>
              <section className="">
                <div className={styles.mainImg}>
                  {collection?.videos[0] ? (
                    <div id="videoSec" className={styles.videoSec}>
                      <Plyr
                        source={{
                          type: "video",
                          sources: [{ src: collection?.videos[0] }],
                        }}
                        style={{ width: "100%", height: "20rem" }}
                        height="20rem"
                        poster={collection?.images[0]}
                      />
                    </div>
                  ) : (
                    <NextImage
                      src={collection?.images[0]}
                      width="1000px"
                      height="700px"
                      alt="product"
                    />
                  )}
                </div>
                <div className={styles.bottomImg}>
                  {collection?.description && parse(collection?.description)}
                  <div>
                    {collection?.images.slice(1).map((image, index) => (
                      <NextImage
                        src={image}
                        key={index}
                        width="300px"
                        height="300px"
                        alt="product"
                      />
                    ))}
                  </div>
                </div>
              </section>
            </div>
          )}

          {open === 2 && (
            <section>
              <section className={styles.stats}>
                <div>
                  <span>{collection?.items?.length}</span>
                  <h3>Collection Items</h3>
                </div>
                <div>
                  <span>
                    {collection?.worth?.toFixed(2) || total?.toFixed(2)} ETH
                  </span>
                  <h3>Total worth of Collection </h3>
                </div>
              </section>
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
          )}

          {open === 3 && (
            <>
              <div className={styles.section}>
                <div className={styles.content}>
                  <h2>Contributors</h2>
                  {collection?.contributors.map((contributor) => (
                    <div key={contributor.id} className={styles.row}>
                      <div className={styles.left}>
                        {contributor && (
                          <DefaultAvatar
                            url={contributor?.user?.profile?.avatar || ""}
                            id={contributor.user.id}
                            width={"88px"}
                            height={"88px"}
                            walletAddress={contributor?.user.walletAddress}
                          />
                        )}
                        <div className={styles.details}>
                          <div className={styles.dtop}>
                            <span className={styles.name}>
                              {contributor.user.email}
                            </span>
                            <span className={styles.number}>
                              {
                                collection?.items?.filter((item) => {
                                  return item.ownerId === contributor.userId;
                                }).length
                              }
                              Item(s) in collection
                            </span>
                          </div>
                          <div className={styles.btnDiv}></div>
                        </div>
                      </div>
                      <div className={styles.center}>
                        <div className={styles.scroll}>
                          {collection?.items
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
              <div className={styles.section}>
                <div className={styles.topB}>
                  <div className={styles.sectionTop}></div>
                </div>
                <div className={styles.content}>
                  {collection?.beneficiaries.length >= 1 && (
                    <h2>Beneficiaries</h2>
                  )}
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
                            <span className={styles.number}>
                              Wallet address
                            </span>
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
            </>
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
      collection: collection,
    },
  };
};

export default Index;
