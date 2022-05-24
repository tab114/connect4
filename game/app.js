import Game from './Game';
import './style.css';

const game = new Game();

/**
 * Listens for click on `#begin-game` and calls startGame() on game object
 */
document.getElementById('begin-game').addEventListener('click', (event) => {
	game.startGame();
	event.target.remove();
	document.getElementById('play-area').style.opacity = '1';
});

/**
 * Listen for keyboard presses
 */
document.addEventListener('keydown', (event) => {
	game.handleKeydown(event);
});
