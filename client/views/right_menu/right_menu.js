Template.tmpl_right_menu.helpers({
	board_widgets_content_height: function() {
		//console.log("board_widgets_content_height="+Session.get('board_widgets_content_height'));
		return Session.get('board_widgets_content_height');
	},
	board_actions_list_height: function() {
		//console.log("board_actions_list_height="+Session.get('board_actions_list_height'));
		return Session.get('board_actions_list_height');
	}

});
/*------------------------------------------------------------------------------------------------------------------------------*/
Template.tmpl_right_menu.events({
	'click #btn-collapse-right-side-bar-menu': function(e) {
		console.log (e.currentTarget );
		console.log ( Session.get('collapse_right_side_bar_menu') );
		Session.get('collapse_right_side_bar_menu') ? $(e.currentTarget).removeClass('collapsed') : $(e.currentTarget).addClass('collapsed');
		Session.set('collapse_right_side_bar_menu', !Session.get('collapse_right_side_bar_menu'));
	}


});
/*------------------------------------------------------------------------------------------------------------------------------*/
//Template.tmpl_board.rendered = function() {
//};
//Template.tmpl_board.created = function() {
//	$( window ).resize(function() {
//		resizeHeight();
//	});
//};
//
//Template.tmpl_board.destroyed = function() {
//	$(window).off('resize');
//};
