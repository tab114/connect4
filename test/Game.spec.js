import Game from '../game/Game';
import Token from '../game/Token';
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

		test('Games ready property switches to true when game starts', () => {
			expect(game.ready).toBeTruthy();
		});
	});

	describe('handleKeydown', () => {
		const token = game.activePlayer.activeToken;
		test('Active player token moves on the right on ArrowRight', () => {
			const expecteOffsetStyle = `${token.htmlToken.offsetLeft + 76}px`;
			const eventFaked = {key: 'ArrowRight'};

			game.handleKeydown(eventFaked);

			expect(token.htmlToken.style.left).toEqual(expecteOffsetStyle);
		});
	});

	describe('playToken', () => {
		test('Token dropped in Board and exists in DOM', () => {
			const token = game.activePlayer.activeToken;

			game.playToken();

			const tokenInDom = document.getElementById(token.id);

			expect(tokenInDom).toBeDefined();
		});
	});

	describe('checkForWin', () => {
		test('Identifies 4 consequent vertical tokens in the board', () => {
			game.board.spaces[0][0].mark(new Token(1, game.activePlayer));
			game.board.spaces[0][1].mark(new Token(2, game.activePlayer));
			game.board.spaces[0][2].mark(new Token(3, game.activePlayer));
			game.board.spaces[0][3].mark(new Token(4, game.activePlayer));

			const target = game.board.spaces[0][0];
			const playerWon = game.checkForWin(target);

			expect(playerWon).toBeTruthy();
		});

		test('Identifies 4 consequent horizontal tokens in the board', () => {
			game.board.spaces[1][0].mark(new Token(5, game.activePlayer));
			game.board.spaces[2][0].mark(new Token(6, game.activePlayer));
			game.board.spaces[3][0].mark(new Token(7, game.activePlayer));

			const target = game.board.spaces[0][0];
			const playerWon = game.checkForWin(target);

			expect(playerWon).toBeTruthy();
		});

		test('Identifies 4 consequent diagonal tokens in the board', () => {
			game.board.spaces[1][3].mark(new Token(8, game.activePlayer));
			game.board.spaces[2][4].mark(new Token(9, game.activePlayer));
			game.board.spaces[3][5].mark(new Token(10, game.activePlayer));

			const target = game.board.spaces[0][0];
			const playerWon = game.checkForWin(target);

			expect(playerWon).toBeTruthy();
		});
	});

	describe('gameOver', () => {
		test('game over message displayed in the board', () => {
			const message = 'You won well done';
			game.gameOver(message);

			const displayedMessage =
				document.getElementById('game-over').textContent;

			expect(message).toEqual(displayedMessage);
		});
	});
});
