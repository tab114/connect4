import Game from '../game/Game';

describe('Game', () => {
	let game;
  
	beforeAll(() => {
		game = new Game();
	});

	test('start game', () => {
		game.startGame();
    });
})
