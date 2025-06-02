import React from "react";
import { Box } from "@mui/material";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import "./style.css";

const MobilePhone = (props: any) => {
  return (
    <Box pr={1} pl={1}>
      <Box>
        <PhoneInput
          inputProps={{
            id: "mobileNumber",
            required: true,
            autoFocus: true,
            ...props.formik.getFieldProps("mobileNumber"),
          }}
          specialLabel={""}
          country="ir"
          onlyCountries={["ir"]}
          containerClass="mainContainer"
          inputClass="inputClass"
          inputStyle={{
            borderColor:
              props.formik.errors.mobileNumber &&
              props.formik.touched.mobileNumber &&
              "red",
          }}
          dropdownClass="dropdownClass"
          placeholder={props.placeholder}
        />
      </Box>
    </Box>
  );
};

export default MobilePhone;
