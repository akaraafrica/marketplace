import Box from "@mui/material/Box";
import { useContext, useState, useEffect } from "react";
import styles from "./admin.module.scss";
import Layout from "../../../components/Layout";
import { GetServerSideProps } from "next";
import { ICollection } from "../../../types/collection.interface";
import ItemGrid from "../../../components/CollectionAdmin/ItemGrid";
import { CollectionDs, ContributorDs } from "../../../ds";
import Link from "next/link";
import withAuth from "../../../HOC/withAuth";
import { BiArrowBack, BiRightArrowAlt } from "react-icons/bi";
import { MdCancel, MdEdit } from "react-icons/md";
import { useRouter } from "next/router";
import DefaultAvatar from "../../../components/DefaultAvatar";
import NextImage from "../../../components/Image";
import { IItem } from "../../../types/item.interface";
import VerifyDialog from "../../../components/CollectionAdmin/VerifyDialog";
import { AuthContext } from "../../../contexts/AuthContext";
import LunchTimeDialog from "../../../components/LunchTimeDialog";
import PayoutDialog from "../../../components/PayoutDialog";
import AddBeneficiaryDialog from "../../../components/AddBeneficiaryDialog";
import MintCollectionDialog from "../../../components/CollectionAdmin/MintCollectionDialog";
import { getCookies } from "cookies-next";
import { toast } from "react-toastify";
import useSWR, { SWRConfig, unstable_serialize } from "swr";
import collectionsDs from "../../../ds/collections.ds";
import UpdateCollectionAdminDialog from "../../../components/UpdateCollectionAdminDialog";

