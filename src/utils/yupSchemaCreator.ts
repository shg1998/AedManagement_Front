import * as yup from "yup";

export interface ValidationConfig {
  name: string;
  validationType: string;
  validations?: {
    type: string;
    params?: any[];
  }[];
}

export function createYupSchema(
  schema: yup.ObjectSchema<any>,
  config: ValidationConfig
): yup.ObjectSchema<any> {
  const { name, validationType, validations = [] } = config;
  if (!yup[validationType as keyof typeof yup]) {
    return schema;
  }
  //@ts-ignore
  let validator: yup.AnySchema = yup[validationType as keyof typeof yup]();
  validations.forEach((validation) => {
    const { params, type } = validation;
    if (!validator[type as keyof typeof validator]) {
      return;
    }
    validator = validator[type as keyof typeof validator](...(params || []));
  });
  //@ts-ignore
  schema[name] = validator;
  return schema;
}
