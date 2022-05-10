import Game from '../game/Game';
import Token from '../game/Token';
import body from './bodyTest.html';

describe('Game', () => {
	document.body.innerHTML = body;

	let game, token;

	beforeEach(() => {
		game = new Game();
		game.startGame();
		token = game.activePlayer.activeToken;

		const existingToken = document.getElementById(token.id);
		if (existingToken) existingToken.remove();

		token.drawHTMLToken();
	});

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
		test('Active player token moves on the right on ArrowRight', () => {
			console.log(
				'token.htmlToken.style.left',
				token.htmlToken.style.left,
			);
			const expectLeftStyle = '76px';
			const eventFaked = {key: 'ArrowRight'};

			game.handleKeydown(eventFaked);

			expect(token.htmlToken.style.left).toEqual(expectLeftStyle);
		});

		test('Active player token moves on the left on ArrowLeft', () => {
			const expectLeftStyle = '';
			const eventFaked = {key: 'ArrowLeft'};

			game.handleKeydown(eventFaked);

			expect(token.htmlToken.style.left).toEqual(expectLeftStyle);
		});

		test('playToken is called on ArrowDown', () => {
			const eventFaked = {key: 'ArrowDown'};

			game.handleKeydown(eventFaked);

			const spaces = game.board.spaces;

			expect(spaces).toBeDefined();
		});
	});

	describe('playToken', () => {
		test('Token dropped in Board and exists in DOM', () => {
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
			game.board.spaces[0][0].mark(new Token(1, game.activePlayer));
			game.board.spaces[1][0].mark(new Token(5, game.activePlayer));
			game.board.spaces[2][0].mark(new Token(6, game.activePlayer));
			game.board.spaces[3][0].mark(new Token(7, game.activePlayer));

			const target = game.board.spaces[0][0];
			const playerWon = game.checkForWin(target);

			expect(playerWon).toBeTruthy();
		});

		test('Identifies 4 consequent diagonal tokens in the board', () => {
			game.board.spaces[0][0].mark(new Token(1, game.activePlayer));
			game.board.spaces[1][1].mark(new Token(8, game.activePlayer));
			game.board.spaces[2][2].mark(new Token(9, game.activePlayer));
			game.board.spaces[3][3].mark(new Token(10, game.activePlayer));

			const target = game.board.spaces[0][0];
			const playerWon = game.checkForWin(target);

			expect(playerWon).toBeTruthy();
		});

		test('Identifies 4 consequent diagonal tokens in the board (inversed case)', () => {
			game.board.spaces[3][0].mark(new Token(8, game.activePlayer));
			game.board.spaces[2][1].mark(new Token(9, game.activePlayer));
			game.board.spaces[1][2].mark(new Token(10, game.activePlayer));
			game.board.spaces[0][3].mark(new Token(10, game.activePlayer));

			const target = game.board.spaces[3][0];
			const playerWon = game.checkForWin(target);

			expect(playerWon).toBeTruthy();
		});
	});

	describe('updateGameState', () => {
		test('Switches user if game not finished', () => {
			const initialActivePlayer = game.activePlayer;
			const target = game.board.spaces[3][0];

			game.updateGameState(token, target);

			expect(game.activePlayer).not.toEqual(initialActivePlayer);
		});

		test('Game is over when no more tokens for the user', () => {
			game.players[1].tokens.forEach((token) => (token.dropped = true));
			const target = game.board.spaces[3][0];

			game.updateGameState(token, target);

			const expectedMessage = 'No more tokens';
			const displayedMessage =
				document.getElementById('game-over').textContent;

			expect(displayedMessage).toEqual(expectedMessage);
		});

		test('Game is over when player wins', () => {
			game.board.spaces[0][0].mark(new Token(1, game.activePlayer));
			game.board.spaces[1][0].mark(new Token(5, game.activePlayer));
			game.board.spaces[2][0].mark(new Token(6, game.activePlayer));

			const target = game.board.spaces[3][0];

			game.updateGameState(token, target);

			const expectedMessage = `${target.owner.name} wins!`;
			const displayedMessage =
				document.getElementById('game-over').textContent;

			expect(displayedMessage).toEqual(expectedMessage);
		});
	});

	describe('gameOver', () => {
		test('game over message displayed in the board', () => {
			const message = 'You won well done';

			game.gameOver(message);

			const displayedMessage =
				document.getElementById('game-over').textContent;

			expect(displayedMessage).toEqual(message);
		});
	});
});
