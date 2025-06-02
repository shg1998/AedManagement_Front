// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React from 'react';

jest.mock("react-dom/client", () => ({
    createRoot: jest.fn().mockImplementation(() => ({
        render: jest.fn()
    }))
}));

jest.unmock('react-i18next')

test('renders without crashing', () => {
    require('./index.tsx');
});
