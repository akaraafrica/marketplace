/* eslint-disable @next/next/no-img-element */
import React from "react";
import NextImage from "../../components/Image";
import styles from "./index.module.scss";

const data = {
  bid: "1.125 ETH",
  stock: "18 in stock",
  image: "/assets/listingcardimg.png",
  avatar: "/assets/Avator.svg",
};

function ListingMainCard() {
  return (
    <div className={styles.root}>
      <div className={styles.left}>
        <NextImage
          src={data.image}
          width="100%"
          height="446px"
          className={styles.image}
          alt="product"
        />
        <div className={styles.leftBottom}>
          <div className={styles.avatarName}>
            <NextImage
              className={styles.avatar}
              src="/assets/auctionAvatar.png"
              width="48px"
              height="48px"
              alt="avatar"
            />
            <div className={styles.name}>
              <span className={styles.title}>The future of ETH®</span>
              <span className={styles.stock}>18 in stock</span>
            </div>
          </div>
          <div className={styles.high}>
            <span className={styles.highest}>Highest bid</span>
            <span className={styles.highEth}>1.125 ETH</span>
          </div>
        </div>
      </div>
      <div className={styles.center}>
        <div className={styles.cards}>
          <NextImage
            className={styles.cardImg}
            src="/assets/productimg4.png"
            width="160px"
            height="148px"
            alt="product"
          />
          <div className={styles.cardDetails}>
            <span className={styles.cardName}>ETH never dies</span>
            <div className={styles.centerDiv}>
              <NextImage
                className={styles.centerDivImg}
                src="/assets/auctionAvatar.png"
                width="24px"
                height="24px"
                alt="avatar"
              />
              <span>0.27 ETH</span>
            </div>
            <button>Place a bid</button>
          </div>
        </div>
        <div className={styles.cards}>
          <NextImage
            className={styles.cardImg}
            src="/assets/productimg1.png"
            width="160px"
            height="148px"
            alt="avatar"
          />
          <div className={styles.cardDetails}>
            <span className={styles.cardName}>Future coming soon</span>
            <div className={styles.centerDiv}>
              <NextImage
                className={styles.centerDivImg}
                src="/assets/auctionAvatar.png"
                width="24px"
                height="24px"
                alt="avatar"
              />
              <span>0.27 ETH</span>
            </div>
            <button>Place a bid</button>
          </div>
        </div>
        <div className={styles.cards}>
          <NextImage
            className={styles.cardImg}
            src="/assets/productimg7.png"
            width="160px"
            height="148px"
            alt="avatar"
          />
          <div className={styles.cardDetails}>
            <span className={styles.cardName}>
              Elon Musk silver coin 3d print
            </span>
            <div className={styles.centerDiv}>
              <NextImage
                className={styles.centerDivImg}
                src="/assets/auctionAvatar.png"
                width="24px"
                height="24px"
                alt="avatar"
              />
              <span>0.27 ETH</span>
            </div>
            <button>Place a bid</button>
          </div>
        </div>
      </div>
      <div className={styles.right}>
        <hr />
        <div className={styles.rightContainer}>
          <h5>Latest upload from creators 🔥</h5>
          <div className={styles.creator}>
            <div className={styles.creatorImgDiv}>
              <p>2</p>
              <NextImage
                className={styles.creatorImg}
                src="/assets/auctionAvatar.png"
                width="56px"
                height="56px"
                alt="avatar"
              />
            </div>
            <div className={styles.creatorNameDiv}>
              <span className={styles.name}>Payton Haris</span>
              <span className={styles.eth}>
                2.456 <span>ETH</span>
              </span>
            </div>
          </div>
          <hr />
          <div className={styles.creator}>
            <div className={styles.creatorImgDiv}>
              <p>2</p>
              <NextImage
                className={styles.creatorImg}
                src="/assets/auctionAvatar.png"
                width="56px"
                height="56px"
                alt="avatar"
              />
            </div>
            <div className={styles.creatorNameDiv}>
              <span className={styles.name}>Payton Haris</span>
              <span className={styles.eth}>
                2.456 <span>ETH</span>
              </span>
            </div>
          </div>
          <hr />
          <div className={styles.creator}>
            <div className={styles.creatorImgDiv}>
              <p>2</p>
              <NextImage
                className={styles.creatorImg}
                src="/assets/auctionAvatar.png"
                width="56px"
                height="56px"
                alt="avatar"
              />
            </div>
            <div className={styles.creatorNameDiv}>
              <span className={styles.name}>Payton Haris</span>
              <span className={styles.eth}>
                2.456 <span>ETH</span>
              </span>
            </div>
          </div>
          <hr />
          <div className={styles.creator}>
            <div className={styles.creatorImgDiv}>
              <p>2</p>
              <NextImage
                className={styles.creatorImg}
                src="/assets/auctionAvatar.png"
                width="56px"
                height="56px"
                alt="avatar"
              />
            </div>
            <div className={styles.creatorNameDiv}>
              <span className={styles.name}>Payton Haris</span>
              <span className={styles.eth}>
                2.456 <span>ETH</span>
              </span>
            </div>
          </div>
          <div className={styles.btn}>Discover more </div>
        </div>
      </div>

      {/* <div
        className={styles.listingmaincardsec1}
        style={{
          backgroundImage: `url(${data.image})`,
          width: "100%",
          height: "500px",
          backgroundRepeat: "no-repeat",
          objectFit: "cover",
          backgroundSize: "cover",
        }}
      ></div>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          maxHeight: "51px",
          paddingBottom: "10px",
          marginTop: "20px",
        }}
      >
        <Box sx={{ display: "flex", justifyContent: "flex-start" }}>
          <div>
            <NextImage src={`${data.avatar}`} height={80} width='100%' />
          </div>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-around",
            }}
          >
            <Typography color={"white"} sx={{ fontWeight: 600 }}>
              {" "}
              The future of ETH®
            </Typography>
            <Typography
              sx={{
                width: "100%",
                fontSize: { sm: "8px", xs: "8px", md: "14px", lg: "14px" },
              }}
            >
              {" "}
              {data.stock}
            </Typography>
          </Box>
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            flexDirection: "column",
            alignItems: "flex-end",
          }}
        >
          <Typography
            sx={{
              fontSize: { sm: "10px", xs: "10px", md: "14px", lg: "14px" },
            }}
          >
            {" "}
            Highest bid
          </Typography>
          <Typography
            sx={{
              color: "green",
              border: "1px solid green",
              borderRadius: "5px",
              fontWeight: 400,
              padding: "5px",
            }}
          >
            {data.bid}
          </Typography>
        </Box>
      </Box> */}
    </div>
  );
}
export default ListingMainCard;
