import { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { mutate } from "swr";
import { AuthContext } from "../../../contexts/AuthContext";
import { CollectionDs } from "../../../ds";
import Dialog from "../../global/Dialog/Dialog";
import styles from "./styles.module.scss";

export default function AddToCollectionDialog({
  open,
  handleClose,
  owner,
  title,
  id,
  price,
}: any) {
  const user = useContext(AuthContext).user;
  const [collection, setCollection] = useState<null | number>(null);
  const [userCollections, setUserCollections] =
    useState<{ id: number; title: string }[]>();
  useEffect(() => {
    if (user) {
      CollectionDs.getUserCollections(user.id)
        .then(({ data }) => {
          setUserCollections(data);
          setCollection(data[0]);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [user]);
  const handleChange = (e: any) => {
    console.log(e.target.value);
  };

  const handleAddItem = async () => {
    try {
      if (collection) {
        const data = {
          user,
          collection,
          item: { owner, id, title, price },
        };
        await CollectionDs.addItem(data);
        mutate("profile" + id);
        handleClose();
        toast.success("Item add successfully");
      }
    } catch (error) {
      console.log(error);
      toast.success("Error adding item");
    }
  };
  return (
    <>
      <Dialog open={open} handleClose={handleClose}>
        <main className={styles.main}>
          <p>{`Send request to add ${title} to your collection `}</p>
          <h4>Select collection</h4>
          <select onChange={handleChange}>
            {userCollections?.map((collection) => (
              <option key={collection.id} value={collection.id}>
                {collection.title}
              </option>
            ))}
          </select>
          <h6>
            Hi, I would like your approval to add your item to my collection
          </h6>

          <section className={styles.button}>
            <button className={styles.accept} onClick={handleAddItem}>
              Send Request
            </button>
            <button onClick={handleClose}>Cancel</button>
          </section>
        </main>
      </Dialog>
    </>
  );
}
