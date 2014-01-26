Session.setDefault('woof_hide', true);
Session.setDefault('hide_feedback', true);
Session.setDefault('hide_board_wrapper', true);
Session.setDefault('collapse_right_side_bar_menu', true);

resizeHeight();

function resizeHeight() {
	var height = $(window).height();
	var width  = $(window).width();
	//console.log( "width="+width );
	//console.log( "height="+height );
	Session.set('board_widgets_content_height', height-80);//height_200);//852      #1
	Session.set('board_actions_list_height', height-280);//height_202);//650         #4

	Session.set('board_canvas_height', height-110);//height_50);//802                 #2 do first
	Session.set('list_area_width', 1074);
	Session.set('list_cards_max_height', height-220);//height_117);//735             #3
	Session.set('board_drawer_content_max_height', height-14);//height_14);//838
}

//Meteor.startup(function() {
	$( window ).resize(function(e) {
		resizeHeight();
	});
//});

hideWoof = function() {
	return Session.get('woof_hide') ? 'woof-hide' : '';
};
hideFeedback = function() {
	return Session.get('hide_feedback') ? 'hide' : '';
};
hideBoardWrapper = function() {
	return Session.get('hide_board_wrapper') ? 'disabled-all-widgets' : '';
};
collapseRightSideBarMenu = function() {
	return Session.get('collapse_right_side_bar_menu') ? 'collapse' : '';
};
