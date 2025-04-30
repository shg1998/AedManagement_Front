import { defaultOperators } from "react-querybuilder";
import { fields } from "./fields";

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
  return targetType.inputType;
}

export const getFieldOperators: any = (path: string) => {
  const inputeType = getInputType(fields, path);
  if (inputeType)
    switch (inputeType) {
      case "text":
        return [
          { name: "=", label: "is" },
          { name: "!=", label: "is not" },
          ...defaultOperators.filter((op) =>
            [
              "contains",
              "beginsWith",
              "endsWith",
              "doesNotContain",
              "doesNotBeginWith",
              "doesNotEndWith",
              "in",
              "notIn",
            ].includes(op.name)
          ),
        ];
      case "number":
        return [
          ...defaultOperators.filter((op) => ["=", "!="].includes(op.name)),
          { name: "<", label: "less than" },
          { name: "<=", label: "less than or equal to" },
          { name: ">", label: "greater than" },
          { name: ">=", label: "greater than or equal to" },
          ...defaultOperators.filter((op) =>
            ["null", "notNull"].includes(op.name)
          ),
        ];
      case "select":
        return [
          ...defaultOperators.filter((op) => ["=", "!="].includes(op.name)),
        ];
      case "date":
        return [
          { name: "=", label: "on" },
          { name: "!=", label: "not on" },
          { name: "<", label: "before" },
          { name: "<=", label: "on or before" },
          { name: ">", label: "after" },
          { name: ">=", label: "on or after" },
        ];
    }
  return defaultOperators;
};
