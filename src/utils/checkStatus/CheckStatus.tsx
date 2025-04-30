import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import WarningIcon from "@mui/icons-material/Warning";
import React from "react";

export interface checkStatusPropTypes {
  status: string;
}

const CheckStatus: React.FC<checkStatusPropTypes> = ({ status }) => {
  return (
    <>
      {status === "active" ? (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "0.5rem",
          }}
        >
          <CheckCircleIcon
            data-testid={"check-circle-icon"}
            sx={{
              fill: "green !important",
              fontSize: "2rem!important",
              width: "25px",
            }}
          />
          فعال
        </div>
      ) : status === "deactive" ? (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "0.5rem",
            paddingRight: "20px",
          }}
        >
          <CancelIcon
            data-testid={"cancel-icon"}
            sx={{
              fill: "red !important",
              fontSize: "2rem!important",
              width: "25px",
            }}
          />
          غیر فعال
        </div>
      ) : status === "temporary_suspension" ? (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "0.5rem",
            paddingRight: "30px",
          }}
        >
          <WarningIcon
            data-testid={"warning-icon"}
            sx={{
              fill: "#ff9800 !important",
              fontSize: "2rem!important",
              width: "25px",
            }}
          />
          تعلیق موقت
        </div>
      ) : (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "0.5rem",
            paddingRight: "30px",
          }}
        >
          <WarningIcon
            data-testid={"warning-icon"}
            sx={{
              fill: "#ff9800 !important",
              fontSize: "2rem!important",
              width: "25px",
            }}
          />
          تعلیق دائم
        </div>
      )}
    </>
  );
};

export default CheckStatus;
