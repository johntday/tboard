Router.configure({
	layoutTemplate: 'layout'
});

Router.map(function () {
	this.route('home', { path: '/', template: 'home' });
	this.route('your_boards', { path: '/boards', template: 'tmpl_your_boards' });

	this.route('board', {
		path  : '/board/:_id',
		template: 'tmpl_board',
		before: function () {
//			if (!Meteor.user()) {
//				this.render('login');
//				this.stop();
//			}
			this.subscribe('pubsub_selected_board', this.params._id).wait();
		},
		data  : function () {
			var board = Boards.findOne(this.params._id);
			if (!board || !board._id) {
				this.render('home');
				this.stop();
			}
			try {
				Session.set('board_id', board._id);
			} catch(err) {
				this.render('home');
				this.stop();
			}
			return board;
		}
	});


});
