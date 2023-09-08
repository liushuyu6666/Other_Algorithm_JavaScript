import { generateRandomString } from '../utils/generateRandomString';
import { getRandomNumberBetween } from '../utils/getRandomNumberBetween';
import kMP, { getNextArray } from './kMP';

describe('getNextArray', () => {
    it('When the prefix-like substring is abcabt.', () => {
        const pattern = 'abcabtxyabcabt';
        const next = [0, 0, 0, 1, 2, 0, 0, 0, 1, 2, 3, 4, 5, 6];

        expect(getNextArray(pattern)).toEqual(next);
    });

    it('When the prefix-like substring restart.', () => {
        const pattern = 'abcabtxyabcaba';
        const next = [0, 0, 0, 1, 2, 0, 0, 0, 1, 2, 3, 4, 5, 1];

        expect(getNextArray(pattern)).toEqual(next);
    });

    it('When the prefix-like substring need to be shorten.', () => {
        const pattern = 'abcabtxyabcabc';
        const next = [0, 0, 0, 1, 2, 0, 0, 0, 1, 2, 3, 4, 5, 3];

        expect(getNextArray(pattern)).toEqual(next);
    });
});

describe('KMP', () => {
    it('Pattern should match string.', () => {
        let durationOfKMP = 0,
            durationOfIndexOf = 0,
            startTime = 0,
            endTime = 0,
            nano = 0;
        for (let len = 10; len < 200; len++) {
            for (let t = 0; t < 100; t++) {
                const string = generateRandomString(len);
                const startIdx = getRandomNumberBetween(0, len);
                const endIdx = getRandomNumberBetween(startIdx, len);
                const pattern = string.substring(startIdx, endIdx);

                startTime = process.hrtime();
                const received = kMP(string, pattern);
                [endTime, nano] = process.hrtime(startTime);
                durationOfKMP += endTime * 1000 + nano * 1e-6;

                startTime = process.hrtime();
                const expected = string.indexOf(pattern);
                [endTime, nano] = process.hrtime(startTime);
                durationOfIndexOf += endTime * 1000 + nano * 1e-6;

                expect(received).toBe(expected);
            }
        }

        console.log(
            `KMP spends ${durationOfKMP}ms vs build-in function spends ${durationOfIndexOf}ms`,
        );
    });

    it('Pattern should not match string.', () => {
        for (let len = 100; len < 200; len++) {
            for (let t = 0; t < 100; t++) {
                const rand = getRandomNumberBetween(0, len);
                const string = generateRandomString(len);
                let pattern = generateRandomString(len - rand);

                expect(kMP(string, pattern)).toBe(string.indexOf(pattern));
            }
        }
    });
});
