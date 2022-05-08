import Game from '../game/Game';
import body from './bodyTest.html';

describe('Game', () => {
	document.body.innerHTML = body;
	const game = new Game();

	game.startGame();

	describe('startGame', () => {
		test('Board is drawn on start', () => {
			const drawnCircles = document.querySelectorAll('circle').length;
			expect(drawnCircles).toEqual(6 * 7);
		});

		test('Token is drawn for active player', () => {
			const activeTokenId = game.activePlayer.activeToken.id;
			const drawnToken = document.getElementById(activeTokenId);

			expect(drawnToken).toBeDefined();
		});

		test('Games ready property switches to true when game ', () => {
			expect(game.ready).toBeTruthy();
		});
	});

	describe('handleKeydown', () => {
		test('Active player token moves on the right on ArrowRight', () => {
			const token = game.activePlayer.activeToken;
			const expecteOffsetStyle = `${token.offsetLeft + 76}px`;

			game.handleKeydown('ArrowRight');

			expect(token.htmlToken.style.left).toEqual(expecteOffsetStyle);
		});
	});
});
