import * as yup from 'yup';
import {createYupSchema, ValidationConfig} from './yupSchemaCreator';

describe('createYupSchema', () => {
    test('should return the original schema if validationType is not found in yup', () => {
        const schema = yup.object({});
        const config: ValidationConfig = {
            name: 'field',
            validationType: 'InvalidValidationType',
        };

        const result = createYupSchema(schema, config);

        expect(result).toBe(schema);
    });

    test('should return the original schema if validator type is not found in yup', () => {
        const schema = yup.object({});
        const config: ValidationConfig = {
            name: 'field',
            validationType: 'string',
            validations: [{type: 'InvalidValidatorType'}],
        };

        const result = createYupSchema(schema, config);

        expect(result).toBe(schema);
    });
});
