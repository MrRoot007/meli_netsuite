const suitescriptRoute = require('./customization/suitescriptRoute.custom');

module.exports = {
	defaultProjectFolder: "src",
	commands: {
		"file:upload": {
			beforeExecuting: (options) => {
				const vPath = suitescriptRoute.toNetSuite(options.arguments.paths[0]);
				return {
					command: options.command,
					projectPath: options.projectPath,
					arguments: {
						paths: [vPath],
						authid: undefined
					}
				}
			}
		},
	}
};