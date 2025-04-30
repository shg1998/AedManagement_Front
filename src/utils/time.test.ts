import { render, screen } from '@testing-library/react';
import {
    getJalaliDate,
    getJalaliTime,
    getJalaliDateTime,
} from './time';
import moment from 'jalali-moment';

jest.mock('jalali-moment', () => ({
    __esModule: true,
    default: jest.fn(),
}));

jest.mock('jalaali-js', () => ({
    __esModule: true,
    toJalaali: jest.fn(),
}));

describe('getJalaliDate', () => {
    test('should convert Gregorian date to Jalali date', () => {
        const gregorianDate = '2023/08/02';
        const separator = '/';

        // @ts-ignore
        moment.mockReturnValueOnce({ locale: () => ({ format: () => '1402/05/11' }) });

        const result = getJalaliDate(gregorianDate, separator);

        expect(result).toBe('1402/05/11');
    });
});

describe('getJalaliTime', () => {
    test('should convert Gregorian date to Jalali time', () => {
        const gregorianDate = '2023/08/02 12:34:56';

        // @ts-ignore
        moment.mockReturnValueOnce({ locale: () => ({ format: () => '12:34:56  1402/05/11' }) });

        const result = getJalaliTime(gregorianDate);

        expect(result).toBe('12:34:56  1402/05/11');
    });
});

describe('getJalaliDateTime', () => {
    test('should convert Gregorian date to Jalali date and time', () => {
        const gregorianDate = '2023/08/02 12:34:56';
        const separator = '/';

        // @ts-ignore
        moment.mockReturnValueOnce({ locale: () => ({ format: () => '12:34:56  1402/05/11' }) });

        const result = getJalaliDateTime(gregorianDate, separator);

        expect(result).toBe('12:34:56  1402/05/11');
    });
});
