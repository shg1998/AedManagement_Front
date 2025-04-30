import { TOPIC_COLORS } from './color'; // Adjust the path if necessary

describe('TOPIC_COLORS', () => {
    it('should contain valid hexadecimal color strings', () => {
        const hexColorRegex = /[0-9A-Fa-f]{6}/g;
        for (const color of TOPIC_COLORS) {
            expect(color).toMatch(hexColorRegex);
        }
    });

    it('should have unique colors', () => {
        const uniqueColors = new Set(TOPIC_COLORS);
        expect(uniqueColors.size).toBe(TOPIC_COLORS.length);
    });
});