const Index = () => {
  const router = useRouter();
  const id = router.query.id as unknown as number;

  const { data, mutate } = useSWR<{ data: ICollection }>(["admin", id], () =>
    CollectionDs.getCollectionById(id)
  );
  const collection = data?.data;

  const [open, setOpen] = useState(1);
  const [openVerifyDialog, setOpenVerifyDialog] = useState(false);
  const [selectBeneficiary, setSelectBeneficiary] = useState<any>(null);
  const handleVerify = () => {
    setOpenVerifyDialog(true);
  };
  const handleVerifyClose = () => {
    setOpenVerifyDialog(false);
  };

  const [percentages, setPercentages] = useState<any>({});
  const { user } = useContext(AuthContext);
  const [openLunchTime, setOpenLunchTime] = useState(false);
  const [openAddBeneficiary, setOpenAddBeneficiary] = useState(false);
  const [openPublish, setOpenPublish] = useState(false);
  const [openUpdate, setOpenUpdate] = useState(false);

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

  useEffect(() => {
    // @ts-ignore
    if (collection?.status === "PENDING" && handleCheckContributorsStatus()) {
      setOpenUpdate(true);
    }
  }, []);
  const handleRejectRequest = async () => {
    const id = user?.id;
    try {
      await ContributorDs.updateStatus({ id, status: "REJECTED" });
      mutate();
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
      mutate();

      toast.success("successful");
      setRespond(true);
    } catch (error) {
      console.log(error);
      toast.error("error");
    }
  };
  const handleRemoveContributor = async (
    contributorId: number,
    items: IItem[]
  ) => {
    try {
      await CollectionDs.removeContributor(
        collection?.id as number,
        contributorId,
        items
      );
    } catch (error) {
      console.log(error);
      toast.error("error");
    }
  };
  const handleChangePercent = (e: any) => {
    setPercentages({
      ...percentages,
      [parseInt(e.target.name)]: parseInt(e.target.value),
    });
  };

  const handlePercentCheck = () => {
    let result;
    const contributorsPercentage = Object.values(percentages);
    if (collection?.type === "FUNDRAISING") {
      const beneficiariesPercentage = collection?.beneficiaries?.reduce(
        (total: number, beneficiary) => total + beneficiary?.percentage,
        0
      );
      const contributorsTotal = contributorsPercentage.reduce(
        (a: any, b: any) => a + b,
        0
      ) as number;
      result = beneficiariesPercentage + contributorsTotal;
    }
    if (collection?.type === "COLLABORATORS") {
      result = contributorsPercentage.reduce((a: any, b: any) => a + b, 0);
    }

    return result;
  };
  const handleSave = async (e: any) => {
    e.preventDefault();
    if (handlePercentCheck() !== 100) {
      return;
    }
    console.log("sending to db");
    // Save to the DB the contributors percentages
    const contributorsPercent = Object.entries(percentages);
    console.log("contributors: ", contributorsPercent);

    try {
      const BatchUpdate = collection?.contributors.forEach(
        (contributor: { id: string | number }) => {
          // const contributorId = contributor.id;
          ContributorDs.updatePercentage({
            id: contributor.id,
            percent: percentages[contributor.id],
          });
        }
      );
      await Promise.all([
        BatchUpdate,
        collectionsDs.updateStatus({ id: collection?.id, status: "READY" }),
      ]);
    } catch (error) {
      console.log(error);
    }
    console.log(percentages);
  };
  const handleSendEmails = async () => {
    console.log("email sent");
    await ContributorDs.sendNotifications({ collection, user });
    await collectionsDs.updateStatus({ id: collection?.id, status: "PENDING" });
    toast.success("Notifications sent successfully");
  };
  if (!collection) {
    return <h1>404</h1>;
  }
  const total = collection.items.reduce(
    (total: number, item: { price: number }) => total + item.price,
    0
  );
  const beneficiariesTotal = collection.beneficiaries?.reduce(
    (total: number, beneficiary) => total + beneficiary?.percentage,
    0
  );
  const handleRemoveBeneficiary = async (beneficiary: any) => {
    try {
      await collectionsDs.removeBeneficiary(beneficiary);
      mutate();
      toast.success("Beneficiary successful removed");
    } catch (error) {
      toast.error("Error removing Beneficiary");
      console.log(error);
    }
  };
  const handleCheckContributorsStatus = () => {
    let count: number = 0;
    collection.contributors.forEach((contributor) => {
      if (contributor.confirmation === "ACCEPTED") {
        count++;
      }
    });
    if (count === collection.contributors.length) {
      console.log("complete acceptance");
      return true;
    }
  };

  console.log(collection);
  return (
    <Layout>
      <MintCollectionDialog
        open={openPublish}
        handleClose={handleClosePublish}
        collection={collection}
        mutate={mutate}
      />
      <VerifyDialog
        open={openVerifyDialog}
        handleClose={handleVerifyClose}
        collection={collection}
        mutate={mutate}
      />

      <LunchTimeDialog
        collectionId={collection.id}
        handleClose={handleVerifyClose}
        open={openLunchTime}
        mutate={mutate}
      />
      <AddBeneficiaryDialog
        collectionId={collection.id}
        open={openAddBeneficiary}
        beneficiary={selectBeneficiary}
        setBeneficiary={setSelectBeneficiary}
        handleClose={() => setOpenAddBeneficiary(false)}
        mutate={mutate}
      />
      <UpdateCollectionAdminDialog
        open={openUpdate}
        handleClose={() => setOpenUpdate(false)}
        collectionId={collection.id}
        mutate={mutate}
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
              {collection?.lunchTime && (
                <div>Launches in {collection?.lunchTime}</div>
              )}
            </div>

            {collection.author.id === user?.id && (
              <div className={styles.right}>
                {collection.status === "READY" &&
                  collection.author.id === user?.id && (
                    <button
                      className={styles.btnSave2}
                      onClick={handleSendEmails}
                    >
                      Send Emails
                    </button>
                  )}
                {collection.type !== "ORDINARY" && (
                  <button
                    className={styles.btnSave}
                    onClick={handleSave}
                    disabled={handlePercentCheck() !== 100}
                  >
                    Save
                  </button>
                )}

                {/* <button>Payout Funds</button> */}
                <Link href={`/collection/create?id=${collection?.id}`}>
                  <button>
                    Edit Collection Details <BiRightArrowAlt />
                  </button>
                </Link>
                {collection.status === "VERIFIED" && (
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
                <div>
                  <span>{collection.revenue || "0"} ETH</span>
                  <h3>Revenue from Items</h3>
                </div>
                {collection.type === "FUNDRAISING" && (
                  <>
                    {/* <div>
                      <span>{(total / beneficiariesTotal).toFixed(3) || "0"} ETH</span>
                      <h3>Amount paid to beneficiaries</h3>
                    </div> */}
                    <div>
                      <span>
                        {((beneficiariesTotal / 100) * total).toFixed(3) || "0"}{" "}
                        ETH
                      </span>
                      <h3>Target amount for beneficiaries</h3>
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
              <div className={styles.sectionTop}>
                <h2>Manage Contributors</h2>
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
                          <div className={styles.btnDiv}>
                            {contributor.userId != user?.id &&
                              collection.author.id === user?.id && (
                                <>
                                  <button>{contributor.confirmation}</button>
                                  <button
                                    onClick={() =>
                                      handleRemoveContributor(
                                        contributor.id,
                                        collection.items?.filter((item) => {
                                          return (
                                            item.ownerId === contributor.userId
                                          );
                                        })
                                      )
                                    }
                                    className={styles.btnRemove}
                                  >
                                    Remove
                                  </button>
                                </>
                              )}
                          </div>
                          <div className={styles.btnDiv}>
                            {!respond &&
                              contributor.confirmation === "PENDING" &&
                              contributor.userId !== user?.id &&
                              collection.author.id !== user?.id && (
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
                      {collection.type === "FUNDRAISING" ||
                      collection.type === "COLLABORATORS" ? (
                        <div className={styles.right}>
                          <label htmlFor="">PERCENTAGE</label>
                          <input
                            type="number"
                            name={(contributor?.id).toString()}
                            onChange={handleChangePercent}
                            placeholder="10%"
                          />
                        </div>
                      ) : (
                        ""
                      )}
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
              <div className={styles.topB}>
                <h2>Beneficiary</h2>
                <div className={styles.sectionTop}>
                  <button onClick={() => setOpenAddBeneficiary(true)}>
                    Add Beneficiary
                  </button>
                  {/* <button 
                    className={styles.btnSave}
                    onClick={handleSave}
                    disabled={handlePercentCheck() !== 100}
                  >Save</button> */}
                </div>
              </div>
              <div className={styles.content}>
                {collection?.beneficiaries?.map((beneficiary) => (
                  <div
                    key={beneficiary.id}
                    className={styles.row}
                    onClick={() => setSelectBeneficiary(beneficiary)}
                  >
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
                    <div className={styles.right}>
                      <label htmlFor="">PERCENTAGE</label>
                      <input
                        value={beneficiary.percentage}
                        type="number"
                        name={beneficiary.name}
                        placeholder="10%"
                        disabled
                      />
                    </div>
                    <div className={styles.actionBtns}>
                      <MdEdit
                        size={30}
                        color="#fff"
                        onClick={() => setOpenAddBeneficiary(true)}
                      />
                      <MdCancel
                        size={30}
                        color="orangered"
                        onClick={() => handleRemoveBeneficiary(beneficiary)}
                      />
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
  const cookie = getCookies(ctx);

  let collection: { data: ICollection } = await CollectionDs.getCollectionById(
    id
  );
  if (!collection.data) return { notFound: true };

  const isContributor = collection.data.contributors.find((contributor) => {
    return contributor.user.walletAddress == cookie.address;
  });
  // if (!isContributor) return { notFound: true };
  // if (!Object.keys(isContributor!).length) return { notFound: true };

  return {
    props: {
      fallback: {
        [unstable_serialize(["admin", id])]: collection,
      },
    },
  };
};
const Page = ({ fallback }: any) => {
  return (
    <SWRConfig value={{ fallback }}>
      <Index />
    </SWRConfig>
  );
};
export default withAuth(Page);
