import React from "react";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";

export interface checkStatusPropTypes {
    status: boolean;
}

const BooleanCheckStatus: React.FC<checkStatusPropTypes> = ({ status }) => {
    return (
        <>
            {status ? (
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
                    Active
                </div>
            ) : (
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
                    Not Active
                </div>
            )
            }
        </>
    );
};

export default BooleanCheckStatus;
