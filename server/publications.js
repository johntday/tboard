Meteor.publish('pubsub_projects', function(query, options, limit) {
	options = options || {}; 
	options.limit = limit;
	return Projects.find(query || {}, options);
});
Meteor.publish('pubsub_selected_project', function(id) {
	return Projects.find(id);
});

Meteor.publish('pubsub_boards', function(query, options, limit) {
	options = options || {};
	options.limit = limit;
	return Boards.find(query || {}, options);
});
Meteor.publish('pubsub_selected_board', function(id) {
	return Boards.find(id);
});

Meteor.publish('pubsub_stacks', function(query, options, limit) {
	options = options || {};
	options.limit = limit;
	return Stacks.find(query || {}, options);
});
Meteor.publish('pubsub_selected_stack', function(id) {
	return Stacks.find(id);
});

Meteor.publish('pubsub_cards', function(query, options, limit) {
	options = options || {};
	options.limit = limit;
	return Cards.find(query || {}, options);
});
Meteor.publish('pubsub_selected_card', function(id) {
	return Cards.find(id);
});
