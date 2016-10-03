import { before, error, around } from '../src/index'

describe('advice-class-method', () => {

    const monster = 'monster';
    const robot = 'robot';
    const monsterify = user => user.name = monster;

    class Robot {
        toString() {
            return robot;
        }
    }

    class User {

        @error((err) => new Robot())
        toRobot() {
            throw new Error('Cannot!')
        }

        @before(monsterify)
        toString() {
            return `${this.name} is monster`
        }
    }

    it('before', () => {
        expect(new User().toString()).toBe(`monster is monster`);
    });

    it('error', () => {
        expect(new User().toRobot()).toBeInstanceOf(Robot)
    });
});

describe('advice-function', () => {

    class Pretty {
        toString() { return 'pretty' }
    }

    class Ugly {
        toString() { return 'ugly' }
    }

    it('around', () => {

        function chaos() {
            return new Ugly();
        }

        const decorated = around(orig => {
            expect(orig().toString()).toBe(`ugly`);
            return new Pretty();
        })(chaos);

        expect(decorated().toString()).toBe(`pretty`);

    });
});