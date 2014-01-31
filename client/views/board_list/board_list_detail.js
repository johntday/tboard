Template.tmpl_boards_list_detail.helpers({
});
/*------------------------------------------------------------------------------------------------------------------------------*/
Template.tmpl_boards_list_detail.events({
	'click a.js-open-board': function(e) {
		console.log (e.currentTarget);
		e.preventDefault();
		var board_id = $(e.currentTarget).data('boardId');
		console.log (board_id);

		Session.set('board_id', board_id);

		$('#boards-drawer .boards-drawer').toggleClass('show');
		//Router.go('/');

	}
});
/*------------------------------------------------------------------------------------------------------------------------------*/
//Template.tmpl_stack.rendered = function() {
//};
//Template.tmpl_stack.created = function() {
//};
//
//Template.tmpl_stack.destroyed = function() {
//};
