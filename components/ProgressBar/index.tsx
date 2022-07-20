import * as React from "react";

import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";
type props = {
  onChange:
    | ((event: Event, value: number | number[], activeThumb: number) => void)
    | undefined;
};

const SliderSizes: React.FC<props> = ({ onChange }) => {
  return (
    <Box width="100%">
      <Slider
        onChange={onChange}
        min={1}
        step={1}
        max={10}
        defaultValue={5}
        aria-label="Default"
        valueLabelDisplay="auto"
      />
    </Box>
  );
};
export default SliderSizes;
