import "react-datepicker/dist/react-datepicker.css";
import MyDateTimePicker from "../DateTimePicker Jalali/DateTimePicker";
import { ValueEditor, ValueEditorProps } from "react-querybuilder";

import { fields } from "../../utils/queryBuilderConfig/fields";
import MySelect from "../MySelect/MySelect";

const removeCharsAfterZ = (str: string): string => {
  return str;
};
function getInputType(fields: any, path: any) {
  const pathParts = path.split(".");
  if (pathParts[0] === "document" && pathParts[1] === "Incidents") {
    pathParts[0] = "document.Incidents";
    pathParts.splice(1, 1);
  }
  let currentFields = fields;
  for (let i = 0; i < pathParts.length - 1; i++) {
    const currentName = pathParts[i];
    currentFields = currentFields?.find(
      (fld: any) => fld.name == currentName
    ).children;
  }
  const lastPart = pathParts[pathParts.length - 1];
  const targetType = currentFields.find(
    (field: any) => field.name === lastPart
  );
  console.log("targetType", targetType);
  return { itemType: targetType.inputType, items: targetType.values };
}

export const CustomValueEditor = (props: ValueEditorProps, fieldData: any) => {
  const dataTypeUsingPath = getInputType(fields, props.fieldData?.name);
  if (
    dataTypeUsingPath.itemType === "date" ||
    props?.fieldData?.inputType === "date"
  ) {
    return (
      <MyDateTimePicker
        name="DateTimePicker"
        blur={() => {}}
        value={!props.value ? "" : props.value}
        onChangeFunc={(d: any) => {
          props.handleOnChange(d ? removeCharsAfterZ(d) : "");
        }}
        isQueryBuilderValue={true}
      />
    );
  } else if (
    dataTypeUsingPath.itemType === "select" ||
    props?.fieldData?.inputType === "select"
  ) {
    return (
      <MySelect
        name={"select_Type_fields"}
        label={""}
        value={!props.value ? "" : props.value}
        items={dataTypeUsingPath.items}
        isQueryBuilderValue={true}

        change={(d: any) => {
          props.handleOnChange(d.target.value ? d.target.value : "");
        }}
      />
    );
  }
  return <ValueEditor {...props} />;
};
