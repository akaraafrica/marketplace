import * as React from "react";
import dayjs, { Dayjs } from "dayjs";
import TextField from "@mui/material/TextField";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import Stack from "@mui/material/Stack";
import styles from "./datepicker.module.scss";
import styled from "@emotion/styled";

const WhiteBorderTextField = styled(TextField)`
  & .MuiOutlinedInput-root {
    &.Mui-focused fieldset {
      border: 0px;
    }
  }
`;

export default function ResponsiveDateTimePickers({ getValue }: any) {
  const [value, setValue] = React.useState<Dayjs | null>(
    dayjs("2018-01-01T00:00:00.000Z")
  );

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Stack spacing={3} className={styles.input}>
        <DateTimePicker
          label=""
          renderInput={(params) => {
            return <WhiteBorderTextField {...params} />;
          }}
          value={value}
          onChange={(newValue) => {
            setValue(newValue);
            getValue(new Date(newValue as any));
          }}
        />
      </Stack>
    </LocalizationProvider>
  );
}
