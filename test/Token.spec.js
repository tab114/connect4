import Token from '../game/Token';
import Player from '../game/Player';
import Space from '../game/Space';
import body from './bodyTest.html';

describe('Token', () => {
	document.body.innerHTML = body;

	let player, token, intialColumnLocation;

	beforeEach(() => {
		player = new Player('Jizanthapus', 1, '#e15258', true);
		token = new Token(1, player);
		token.columnLocation = 0;
		intialColumnLocation = token.columnLocation;

		const existingToken = document.getElementById(token.id);
		if (existingToken) existingToken.remove();

		token.drawHTMLToken();
	});

	describe('drawHTMLToken', () => {
		test('Token is drawn in the boards underlay with defined id', () => {
			const drawnToken = document.getElementById(token.id);

			expect(drawnToken).toBeDefined();
		});
	});

	describe('moveLeft', () => {
		test('columnLocation number not reducing since initially 0', () => {
			token.moveLeft();

			expect(token.columnLocation).toEqual(intialColumnLocation);
		});

		test('columnLocation number reduces when greater than 0', () => {
			token.columnLocation = 3;
			intialColumnLocation = token.columnLocation;

			token.moveLeft();

			expect(token.columnLocation).toEqual(intialColumnLocation - 1);
		});
	});

	describe('moveRight', () => {
		test('columnLocation number increases by 1, when with default 0 value', () => {
			token.moveRight(7);

			expect(token.columnLocation).toEqual(intialColumnLocation + 1);
		});

		test('left style is increasing by 76px', () => {
			const expecteOffsetStyle = `${token.htmlToken.offsetLeft + 76}px`;

			token.moveRight(7);

			expect(token.htmlToken.style.left).toEqual(expecteOffsetStyle);
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
