Template.tmpl_board.helpers({
	board_widgets_content_height: function() {
		console.log("board_widgets_content_height="+Session.get('board_widgets_content_height'));
		return Session.get('board_widgets_content_height');
	},
	board_actions_list_height: function() {
		console.log("board_actions_list_height="+Session.get('board_actions_list_height'));
		return Session.get('board_actions_list_height');
	},
	board_canvas_height: function() {
		console.log("board_canvas_height="+Session.get('board_canvas_height'));
		return Session.get('board_canvas_height');
	},
	list_area_width: function() {
		console.log("list_area_width="+Session.get('list_area_width'));
		return Session.get('list_area_width');
	},
	list_cards_max_height: function() {
		console.log("list_cards_max_height="+Session.get('list_cards_max_height'));
		return Session.get('list_cards_max_height');
	},
	board_drawer_content_max_height: function() {
		console.log("board_drawer_content_max_height="+Session.get('board_drawer_content_max_height'));
		return Session.get('board_drawer_content_max_height');
	}
});
/*------------------------------------------------------------------------------------------------------------------------------*/
Template.tmpl_board.events({
	'mouseenter .list-card': function(e) {
		$(e.currentTarget).addClass('active-card');
	},
	'mouseleave .list-card': function(e) {
		$(e.currentTarget).removeClass('active-card');
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
