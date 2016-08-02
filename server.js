var express = require('express');
var bodyParser = require('body-parser');
var _ = require('underscore');
var app = express();
var PORT = process.env.PORT || 3000;
var todos = [];
var todoNextId = 1;

// middleware
app.use(bodyParser.json());

app.get('/', function(req, res) {
	res.send('Todo API Root');
});

// GET request to fetch all /todos
app.get('/todos', function(req, res) {
	// convert todos array and send back as json
	res.json(todos);
});

// GET request to fetch individual /todos/id
app.get('/todos/:id', function(req, res) {
	var todoId = parseInt(req.params.id);

	// using underscore library
	var matchedTodo = _.findWhere(todos, {id: todoId});

	// using plain JS
	// todos.forEach(function (todo) {
	// 	if(todoId === todo.id) {
	// 		matchedTodo = todo;
	// 	}
	// });

	if (matchedTodo) {
		res.json(matchedTodo);
	} else {
		res.status(404).send();
	}
});

// POST request - can take data /todos
// requires body-parser npm module
app.post('/todos', function(req, res) {
	// only pick the data we need: desc + completed, ignore any other KV pairs in JSON body
	var body = _.pick(req.body, 'description', 'completed');

	// check for bad requests 
	if(!_.isBoolean(body.completed) || !_.isString(body.description) || body.description.trim().length === 0) {
		return res.status(404).send();
	}

	// set body desc to trimmed value
	body.description = body.description.trim();

//add id field
body.id = todoNextId;
todoNextId++;

// push body into todos array
todos.push(body);


console.log('description: ' + body.description);
res.json(body);
});

app.listen(PORT, function() {
	console.log("Express listening on port " + PORT);
});