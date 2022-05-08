import Player from '../game/Player';
import body from './bodyTest.html';

describe('Player', () => {
	const name = 'Jizanthapus';
	const id = 1;
	const color = '#e15258';

	const player = new Player(name, id, color);

	describe('createTokens', () => {
		test('21 Tokens are created for specified Player', () => {
			const tokens = player.tokens;

			expect(tokens.length).toEqual(21);
			expect(tokens[7].owner.name).toEqual(name);
		});
	});

	describe('unusedTokens', () => {
		test('unusedTokens returns all players tokens that are not dropped', () => {
			const unusedTokens = player.unusedTokens;

			expect(unusedTokens.every((token) => !token.dropped)).toBeTruthy();
		});
	});
});
