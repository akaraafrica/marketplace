import React, { useEffect, useState, useRef, useContext } from "react";
import { CollectionDs } from "../../../ds";
import Dialog from "../../global/Dialog/Dialog";
import styles from "./styles.module.scss";
import { toast } from "react-toastify";
import { IUser } from "../../../types/user.interface";
import userDs from "../../../ds/user.ds";
import Image from "../../global/Image";
import DefaultAvatar from "../../global/DefaultAvatar";
import { ICollection } from "../../../types/collection.interface";
import collectionsDs from "../../../ds/collections.ds";
import Input from "../../global/Form/Input";
import Button from "../../global/Button/Button";
import TextEditor from "../../global/TextEditor";
interface Properties {
  open: boolean;
  handleClose: () => void;
  collection: ICollection;
  mutate: any;
  beneficiary: any;
  setBeneficiary: any;
}
const Index: React.FC<Properties> = ({
  open,
  handleClose,
  collection,
  mutate,
  beneficiary,
  setBeneficiary,
}) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [wallet, setWallet] = useState("");
  const [description, setDescription] = useState("");
  const [percent, setPercent] = useState(0);
  const [euserPercent, setEuserPercent] = useState<any>({});
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(false);
  const [searchUser, setSearchUser] = useState("");
  const [searchedUser, setSearchedUser] = useState<IUser[]>([]);
  const [selectedUser, setSelectedUser] = useState<any>([]);
  const [resultDisplay, setResultDisplay] = useState(false);

  useEffect(() => {
    if (beneficiary) {
      setName(beneficiary.name);
      setEmail(beneficiary.email);
      setWallet(beneficiary.walletAddress);
      setDescription(beneficiary.description);
      setPercent(beneficiary.percentage);
      setPage(1);
    }
  }, [beneficiary]);

  let queryCall = useRef<any>();

  useEffect(() => {
    clearTimeout(queryCall.current);

    const fetchData = async () => {
      const data = await userDs.fetchSearchedUsers(searchUser);
      setSearchedUser(data.searchedUsersWithoutPassword);
    };
    if (!searchUser) return;

    queryCall.current = setTimeout(() => {
      fetchData();
    }, 250);
  }, [searchUser]);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (!name || !email || !wallet || !description || !percent) {
      return;
    }
    const data = {
      name: name,
      email: email,
      walletAddress: wallet,
      description: description,
      percentage: percent,
    };
    setLoading(true);

    if (beneficiary) {
      const data = {
        id: beneficiary.id,
        name: name,
        email: email,
        walletAddress: wallet,
        description: description,
        percentage: percent,
      };
      try {
        if (collection.status === "VERIFIED") {
          await collectionsDs.updateStatus({
            id: collection?.id,
            status: "DRAFT",
          });
          await CollectionDs.updateBeneficiary(collection.id, data);
          setName("");
          setEmail("");
          setWallet("");
          setDescription("");
          setPercent(0);
          toast.success("Beneficiary successful updated");
          mutate();
          setBeneficiary(null);
          handleClose();
          setLoading(false);
        }
        await CollectionDs.updateBeneficiary(collection.id, data);
        setName("");
        setEmail("");
        setWallet("");
        setDescription("");
        setPercent(0);
        toast.success("Beneficiary successful updated");
        mutate();
        setBeneficiary(null);
        handleClose();
        setLoading(false);
      } catch (error) {
        toast.success("Error updating beneficiary");
        console.log(error);
        setLoading(false);
      }
    } else {
      try {
        if (collection.status === "VERIFIED") {
          await collectionsDs.updateStatus({
            id: collection?.id,
            status: "DRAFT",
          });
          await CollectionDs.addBeneficiary(collection, data);
          setName("");
          setEmail("");
          setWallet("");
          setDescription("");
          setPercent(0);
          toast.success("Beneficiary successful added");
          mutate();
          setBeneficiary(null);
          handleClose();
          setLoading(false);
        }
        await CollectionDs.addBeneficiary(collection, data);
        setName("");
        setEmail("");
        setWallet("");
        setDescription("");
        setPercent(0);
        toast.success("Beneficiary successful added");
        mutate();
        setBeneficiary(null);
        handleClose();
        setLoading(false);
      } catch (error) {
        toast.success("Error adding beneficiary");
        console.log(error);
        setLoading(false);
      }
    }
  };
  const handleDialogClose = () => {
    setName("");
    setEmail("");
    setWallet("");
    setDescription("");
    setPercent(0);
    setBeneficiary(null);
    handleClose();
  };
  const handleConnect = async () => {
    const selectedUserWithPercent = selectedUser.map((selUser: any) => ({
      ...selUser,
      percentage: euserPercent[selUser.id],
      name: selUser?.profile?.name,
    }));

    console.log("selected", selectedUserWithPercent);
    try {
      if (collection.status === "VERIFIED") {
        await collectionsDs.updateStatus({
          id: collection?.id,
          status: "DRAFT",
        });
      }
      await CollectionDs.connectBeneficiary(
        collection,
        selectedUserWithPercent
      );
      toast.success("Beneficiary successful added");
      setSelectedUser([]);
      mutate();
      handleClose();
    } catch (error) {
      toast.error("Error adding beneficiary");
      console.log(error);
    }
  };
  const handleChangePercent = (e: any) => {
    setEuserPercent({
      ...euserPercent,
      [parseInt(e.target.name)]: parseInt(e.target.value),
    });
  };
  return (
    <Dialog open={open} handleClose={handleDialogClose}>
      <main className={styles.main}>
        <h4>{beneficiary ? "Edit" : "Add"} Beneficiary</h4>
        {!beneficiary && (
          <div className={styles.top}>
            <span
              onClick={() => setPage(0)}
              style={{ background: page === 0 ? "#f2994a" : "inherit" }}
            >
              Existing user
            </span>
            <span
              onClick={() => setPage(1)}
              style={{ background: page === 1 ? "#f2994a" : "inherit" }}
            >
              New user
            </span>
          </div>
        )}
        <hr />
        {page === 0 && (
          <div className={styles.itemdetailsforminputSearch}>
            <Input
              label="SEARCH TO SELECT BENEFICIARY"
              placeholder="Search users"
              value={searchUser}
              onChange={(e: any) => {
                setResultDisplay(true);
                setSearchUser(e.target.value);
              }}
              name="Search"
            />
            <div
              style={{ display: `${resultDisplay ? "flex" : "none"}` }}
              className={styles.searchResults}
            >
              {searchUser &&
                searchedUser?.map((user, index) => (
                  <span
                    key={index}
                    onClick={() => {
                      for (let i = 0; i < selectedUser.length; i++) {
                        if (
                          selectedUser[i].walletAddress === user.walletAddress
                        ) {
                          toast.warning("User already selected");
                          return;
                        }
                      }
                      setSelectedUser([...selectedUser, user]);
                      // setItems([...items, ...userItems]);
                      setSearchUser("");
                      setResultDisplay(false);
                    }}
                  >
                    <div className={styles.avatarFlex}>
                      <DefaultAvatar
                        fontSize=".6rem"
                        username={user!.username}
                        url={user?.profile?.avatar}
                        walletAddress={user.walletAddress}
                        width="56px"
                        height="56px"
                        notActiveLink={true}
                      />
                      <p>{user.email && user.email}</p>
                    </div>
                  </span>
                ))}
            </div>
            <div className={styles.itemImagesDiv}>
              {selectedUser.map((selUser: any, index: number) => (
                <div key={index} className={styles.row}>
                  <div className={styles.userImage}>
                    <div
                      className={styles.closeIcon}
                      onClick={() =>
                        setSelectedUser([
                          ...selectedUser.slice(0, index),
                          ...selectedUser.slice(index + 1, selectedUser.length),
                        ])
                      }
                      // style={{
                      //   display: selUser.id === user?.id ? "none" : "block",
                      // }}
                    >
                      <Image
                        width="30px"
                        height="30px"
                        alt="close icon"
                        src={`/assets/closeicon.svg`}
                      />
                    </div>
                    <DefaultAvatar
                      fontSize=".6rem"
                      username={selUser!.username}
                      url={selUser?.profile?.avatar}
                      walletAddress={selUser.walletAddress}
                      width="56px"
                      height="56px"
                      notActiveLink={true}
                    />
                  </div>
                  <div className={styles.inputDiv}>
                    <Input
                      label="percentage"
                      placeholder="10%"
                      type="number"
                      required
                      onChange={handleChangePercent}
                      name={(selUser?.id).toString()}
                      max={100}
                    />
                  </div>
                </div>
              ))}
            </div>
            <button
              className={styles.add}
              disabled={selectedUser.length <= 0}
              onClick={handleConnect}
            >
              Add Benefciary
            </button>
          </div>
        )}
        {page === 1 && (
          <form onSubmit={handleSubmit}>
            <div className={styles.inputDiv}>
              <Input
                label="Name"
                onChange={(e: any) => setName(e.target.value)}
                value={name}
                type="text"
                required
                name="name"
                placeholder="John doe"
              />
            </div>
            <div className={styles.inputDiv}>
              <Input
                label="Email"
                onChange={(e: any) => setEmail(e.target.value)}
                value={email}
                type="email"
                required
                name="email"
                placeholder="example@gmail.com"
              />
            </div>
            <div className={styles.inputDiv}>
              <Input
                label="Wallet Address"
                onChange={(e: any) => setWallet(e.target.value)}
                value={wallet}
                type="text"
                required
                name="wallet"
                placeholder="0x0000000..."
              />
            </div>
            <div className={styles.inputDiv}>
              <TextEditor
                label="Description"
                onChange={(e: any) => setDescription(e)}
                value={description}
                placeholder='e.g. "Funds will be sent to beneficiary..." '
                height={"10rem"}
              />
            </div>
            <div className={styles.inputDiv}>
              <Input
                label="Percentage"
                onChange={(e: any) => setPercent(e.target.value)}
                value={percent}
                type="number"
                required
                name="percent"
                placeholder="10%"
                max={100}
              />
            </div>
            <Button customStyle={{ width: "100%" }} loading={loading}>
              Submit
            </Button>
          </form>
        )}
      </main>
    </Dialog>
  );
};

export default Index;
