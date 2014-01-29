Session.setDefault('woof_hide', true);
Session.setDefault('hide_feedback', true);
Session.setDefault('hide_board_wrapper', true);
Session.setDefault('collapse_right_side_bar_menu', true);

Session.setDefault('project_id', undefined);
Session.setDefault('board_id', undefined);

Session.setDefault('stack_sort', 'seq_int');

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


Meteor.subscribe('pubsub_projects');
Meteor.subscribe('pubsub_boards');
//Meteor.subscribe('pubsub_stacks');
//Meteor.subscribe('pubsub_cards');

Session.set('project_id', '9K9zxCmh77m4xuxBF');
board_id = 'w9MWBZCGzsxhQ5Tsw';



stackListSubscription = function(find, options, per_page) {
	var handle = Meteor.subscribeWithPagination('pubsub_stacks', find, options, per_page);
	handle.fetch = function() {
		var ourFind = _.isFunction(find) ? find() : find;
		return limitDocuments(Stacks.find(ourFind, options), handle.loaded());
	}
	return handle;
};
Deps.autorun(function(){
	stacksHandle = stackListSubscription(
		stackQuery( board_id ),
		stackSort[ Session.get('stack_sort') ],
		100
	);
});

