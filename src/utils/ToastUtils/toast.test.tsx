import { supportsVibrate } from "./toast";

jest.mock('react-toastify', () => ({
    toast: jest.fn(),
}));

// Mock window.navigator.vibrate method
Object.defineProperty(window.navigator, 'vibrate', {
    value: jest.fn(),
    writable: true,
});

describe('supportsVibrate', () => {
    test('should return false if "vibrate" is\'nt supported in window.navigator', () => {
        expect(supportsVibrate).toBe(false);
    });
});