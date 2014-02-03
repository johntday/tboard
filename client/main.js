// INIT
Session.setDefault('woof_hide', true);
Session.setDefault('hide_feedback', true);
Session.setDefault('hide_board_wrapper', true);
Session.setDefault('collapse_right_side_bar_menu', true);
Session.setDefault('card_actions_pop_up', true);
Session.setDefault('stack_actions_pop_up', true);
Session.setDefault('create_board_pop_up', true);
Session.setDefault('rename_board_pop_up', true);
Session.setDefault('profile_pop_up', true);


Session.setDefault('project_id', '');
Session.setDefault('board_id', '');
Session.setDefault('card_id', '');
//Session.setDefault('board', {});

Session.setDefault('stack_sort', 'seq_int');

Session.setDefault('stack_title_edit_id', '');
Session.setDefault('card_edit_stack_id', {});
Session.setDefault('stack_options_stack_id','');

popWidth = $(window).width()/2 - 40;
popHeight = $(window).height()/2 - 40;
stackState = {card_cnts:{}, stack_cnt:0};
getCardCnts = function() {
	return stackState.card_cnts;
};
getCardCnt = function(stack_id) {
	return stackState.card_cnts[ stack_id ];
};
getStackCnt = function() {
	return stackState.stack_cnt;
};
setStackState = function(card_cnts, stack_cnt) {
	if (card_cnts) stackState.card_cnts = card_cnts;
	if (stack_cnt) stackState.stack_cnt = stack_cnt;
	resizeHeight();
};


//-------------------------------------------------
resizeHeight();

function resizeHeight() {
	var height = $(window).height();
	var width  = $(window).width();
	popWidth = width/2  - 40;
	popHeight = height/2  - 40;
	//console.log( "width="+width );
	//console.log( "height="+height );
	Session.set('board_widgets_content_height', height-80);//height_200);//852      #1
	Session.set('board_actions_list_height', height-280);//height_202);//650         #4

	Session.set('board_canvas_height', height-110);//height_50);//802                 #2 do first
	Session.set('list_area_width', (getStackCnt() === 0) ? 350 : 350 * getStackCnt() + 350 );
	//console.log ('resizeHeight: width='+width+', list_area_width='+Session.get('list_area_width')+', stackState='+JSON.stringify(stackState));
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
cardActionsPopUp = function() {
	return Session.get('card_actions_pop_up') ? 'none' : 'block';
};
stackActionsPopUp = function() {
	return Session.get('stack_actions_pop_up') ? 'none' : 'block';
};
createBoard = function() {
	return Session.get('create_board_pop_up') ? 'none' : 'block';
};
renameBoard = function() {
	return Session.get('rename_board_pop_up') ? 'none' : 'block';
};
profilePopUp = function() {
	return Session.get('profile_pop_up') ? 'none' : 'block';
};



//Meteor.subscribe('pubsub_projects');
//Meteor.subscribe('pubsub_boards');
//Meteor.subscribe('pubsub_stacks');
//Meteor.subscribe('pubsub_cards');

//Session.set('project_id', '9K9zxCmh77m4xuxBF');
//Session.set('board_id', 'w9MWBZCGzsxhQ5Tsw');
Deps.autorun(function(){
	resizeHeight();
});


projectListSubscription = function(find, options, per_page) {
	var handle = Meteor.subscribeWithPagination('pubsub_projects', find, options, per_page);
	handle.fetch = function() {
		var ourFind = _.isFunction(find) ? find() : find;
		return limitDocuments(Projects.find(ourFind, options), handle.loaded());
	}
	return handle;
};
Deps.autorun(function(){
	projectsHandle = projectListSubscription(
		projectQuery( '???' ),
		projectSort[ Session.get('project_sort') ],
		100
	);
});

boardListSubscription = function(find, options, per_page) {
	var handle = Meteor.subscribeWithPagination('pubsub_boards', find, options, per_page);
	handle.fetch = function() {
		var ourFind = _.isFunction(find) ? find() : find;
		return limitDocuments(Boards.find(ourFind, options), handle.loaded());
	}
	return handle;
};
Deps.autorun(function(){
	boardsHandle = boardListSubscription(
		boardQuery( Meteor.userId(), Session.get('project_id') ),
		boardSort[ Session.get('board_sort') ],
		100
	);
});

stackListSubscription = function(find, options, per_page) {
	var handle = Meteor.subscribeWithPagination('pubsub_stacks', find, options, per_page);
	handle.fetch = function() {
		var ourFind = _.isFunction(find) ? find() : find;
		return stackDocuments(Stacks.find(ourFind, options), handle.loaded());
	}
	return handle;
};
Deps.autorun(function(){
	stacksHandle = stackListSubscription(
		stackQuery( Session.get('board_id') ),
		stackSort[ Session.get('stack_sort') ],
		100
	);
});
