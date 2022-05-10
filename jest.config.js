module.exports = {
	transform: {
		'^.+\\.(js|jsx)$': 'babel-jest',
		'^.+\\.html?$': 'html-loader-jest',
	},
	verbose: true,
	testEnvironment: 'jsdom',
};
