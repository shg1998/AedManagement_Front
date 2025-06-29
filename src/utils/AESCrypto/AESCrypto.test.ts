
import 'jest-localstorage-mock';
import {deleteItemSecure, getItemSecure, setItemSecure} from "./AESCrypto";


const SECRET = 'vzCDrMA7xLS8Xzyk';
beforeEach(() => {
    // Clear the localStorage mock before each test
    localStorage.clear();
});

describe('setItemSecure', () => {
    it('should set an item securely in localStorage', () => {
        // Mock the value to be set
        const key = 'testKey';
        const value = 'testValue';

        // Call the function being tested
        setItemSecure(key, value);

        // Retrieve the encrypted item from localStorage
        const encryptedData = localStorage.getItem(key);

        // Assert that the item is set and encrypted
        expect(encryptedData).not.toBeNull();
        expect(encryptedData).not.toBe(value); // Encrypted data should not match the original value
    });
});

describe('getItemSecure', () => {

    it('should return undefined if the key is not found', () => {
        const key = 'nonExistentKey';
        const result = getItemSecure(key);
        expect(result).toBeUndefined();
    });
});

describe('deleteItemSecure', () => {
    it('should remove an item securely from localStorage', () => {
        // Mock the data in localStorage
        const key = 'testKey';
        const value = 'testValue';
        localStorage.setItem(key, value);

        // Call the function being tested
        deleteItemSecure(key);

        // Assert that the item is removed from localStorage
        expect(localStorage.getItem(key)).toBeUndefined();
    });
});
