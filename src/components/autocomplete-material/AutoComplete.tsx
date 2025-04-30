import * as React from "react";
import { Autocomplete as MaterialAutocomplete } from "@material-ui/lab";
import { AutoCompletePropsInterface } from "./interfaces";
import { TextField } from "@mui/material";
import parse from "autosuggest-highlight/parse";
import match from "autosuggest-highlight/match";
const AutocompleteFilter: React.FC<AutoCompletePropsInterface> = (props) => {
  const { id, label, className, value, options, prefix, onChange, disabled } =
    props;

  // const handleChange = (e: any) => {
  //   onChange();
  //   blur();
  // };
  return (
    <MaterialAutocomplete
      autoHighlight={true}
      size="small"
      id={id}
      //@ts-ignore
      className={className}
      options={options}
      value={value}
      getOptionLabel={(option) => option.replace(prefix, "")}
      onChange={onChange}
      disabled={disabled != undefined ? disabled : false}
      renderInput={(params) => (
        <TextField {...params} label={label} variant="outlined" />
      )}
      renderOption={(option: any, { inputValue }: any): any => {
        let opt = option.replace(prefix, "");
        const matches = match(opt, inputValue);
        const parts = parse(opt, matches);

        return (
          <li style={{ direction: "ltr" }}>
            <div>
              {parts.map((part: any, index: any) => (
                <span
                  key={index}
                  style={{
                    fontWeight: part.highlight ? 700 : 400,
                  }}
                >
                  {part.text}
                </span>
              ))}
            </div>
          </li>
        );
      }}
    />
  );
};
export default AutocompleteFilter;
