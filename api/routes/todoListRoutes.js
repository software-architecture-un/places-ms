'use strict';

module.exports = function(app) {
	var todoList = require('../controllers/todoListController');

	// Places Routes
	app.route('/scoreservice')
		.get(todoList.list_all_places)
		.post(todoList.create_a_place);

	app.route('/scoreservice/:id')
		.get(todoList.read_a_place)
		.put(todoList.update_a_place)
		.delete(todoList.delete_a_place);
	
	app.route('/scoreserviceUs/:user_id')
		.get(todoList.read_places_by_user_id)

	app.route('/scoreserviceUsn/:user_id')
		.get(todoList.read_number_places_by_user_id);

};
