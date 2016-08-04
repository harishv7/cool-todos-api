var Sequelize = require('sequelize');
var sequelize = new Sequelize(undefined, undefined, undefined, {
	'dialect': 'sqlite',
	'storage': __dirname + '/sqlite-db.sqlite',
});

var Todo = sequelize.define('todo', {
	description: {
		type: Sequelize.STRING,
		// add validation
		allowNull: false,
		validate: {
			//notEmpty: true
			len: [1, 250] // only allows length of str to be 1-250
		}
	},
	completed: {
		type: Sequelize.BOOLEAN,
		allowNull: false,
		defaultValue: false
	}
})

sequelize.sync().then(function () {
	console.log('Everything is synced');

	Todo.create({
		description: 'Walking my dog',
		// completed: false
	}).then(function (todo) {
		return Todo.create({
			description: 'Clean office'
		});
	}).then(function() {
		return Todo.findById(1)
	}).then(function(todo) {
		if(todo) {
			console.log(todo.toJSON());
		} else {
			console.log('No todo found');
		}
	}).catch(function (e) {
		console.log(e);
	});
});