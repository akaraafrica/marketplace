import { useState, useEffect } from "react";
import Dialog from "../../global/Dialog/Dialog";
import styles from "./index.module.scss";
import { useSWRConfig } from "swr";
import Input from "../../global/Form/Input";
import Button from "../../global/Button/Button";
import Error from "../../global/Error/Error";
import { differenceInDays, differenceInSeconds, isPast } from "date-fns";
import { toast } from "react-toastify";
import { AuctionDs } from "../../../ds";

export default function Index({ open, handleClose, item, edit }: any) {
  const [startPrice, setStartPrice] = useState(item?.auction?.openPrice);
  const [startTime, setStartTime] = useState<null | string>(
    item?.auction?.startTime
  );
  const [error, setError] = useState<null | string>(null);
  const [endTime, setEndTime] = useState<null | string>(item?.auction?.endTime);
  const { mutate } = useSWRConfig();
  useEffect(() => {
    if (startTime) {
      setError(null);
      if (isPast(new Date(startTime))) {
        setError("Auction cannot be in the past");
      }
    }
  }, [startTime]);
  useEffect(() => {
    if (endTime) {
      setError(null);
      const endDateDifference = differenceInDays(new Date(endTime), new Date());
      if (endDateDifference > 29) {
        setError("Auction can't be longer than 30 days");
      }
    }
  }, [endTime]);

  const handleSubmit = async () => {
    if (edit) {
      // TODO ONCHAIN INTERACTION
      handleClose();
      toast.success("Auction updated");
      try {
        await AuctionDs.updateData({
          id: item.auction.id,
          startPrice,
          startTime,
          endTime,
        });
        mutate("item" + item.id);
      } catch (error) {
        toast.error("Error updating auction");
      }
    } else {
      // TODO ONCHAIN INTERACTION
      const newData = { ...item, auction: { open: true } };
      mutate("item" + item.id, () => newData, false);
      handleClose();
      toast.success("placed on auction");
      try {
        await AuctionDs.postData({
          itemId: item.id,
          startPrice,
          startTime,
          endTime,
        });
        mutate(["item", item.id]);
        setTimeout(() => {}, 2000);
      } catch (error) {
        toast.error("error placing auction");
      }
    }
  };
  const handleChange = (e: any) => {
    const value = Number(e.target.value);
    setStartPrice(value);
  };

  return (
    <>
      <Dialog
        open={open}
        handleClose={handleClose}
        title={edit ? "edit auction" : "place on auction"}
      >
        <main className={styles.main}>
          <p>
            You are about to place <strong>{item.title} </strong>
            on action
          </p>

          <section>
            <div className={styles.bidinput}>
              <span>Starting Price </span>
              <div>
                <Input
                  name="amount"
                  label=""
                  customStyle={{
                    background: "transparent",
                    border: "none",
                    borderBottom: "1px solid white",
                    color: "white",
                    width: "15rem",

                    borderRadius: 0,
                  }}
                  type="number"
                  value={startPrice}
                  placeholder="Enter amount"
                  onChange={handleChange}
                />
                <strong>ETH</strong>
              </div>
            </div>
            <div>
              <span>Start Date</span>

              <Input
                name="amount"
                label=""
                customStyle={{
                  background: "transparent",
                  border: "none",
                  borderBottom: "1px solid white",
                  width: "15rem",
                  color: "white",
                  borderRadius: 0,
                }}
                value={startTime || ""}
                onChange={(e: any) => setStartTime(e.target.value)}
                type="datetime-local"
              />
            </div>
            <div>
              <span>End Time</span>
              <Input
                name="amount"
                label=""
                customStyle={{
                  background: "transparent",
                  border: "none",
                  width: "15rem",
                  borderBottom: "1px solid white",
                  color: "white",
                  borderRadius: 0,
                }}
                value={endTime || ""}
                onChange={(e: any) => setEndTime(e.target.value)}
                type="datetime-local"
              />
            </div>
          </section>
          <div>{error && <Error heading={error} />}</div>
          <section className={styles.button}>
            <Button
              disabled={startPrice <= 0 || startTime == null || endTime == null}
              onClick={handleSubmit}
            >
              {edit ? "Edit Auction" : "Place on Action"}
            </Button>
            <Button
              onClick={handleClose}
              customStyle={{ background: "#23262f" }}
            >
              Cancel
            </Button>
          </section>
        </main>
      </Dialog>
    </>
  );
}
