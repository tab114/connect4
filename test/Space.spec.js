import Space from '../game/Space';
import Token from '../game/Token';
import Player from '../game/Player';
import body from '../test/bodyTest.html';

describe('Space', () => {
	document.body.innerHTML = body;
	let x,y,owner,space,token,id;
  
	beforeAll(() => {
		x = 0;
		y = 0;
		space = new Space(x, y);
		owner = new Player('Player 1', 1, '#e15258', true);
		token = new Token(0, owner);
		id = space.id;
	});

	test('Space is created with expected id', () => {
        expect(id).toEqual(`space-0-0`);
    });

	test('Space is marked when token drops and with the correct token', () => {
		space.mark(token);

		expect(space.token).toEqual(token);
    });

	test('Space is also marked with the correct owner', () => {
		expect(space.owner).toEqual(owner);
    });

	test('Space is drawn in the board/dom with the expected id attribute', () => {
		space.drawSVGSpace();
		
		const spaceInDom = document.getElementById(id);

		expect(spaceInDom).toBeDefined();
    });
})
