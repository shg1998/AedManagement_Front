import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import * as React from "react";
import { useEffect, useRef, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { useThemeContext } from "../../ThemeContext";

export interface DynamicAddInputPropTypes {
  label: string;
  formik: any;
  name: string;
  value?: any;
  blur?: () => void;
  handleChangeProps: (other: any) => any;
}
const DynamicAddInput: React.FC<DynamicAddInputPropTypes> = ({
  label,
  formik,
  name,
  value,
  blur,
  handleChangeProps,
}) => {
  const myRef = useRef(null);

  const [data, setData] = useState(value ? value : []);

  /* eslint-disable */
  useEffect(() => {
    let temp: any[] = [];
    data.forEach((item: any) => {
      temp.push(item.title);
    });
    if (formik !== null) {
      formik.setFieldValue(name, temp);
    } else {
      handleChangeProps(temp);
    }
  }, [data]);

  useEffect(() => {
    blur && blur();
  }, [formik?.values?.[name]]);

  const addHandler = () => {
    // @ts-ignore
    if (myRef.current.value.trim() !== "") {
      // @ts-ignore
      setData((prev: any) => [
        ...prev,
        //@ts-ignore
        { title: myRef?.current.value.trim(), error: "" },
      ]);
      // @ts-ignore
      myRef.current.value = null;
    }
  };

  const deleteHandler = (id: any) => {
    setData((ans: any) => [
      ...ans.filter((item: any, index: number) => index !== id),
    ]);
  };

  const { theme } = useThemeContext();
  return (
    <>
      <div style={{ margin: "30px 0 1rem" }}>{label}</div>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "0.5rem",
          flexWrap: "wrap",
        }}
      >
        <TextField
          inputRef={myRef}
          InputProps={{
            sx: {
              width: "100%",
            },
          }}
          sx={{
            flexGrow: 1,
          }}
        />
        <Button
          onClick={addHandler}
          color={"primary"}
          startIcon={<AddIcon sx={{ marginRight: "-8px" }} />}
          sx={{
            borderRadius: "0.2rem!important",
            padding: "0.85rem 0.7rem!important",
            backgroundColor: `${theme.palette.secondary.dark} !important`,
            border: `1px solid gray !important`,
            display: "flex",
            gap: "0.5rem",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          افزودن
        </Button>
      </div>
    </>
  );
};

export default DynamicAddInput;
