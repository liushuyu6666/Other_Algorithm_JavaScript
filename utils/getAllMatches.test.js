import { getAllMatches } from './getAllMatches';

describe('getAllMatches', () => {
    it('Should return right indexes.', () => {
        const string = 'abcxyxyxyzdefxyzghxy';
        const pattern = 'xyxy';

        const indexes = getAllMatches(string, pattern);

        expect(indexes).toEqual([3, 5]);
    });

    it('Should return right indexes.', () => {
        const string = 'BcJ2Zr3QVtABfb0NBz';
        const pattern = 'B';

        const indexes = getAllMatches(string, pattern);

        expect(indexes).toEqual([0, 11, 16]);
    });
});
