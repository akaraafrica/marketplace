import Box from "@mui/material/Box";
import { useContext, useState } from "react";
import styles from "./admin.module.scss";
import Layout from "../../../components/Layout";
import { GetServerSideProps } from "next";
import { ICollection } from "../../../types/collection.interface";
import ItemGrid from "../../../components/CollectionAdmin/ItemGrid";
import { CollectionDs, ContributorDs } from "../../../ds";
import Link from "next/link";
import withAuth from "../../../HOC/withAuth";
import { BiArrowBack } from "react-icons/bi";
import { BiRightArrowAlt } from "react-icons/bi";
import { useRouter } from "next/router";
import DefaultAvatar from "../../../components/DefaultAvatar";
import NextImage from "../../../components/Image";
import { IItem } from "../../../types/item.interface";
import VerifyDialog from "../../../components/CollectionAdmin/VerifyDialog";
import { AuthContext } from "../../../contexts/AuthContext";
import LunchTimeDialog from "../../../components/LunchTimeDialog";
import PayoutDialog from "../../../components/PayoutDialog";
import MintCollectionDialog from "../../../components/CollectionAdmin/MintCollectionDialog";
import { getCookies } from "cookies-next";
import { toast } from "react-toastify";

// const CollectionAdmin = ({ collectionx }: { collectionx: ICollection }) => {

interface Properties {
  collection: ICollection;
}

