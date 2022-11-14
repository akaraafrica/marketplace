import React, { useEffect, useState, useRef, useContext } from "react";
import { CollectionDs } from "../../ds";
import Dialog from "../global/Dialog";
import styles from "./styles.module.scss";
import dynamic from "next/dynamic";
import { toast } from "react-toastify";
import { IUser } from "../../types/user.interface";
import userDs from "../../ds/user.ds";
import { AuthContext } from "../../contexts/AuthContext";
import Image from "../Image";
import DefaultAvatar from "../DefaultAvatar";
import { ICollection } from "../../types/collection.interface";
import collectionsDs from "../../ds/collections.ds";
const ReactQuill: any = dynamic(() => import("react-quill"), { ssr: false });
const toolbarOptions = [
  ["bold", "italic", "underline", "strike"],
  ["blockquote", "code-block"],
  [{ header: 1 }, { header: 2 }],
  [{ list: "ordered" }, { list: "bullet" }],
  [{ script: "sub" }, { script: "super" }],
  [{ indent: "-1" }, { indent: "+1" }],
  [{ direction: "rtl" }],
  [{ header: [1, 2, 3, 4, 5, 6, false] }],
  [{ color: ["#353945"] }, { background: [] }],
  [{ font: [] }],
  [{ align: [] }],
  ["clean"],
];

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
  const [searchUser, setSearchUser] = useState("");
  const [searchedUser, setSearchedUser] = useState<IUser[]>([]);
  const [selectedUser, setSelectedUser] = useState<any>([]);
  const [resultDisplay, setResultDisplay] = useState(false);

  const { user } = useContext(AuthContext);
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
        if (collection.status === "READY" || collection.status === "VERIFIED") {
          await collectionsDs.updateStatus({
            id: collection?.id,
            status: "DRAFT",
          });
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
      } catch (error) {
        toast.success("Error updating beneficiary");
        console.log(error);
      }
    } else {
      try {
        if (collection.status === "READY" || collection.status === "VERIFIED") {
          await collectionsDs.updateStatus({
            id: collection?.id,
            status: "DRAFT",
          });
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
      } catch (error) {
        toast.success("Error adding beneficiary");
        console.log(error);
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
      if (collection.status === "READY" || collection.status === "VERIFIED") {
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
        <hr />
        {page === 0 && (
          <div className={styles.itemdetailsforminputSearch}>
            <label>SEARCH TO SELECT BENEFICIARY</label>
            <input
              type="text"
              name="Search"
              placeholder="Search users"
              value={searchUser}
              onChange={(e) => {
                setResultDisplay(true);
                setSearchUser(e.target.value);
              }}
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
                    {user.email && user.email}
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
                      id={selUser!.id}
                      url={selUser?.profile?.avatar}
                      walletAddress={selUser.walletAddress}
                      width="56px"
                      height="56px"
                    />
                  </div>
                  <div className={styles.inputDiv}>
                    <label>Percentage</label>
                    <input
                      onChange={handleChangePercent}
                      name={(selUser?.id).toString()}
                      type="number"
                      max={100}
                      required
                      // value={percen}
                      placeholder="10%"
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
              <label>Name</label>
              <input
                onChange={(e) => setName(e.target.value)}
                value={name}
                type="text"
                required
                placeholder="John doe"
              />
            </div>
            <div className={styles.inputDiv}>
              <label>Email</label>
              <input
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                required
                value={email}
                placeholder="example@gmail.com"
              />
            </div>
            <div className={styles.inputDiv}>
              <label>Wallet Address</label>
              <input
                onChange={(e) => setWallet(e.target.value)}
                type="text"
                required
                value={wallet}
                placeholder="0x00000000000..."
              />
            </div>
            <div className={styles.inputDiv}>
              <label>Description</label>
              {/* <input
              onChange={(e) => setDescription(e.target.value)}
              type="text"
              placeholder="Enter beneficiary description"
            /> */}
              <ReactQuill
                modules={{
                  toolbar: toolbarOptions,
                }}
                theme="snow"
                style={{
                  height: "10rem",
                  marginBottom: "100px",
                }}
                placeholder='e.g. “Funds will be sent to beneficiary...”"'
                value={description}
                onChange={(e: any) => {
                  setDescription(e);
                }}
              />
            </div>
            <div className={styles.inputDiv}>
              <label>Percentage</label>
              <input
                onChange={(e) => setPercent(parseInt(e.target.value))}
                type="number"
                max={100}
                required
                value={percent}
                placeholder="10%"
              />
            </div>
            <button type="submit">Submit</button>
          </form>
        )}
      </main>
    </Dialog>
  );
};

export default Index;
