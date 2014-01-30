Router.configure({
	layoutTemplate: 'layout'
});

Router.map(function () {
	this.route('home', { path: '/', template: 'tmpl_board' });
	this.route('stacks', { path: '/', template: 'tmpl_board' });


	this.route('test', {
		path  : '/test/:_id',
		waitOn: function () {
			return [Meteor.subscribe('pubsub_selected_board', this.params._id),
			        Meteor.subscribe('pubsub_selected_board', stackQuery( this.params._id ), stackSort[ Session.get('stack_sort') ], 100 ) ];
		},
		data  : function () {
			//var board = Boards.findOne(this.params._id);
			return Stacks.find( stackQuery( Session.get('board_id') ), stackSort[ Session.get('stack_sort') ], 100 );
		}
	});


});
