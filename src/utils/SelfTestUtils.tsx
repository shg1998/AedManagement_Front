import React from "react";

export const internalTestConverter = (value: number) => {
    const val = +value;

    if (val === 255) {
        return '✅ Passed';
    }

    if (val < 0 || val > 254) {
        return '⚠️ Invalid';
    }

    const bits = val.toString(2).padStart(8, '0').split('').reverse();

    const failures = [
        bits[0] === '0' && '🛑 SAE Board',
        bits[1] === '0' && '🛑 High Voltage Board',
        bits[2] === '0' && '🛑 MotherBoard Buttons',
        bits[3] === '0' && '🛑 Battery',
        bits[4] === '0' && '🛑 SAE & MotherBoard Communication',
        bits[5] === '0' && '🛑 SAE & High Voltage Communication'
    ].filter(Boolean);

    if (failures.length === 0) {
        return '✅ Passed';
    }

    return (
        <pre style={{fontFamily: 'inherit', textAlign: 'start', margin: 0}}>
    {'❌ Failed\n'}
            {failures.map(line => `  ${line}`).join('\n')}
    </pre>
    );
};

