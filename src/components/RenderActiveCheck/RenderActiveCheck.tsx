import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import React from "react";

export interface RenderActiveCheckPropTypes {
    active: string
}
const RenderActiveCheck:React.FC<RenderActiveCheckPropTypes> = ({active})=>{
    return active === "active" ? (
      <CheckCircleIcon
        sx={{
          color: "green",
          fontSize: "1.5rem!important",
        }}
      />
    ) : (
      <CancelIcon
        sx={{
          color: "red",
          fontSize: "1.5rem!important",
        }}
      />
    );
}

export default RenderActiveCheck;