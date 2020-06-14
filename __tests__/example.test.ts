const sum = (a: number, b: number): number => {
    return a + b;
}

describe('Init test sum', () => {
    it('sum 2 numbers', async () => {
        expect(sum(2, 3)).toBe(5);
    })
})