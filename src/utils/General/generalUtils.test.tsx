import { render, screen } from '@testing-library/react';
import { convertObjectToIdList, getBoldContent, showScore } from './generalUtils';
import CVSSScore from '../../components/CVSSScore/CVSSScore';

// Mock the CVSSScore component
jest.mock('../../components/CVSSScore/CVSSScore', () => {
    return function MockCVSSScore(props:any) {
        return <div data-testid="cvss-score">{props.score}</div>;
    };
});

describe('convertObjectToIdList', () => {
    test('should return an array of ids if data has ids', () => {
        const data = [
            { id: 1, name: 'Item 1' },
            { id: 2, name: 'Item 2' },
            { id: 3, name: 'Item 3' },
        ];

        const result = convertObjectToIdList(data);

        expect(result).toEqual([1, 2, 3]);
    });

    test('should return the data itself if it does not have ids', () => {
        const data = [{ name: 'Item 1' }, { name: 'Item 2' }, { name: 'Item 3' }];

        const result = convertObjectToIdList(data);

        expect(result).toEqual(data);
    });

    test('should return an empty array if data is empty', () => {
        const data:any[] = [];

        const result = convertObjectToIdList(data);

        expect(result).toEqual([]);
    });
});

describe('getBoldContent', () => {
    test('should wrap the item in a Typography component with bold style', () => {
        const item = 'Hello, World!';

        render(getBoldContent(item));

        const typographyElement = screen.getByText(item);
        expect(typographyElement).toBeInTheDocument();
        expect(typographyElement).toHaveStyle('font-weight: 700');
    });
});

describe('showScore', () => {
    test('should render the CVSSScore component with the provided score', () => {
        const score = 8.5;

        render(showScore(score));

        const cvssScoreElement = screen.getByTestId('cvss-score');
        expect(cvssScoreElement).toBeInTheDocument();
        expect(cvssScoreElement.textContent).toBe(score.toString());
    });
});
