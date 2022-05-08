import Token from '../game/Token';
import Player from '../game/Player';
import body from './bodyTest.html';
import Space from '../game/Space';

describe('Token', () => {
	document.body.innerHTML = body;
	const player = new Player('Jizanthapus', 1, '#e15258', true);
	const token = new Token(1, player);

	describe('drawHTMLToken', () => {
		test('Token is drawn in the boards underlay with defined id', () => {
			token.drawHTMLToken();

			const drawnToken = document.getElementById(token.id);

			expect(drawnToken).toBeDefined();
		});
	});

	let intialColumnLocation;

	beforeEach(() => {
		token.columnLocation = 0;
		intialColumnLocation = token.columnLocation;
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
			token.drawHTMLToken();
			const expecteOffsetStyle = `${token.offsetLeft + 76}px`;
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
