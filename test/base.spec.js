import aspect from '../src/index'

describe('base', () => {
    it('field count', () => {
        const fields = Object.keys(aspect);
        expect(fields.length).toBe(4);
        expect(fields).toContain('after');
        expect(fields).toContain('before');
        expect(fields).toContain('error');
        expect(fields).toContain('around');
    });
});