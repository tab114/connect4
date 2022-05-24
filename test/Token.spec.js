import Token from '../game/Token';
import Player from '../game/Player';
import Space from '../game/Space';
import body from './bodyTest.html';

describe('Token', () => {
	document.body.innerHTML = body;

	const changeOffsetLeft = (value) =>
		Object.defineProperty(HTMLElement.prototype, 'offsetLeft', {
			configurable: true,
			value: value + 16,
		});

	let player, token, htmlToken;

	beforeEach(() => {
		player = new Player('Jizanthapus', 1, '#e15258', true);
		token = new Token(1, player);
		token.columnLocation = 0;

		const existingToken = document.getElementById(token.id);
		if (existingToken) existingToken.remove();

		token.drawHTMLToken();
		htmlToken = token.htmlToken;
	});

	describe('drawHTMLToken', () => {
		test('Token is drawn in the boards underlay with defined id', () => {
			const drawnToken = document.getElementById(token.id);

			expect(drawnToken).toBeDefined();
		});
	});

	describe('moveRight', () => {
		test('Token not moving on the right if set on 7th column', () => {
			token.moveRight(7);
			changeOffsetLeft(76);

			token.moveRight(7);
			changeOffsetLeft(76 * 2);

			token.moveRight(7);
			changeOffsetLeft(76 * 3);

			token.moveRight(7);
			changeOffsetLeft(76 * 4);

			token.moveRight(7);
			changeOffsetLeft(76 * 5);

			token.moveRight(7);
			changeOffsetLeft(76 * 6);

			const intialColumnLocation = token.columnLocation;
			const expecteOffsetStyle = `${htmlToken.offsetLeft}px`;
			token.moveRight(7);

			expect(token.columnLocation).toEqual(intialColumnLocation);
			expect(htmlToken.style.left).toEqual(expecteOffsetStyle);
		});

		test('Token moves on the right if set on 6th column or less', () => {
			const intialColumnLocation = token.columnLocation;
			const expecteOffsetStyle = `${token.htmlToken.offsetLeft + 76}px`;
			token.moveRight(7);

			expect(token.columnLocation).toEqual(intialColumnLocation + 1);
			expect(htmlToken.style.left).toEqual(expecteOffsetStyle);
		});
	});

	describe('moveLeft', () => {
		test('Token not moving on the left if set on 1th column', () => {
			const intialColumnLocation = token.columnLocation;

			token.moveLeft();

			if (token.columnLocation > 0) changeOffsetLeft(-76);
			const expecteOffsetStyle = '';

			expect(token.columnLocation).toEqual(intialColumnLocation);
			expect(htmlToken.style.left).toEqual(expecteOffsetStyle);
		});

		test('Token moves on the left if set on 2th column or greater', () => {
			changeOffsetLeft(0);

			token.moveRight(7);
			changeOffsetLeft(76);

			const intialColumnLocation = token.columnLocation;
			const expecteOffsetStyle = '16px';

			token.moveLeft();
			changeOffsetLeft(-76);

			expect(token.columnLocation).toEqual(intialColumnLocation - 1);
			expect(htmlToken.style.left).toEqual(expecteOffsetStyle);
		});
	});

	describe('drop', () => {
		test('Token is dropped on the specified space', () => {
			const target = new Space(0, 0);
			const reset = () => console.log('faked reset callback');

			token.drop(target, reset);

			const droppedHtmlToken = token.htmlToken;
			const expectedTopStyle = `${target.y * target.diameter}px`;

			expect(droppedHtmlToken.style.top).toEqual(expectedTopStyle);
		});
	});
});
