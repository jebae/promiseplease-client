require("dotenv").config({ path: "./.env.server" });
require.extensions[".scss"] = () => {};
global.window = {};
require("@babel/register")({
	presets: [ "@babel/preset-env" ],
});

module.exports = require("./");