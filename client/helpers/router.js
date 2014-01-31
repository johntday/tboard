Router.configure({
	layoutTemplate: 'layout'
});

Router.map(function () {
	this.route('home', { path: '/', template: 'tmpl_board' });

	this.route('board', {
		path  : '/board/:_id',
		template: 'tmpl_board',
		waitOn: function () {
			return Meteor.subscribe('pubsub_selected_board', this.params._id);
		},
		data  : function () {
			var board = Boards.findOne(this.params._id);
			if (!board)
				Router.go('/');
			Session.set('board_id', board._id);
			return board;
		}
	});


});
