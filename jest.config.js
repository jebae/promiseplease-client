module.exports = {
	testRegex: "./(src|\\.storybook)/.*\\.test\\.js$",
	moduleNameMapper: {
		".*.scss$": "babel-jest",
		".*.jpg$": "babel-jest",
	},
	setupFiles: [ "./.test_utils/jest.setup.js" ]
}