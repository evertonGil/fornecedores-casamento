var winston = require('winston');

module.exports = new winston.Logger({
	transports:[
	new winston.transports.File({
		name: 'info-fornecedores',
		level: "info",
		filename: "./app/logs/info-fornecedores",
		maxsize: 1048576,
		maxFiles: 10,
		colorize: false
	}),
	new winston.transports.File({
		name: 'errors-fornecedores',
		level: "error",
		filename: "./app/logs/errors-fornecedores",
		maxsize: 1048576,
		maxFiles: 10,
		colorize: false
	})
	]
});