import Board from '../game/Board';
import body from './bodyTest.html';

describe('Board', () => {
	document.body.innerHTML = body;
	const nunRows = 6;
	const numColumns = 7;
	const board = new Board(nunRows, numColumns);

	describe('createSpaces', () => {
		test('spaces has the expected number of columns', () => {
			expect(board.spaces.length).toEqual(numColumns);
		});

		test('spaces has the expected number of rows', () => {
			const actualNumRows = board.spaces
				.map((array) => array.length)
				.reduce((prev) => {
					if (prev === nunRows) return prev;
				});
			expect(actualNumRows).toEqual(nunRows);
		});
	});

	describe('drawHTMLBoard', () => {
		test('A 2D Board with nunRows * numColumns circle elements is drawn', () => {
			board.drawHTMLBoard();

			const drawnCircles = document.querySelectorAll('circle').length;

			expect(drawnCircles).toEqual(nunRows * numColumns);
		});
	});
});
