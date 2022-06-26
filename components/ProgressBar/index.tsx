import * as React from "react";

import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";

export default function SliderSizes() {
  return (
    <Box width="100%">
      <Slider defaultValue={50} aria-label="Default" valueLabelDisplay="auto" />
    </Box>
  );
}
