const webpack = require("@nativescript/webpack");

module.exports = (env) => {
	webpack.init(env);

	// Personalizza la configurazione di Webpack
	webpack.chainWebpack((config) => {
		// Aggiungi 'svelte' a resolve.conditionNames
		// config.resolve.conditions.add('svelte');
	});

	return webpack.resolveConfig();
};
