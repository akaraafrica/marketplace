import React, { useContext } from "react";
import { useRouter } from "next/router";
import NextImage from "../../components/Image";
import styles from "./index.module.scss";
import { INotification } from "../../types/notification.interface";
import getNiceDate from "../../utils/helpers/dateFormatter";
import Link from "../Link";
import { AuthContext } from "../../contexts/AuthContext";
const Item = ({ data }: { data: INotification }) => {
  const { user } = useContext(AuthContext);

  return (
    <div>
      <Link href={`/notifications/+${user?.id}?id=${data.id}`}>
        <a>
          <div className={styles.item}>
            <div className={styles.left}>
              <NextImage
                className={styles.img}
                src={
                  data?.item
                    ? data?.item?.images[0]
                    : data?.collection?.images[0] || "/assets/avatar.png"
                }
                width="70px"
                height="70px"
              />
              <div className={styles.details}>
                <span className={styles.title}>{data.title.slice(0, 30)}</span>
                <span className={styles.time}>
                  {getNiceDate(data.createdAt)}
                </span>
              </div>
            </div>
            <span className={styles.dot}></span>
          </div>
        </a>
      </Link>
    </div>
  );
};

const Index = ({ data }: { data?: INotification[] }) => {
  const router = useRouter();
  const { user } = useContext(AuthContext);

  return (
    <div className={styles.root} style={{ zIndex: 1 }}>
      <div className={styles.top}>
        <div>Notifications</div>
        <span onClick={() => router.push("/notifications/" + user?.id)}>
          See all
        </span>
      </div>
      <div className={styles.body}>
        {data?.length ? (
          data?.map((notification) => {
            return (
              <div key={notification.id}>
                <Item data={notification} />
              </div>
            );
          })
        ) : (
          <h3 className={styles.allread}>
            All sorted. <br />
            The world is your oyster.
          </h3>
        )}
      </div>
    </div>
  );
};

export default React.memo(Index);
