import React from "react";
import SellersCard from "../SellersCard";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import "./styles.css";
import Slider from "infinite-react-carousel";

const SellersSec = () => {
  const deviceWidth = window.innerWidth;
  const settings = {
    slidesPerRow: deviceWidth <= 600 ? 2 : 5,
  };
  const names = [
    "Oliver Hansen",
    "Van Henry",
    "April Tucker",
    "Ralph Hubbard",
    "Omar Alexander",
    "Carlos Abbott",
    "Miriam Wagner",
    "Bradley Wilkerson",
    "Virginia Andrews",
    "Kelly Snyder",
  ];
  const MenuProps = {
    PaperProps: {
      style: {
        width: 250,
        backgroundColor: 'black',
        color: 'white'
      },
    },
  };
  return (
    <div style={{ backgroundColor: "#23262f", padding: "5vw 5vw" }}>
      <div className="popularHeader">
        <div className="popularCon">
          <span className="popularText">Popular</span>
          <span className="sellersText">
            Sellers{" "}
            <div
              style={{
                width: "2vw",
                height: "2vw",
                marginLeft: "-1vw",
                color: "white",
              }}
            ></div>{" "}
          </span>
        </div>
        <div>
          <FormControl sx={{ m: 1, width: 300 }}>
            <InputLabel id="demo-multiple-name-label">Name</InputLabel>
            <Select
              labelId="demo-multiple-name-label"
              id="demo-multiple-name"
              multiple
              value={[]}
              // onChange={handleChange}
              input={<OutlinedInput label="Name" />}
              MenuProps={MenuProps}
            >
              {names.map((name) => (
                <MenuItem key={name} value={name}>
                  {name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
      </div>
      <Slider {...settings}>
        <div>
          <SellersCard />
        </div>
        <div>
          <SellersCard />
        </div>
        <div>
          <SellersCard />
        </div>
        <div>
          <SellersCard />
        </div>
        <div>
          <SellersCard />
        </div>
        <div>
          <SellersCard />
        </div>
        <div>
          <SellersCard />
        </div>
        <div>
          <SellersCard />
        </div>
        <div></div>
      </Slider>
    </div>
  );
};

export default SellersSec;
