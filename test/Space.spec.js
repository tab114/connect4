const Space = require('../game/Space');

describe('Space', () => {
	let x,y;
  
	beforeAll(() => {
		x = 0;
		y = 0;
	});

	test('Space is created with expected id', () => {
		const space = new Space(x, y);
		const id = space.id;
        expect(id ).toEqual(`space-0-0`);
    });
})
