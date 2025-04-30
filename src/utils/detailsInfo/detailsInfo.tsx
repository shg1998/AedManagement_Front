import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import HorizontalRuleIcon from "@mui/icons-material/HorizontalRule";
import React from "react";
import {Avatar, Typography} from "@mui/material";
import {getBaseUrl} from "../../config";

export const highLevel = (text:string) =>{return <div style={{display:'flex',alignItems:'center',gap:'0.5rem'}}><ArrowUpwardIcon color={'error'} /><div>{text}</div></div>}

export const lowLevel = (text:string) =>{return <div style={{display:'flex',alignItems:'center',gap:'0.5rem'}}><ArrowDownwardIcon color={'success'} /><div>{text}</div></div>}

export const midLevel = (text:string) =>{return <div style={{display:'flex',alignItems:'center',gap:'0.5rem'}}><HorizontalRuleIcon color={'primary'} /><div>{text}</div></div>}


export const handleLikelihoodType = (likelihood: any) => {
    switch (likelihood) {
        case "very_low":
            return lowLevel("بسیار ضعیف")
        case "low":
            return lowLevel("ضعیف")
        case "medium":
            return midLevel("متوسط")
        case "high":
            return highLevel('بالا')
        case "very_high":
            return highLevel('بسیار بالا')
        default:
            return lowLevel("بسیار ضعیف")
    }
};

export const handleCreator = (creator:any , hasSubTitle:boolean) => {
    return <div
        style={{
            display: "flex",
            alignItems: "center",
            justifyContent:'center',
            gap: "0.5rem",
        }}
    >
        <div>
            <Avatar
                sx={{ width: 35, height: 35 }}
                alt={creator?.image_url}
                src={
                    creator?.image_url
                        ? getBaseUrl().replace("api/", "") +
                        creator?.image_url
                        : ""
                }
            />
        </div>
        <div>
            <div>
                {creator?.first_name +
                    " " +
                    creator?.last_name}
            </div>
            {hasSubTitle &&
                <Typography color="text.secondary">
                    ایجاد کننده
                </Typography>
            }
        </div>
    </div>
}