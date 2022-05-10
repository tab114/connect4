class Token {
	constructor(index, owner) {
		this.owner = owner;
		this.id = `token-${index}-${owner.id}`;
		this.dropped = false;
		this.columnLocation = 0;
	}

	/**
	 * Gets associated htmlToken.
	 * @return {element} Html element associated with token object.
	 */
	get htmlToken() {
		return document.getElementById(this.id);
	}

	/**
	 * Draws new HTML token.
	 */
	drawHTMLToken() {
		const token = document.createElement('div');
		document.getElementById('game-board-underlay').appendChild(token);
		token.setAttribute('id', this.id);
		token.setAttribute('class', 'token');
		token.style.backgroundColor = this.owner.color;
	}

	/**
	 * Moves html token one column to left.
	 */
	moveLeft() {
		if (this.columnLocation > 0) {
			this.htmlToken.style.left = this.htmlToken.offsetLeft - 76;
			this.columnLocation -= 1;
		}
	}

	/**
	 * Moves html token one column to right.
	 * @param {number} columns - number of columns on the game board
	 */
	moveRight(columns) {
		if (this.columnLocation < columns - 1) {
			this.htmlToken.style.left = `${this.htmlToken.offsetLeft + 76}px`;
			this.columnLocation += 1;
		}
	}

	/**
	 * Drops html token into targeted board space.
	 * @param {Object} target space for dropped token.
	 * @param {function} reset function to call after the drop animation has completed.
	 */
	drop(target, reset) {
		this.dropped = true;
		this.htmlToken.style.top = target.y * target.diameter;
		reset();
	}
}

export default Token;
