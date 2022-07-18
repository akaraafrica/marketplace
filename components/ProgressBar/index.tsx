import * as React from "react";

import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";

export default function SliderSizes() {
  // onChange: (event: Event, value: number | number[], activeThumb: number) => void
  return (
    <Box width="100%">
      <Slider
        // onChange={onChange}
        defaultValue={50}
        aria-label="Default"
        valueLabelDisplay="auto"
      />
    </Box>
  );
}