const CollectionAdmin: React.FC<Properties> = ({ collection }) => {
  const [open, setOpen] = useState(1);
  const [openVerifyDialog, setOpenVerifyDialog] = useState(false);
  const router = useRouter();
  const total = collection?.items.reduce(
    (total: number, item: { price: number }) => total + item.price,
    0
  );
  const beneficiariesTotal = collection?.beneficiaries?.reduce(
    (total: number, beneficiary) => total + beneficiary?.percentage,
    0
  );
  const handleVerify = () => {
    setOpenVerifyDialog(true);
  };
  const handleVerifyClose = () => {
    setOpenVerifyDialog(false);
  };

  const { user } = useContext(AuthContext);
  const [openLunchTime, setOpenLunchTime] = useState(false);
  const [openPublish, setOpenPublish] = useState(false);
  // const [openPayout, setOpenPayout] = useState(false);
  const handleClose = () => {
    setOpenLunchTime(false);
    // setOpenPayout(false);
  };
  const handlePublish = () => {
    setOpenPublish(true);
  };
  const handleClosePublish = () => {
    setOpenPublish(false);
  };
  const [respond, setRespond] = useState(false);

  const id = user?.id;
  const handleRejectRequest = async () => {
    try {
      await ContributorDs.updateStatus({ id, status: "REJECTED" });
      toast.success("successful");
      setRespond(true);
    } catch (error) {
      console.log(error);
      toast.error("error");
    }
  };
  const handleAcceptRequest = async () => {
    try {
      await ContributorDs.updateStatus({ id, status: "REJECTED" });
      toast.success("successful");
      setRespond(true);
    } catch (error) {
      console.log(error);
      toast.error("error");
    }
  };
  return (
    <Layout>
      <MintCollectionDialog
        open={openPublish}
        handleClose={handleClosePublish}
        collection={collection}
      />
      <VerifyDialog
        open={openVerifyDialog}
        handleClose={handleVerifyClose}
        collection={collection}
      />

      <LunchTimeDialog
        collectionId={collection.id}
        handleClose={handleVerifyClose}
        open={openLunchTime}
      />
      {/* <PayoutDialog
        collection={collection}
        handleClose={handleClose}
        open={openPayout}
      /> */}
      <Box className={styles.container}>
        <div className={styles.breadcrumbWrap}>
          <div onClick={() => router.push("/")} className={styles.backButton}>
            <BiArrowBack />
            <p className={styles.backText}>Back to collections</p>
          </div>
          <div className={styles.breadcrumb}>
            <span>Home</span>
            <span>&gt;</span>
            <span className={styles.currentCrumb}>Manage collection</span>
          </div>
        </div>
        <main>
          <div className={styles.heading}>
            <div className={styles.left}>
              <span
                className={collection?.status === "DRAFT" ? styles.draft : ""}
              >
                {collection?.status}
              </span>
              <h2>{collection?.title}</h2>
              <div>Launches in {collection?.lunchTime}</div>
            </div>

            {collection.author.id === user?.id && (
              <div className={styles.right}>
                <button>Payount Funds</button>
                <Link href={`/collection/create?id=${collection?.id}`}>
                  <button>
                    Edit Collection Details <BiRightArrowAlt />
                  </button>
                </Link>
                <button className={styles.btnSave}>Save</button>
                {collection.status === "READY" && (
                  <button className={styles.btnPublish} onClick={handlePublish}>
                    publish
                  </button>
                )}
              </div>
            )}
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

            {/* <span onClick={() => setOpen(3)} className={open === 3 ? styles.active : ''}>Whitelist</span> */}

            {collection?.type?.name === "Beneficiaries" && (
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
                <div>
                  <span>{collection.revenue} ETH</span>
                  <h3>Revenue from Items</h3>
                </div>
                {collection?.type?.name === "Beneficiaries" &&
                  beneficiariesTotal && (
                    <>
                      <div>
                        <span>{total / beneficiariesTotal || ""} ETH</span>
                        <h3>Target amount for beneficiaries</h3>
                      </div>
                      <div>
                        <span>
                          {collection.revenue / beneficiariesTotal || ""} ETH
                        </span>
                        <h3>Totol amount raised beneficiaries</h3>
                      </div>
                    </>
                  )}
              </section>
              <section>
                <h2></h2>
                <div className={styles.bottom}>
                  <div>
                    <ItemGrid
                      collection={collection}
                      user={user!}
                      title="Manage Collection Items"
                    />
                  </div>
                </div>
              </section>
            </div>
          )}
          {open === 2 && (
            <div className={styles.section}>
              <h2>Manage Contributors</h2>
              <div className={styles.content}>
                {collection?.contributors?.map((contributor) => (
                  <div key={contributor.id} className={styles.row}>
                    <div className={styles.left}>
                      <DefaultAvatar
                        url={contributor?.user?.profile?.avatar}
                        width={"88px"}
                        height={"88px"}
                        walletAddress={contributor?.user.walletAddress}
                        fontSize={"8px"}
                      />
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
                        <div className={styles.btnDiv}>
                          {contributor.userId != user?.id &&
                            collection.author.id === user?.id && (
                              <>
                                <button>{contributor.confirmation}</button>
                                <button className={styles.btnRemove}>
                                  Remove
                                </button>
                              </>
                            )}
                        </div>
                        <div className={styles.btnDiv}>
                          {!respond &&
                            collection.status === "DRAFT" &&
                            contributor.confirmation === "PENDING" &&
                            contributor.userId === user?.id &&
                            collection.author.id == user?.id && (
                              <>
                                <button
                                  className={styles.btnAccept}
                                  onClick={handleAcceptRequest}
                                >
                                  Accept
                                </button>
                                <button
                                  className={styles.btnRemove}
                                  onClick={handleRejectRequest}
                                >
                                  Reject
                                </button>
                              </>
                            )}

                        </div>
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
                    <div className={styles.right}>
                      <label htmlFor="">PERCENTAGE</label>
                      <input type="number" placeholder="10%" />
                    </div>
                  </div>
                ))}
              </div>
              {collection.author.id === user?.id &&
                collection.status === "VERIFIED" && (
                  <button className={styles.verify} onClick={handleVerify}>
                    send request to contributors
                  </button>
                )}
            </div>
          )}
          {open === 3 && (
            <div className={styles.section}>
              <h2>Whitelist</h2>
            </div>
          )}
          {open === 4 && (
            <div className={styles.section}>
              <h2>Beneficiary</h2>
            </div>
          )}
        </main>
      </Box>
    </Layout>
  );
};
export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { id }: any = ctx.params;
  const cookie = getCookies(ctx);

  let collection: { data: ICollection } = await CollectionDs.getCollectionById(
    id
  );
  if (!collection.data) return { notFound: true };

  const isContributor = collection.data.contributors.find((contributor) => {
    return contributor.user.walletAddress == cookie.address;
  });
  if (!Object.keys(isContributor!).length) return { notFound: true };

  return {
    props: {
      collection: collection.data,
    },
  };
};
export default withAuth(CollectionAdmin);
