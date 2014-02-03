Template.tmpl_board.helpers({
	board_canvas_height: function() {
		//console.log("board_canvas_height="+Session.get('board_canvas_height'));
		return Session.get('board_canvas_height');
	},
	list_area_width: function() {
		//console.log("list_area_width="+Session.get('list_area_width'));
		return Session.get('list_area_width');
	},
	list_cards_max_height: function() {
		//console.log("list_cards_max_height="+Session.get('list_cards_max_height'));
		return Session.get('list_cards_max_height');
	},
	board_drawer_content_max_height: function() {
		//console.log("board_drawer_content_max_height="+Session.get('board_drawer_content_max_height'));
		return Session.get('board_drawer_content_max_height');
	},
	hideWoof: function() {
		return hideWoof();
	},
	hideFeedback: function() {
		return hideFeedback();
	},
	hideRightSideBar: function() {
		return hideBoardWrapper();
	},
	collapseRightSideBarMenu: function() {
		return collapseRightSideBarMenu();
	},
	card_actions_pop_up: function() {
		return cardActionsPopUp();
	},
	stack_actions_pop_up: function() {
		return stackActionsPopUp();
	},
	isBoard: function() {
		return !!Session.get('board_id');
	},
	createBoard: function() {
		return createBoard();
	},
	width: function() {
		return Session.get('width') / 2;
	}

});
/*------------------------------------------------------------------------------------------------------------------------------*/
Template.tmpl_board.events({
	'click #header .header-boards-button': function(e) {
		e.preventDefault();
		$('#boards-drawer .boards-drawer').toggleClass('show');
		//console.log( e.currentTarget );
	},
	'mouseenter .list-card': function(e) {
		$(e.currentTarget).addClass('active-card');
	},
	'mouseleave .list-card': function(e) {
		$(e.currentTarget).removeClass('active-card');
	},
	'click #btn-right-side-bar-open': function(e) {
		Session.set('hide_board_wrapper', false);
	},
	'click #btn-right-side-bar-close': function(e) {
		Session.set('hide_board_wrapper', true);
	},
//	'click .board-header-btn': function(e) {
//		alert('"board-header-btn" CLICKED');
//		console.log( e.currentTarget );
//	},
//	'click .header-btn': function(e) {
//		alert('"header-btn" CLICKED');
//		console.log( e.currentTarget );
//	},
//	'click .list-header-menu-icon': function(e) {
//		alert('"list-header-menu-icon" CLICKED');
//		console.log( e.currentTarget );
//	},
	'click .placeholder': function(e) {
		$( '.list.add-list').removeClass('idle');
	},
	'click .js-cancel-edit': function(e) {
		$( '.list.add-list').addClass('idle');
	},
	'click .js-save-edit': function(e) {
		e.preventDefault();
		$('.list.add-list').addClass('idle');
	},
//	'click .list-header': function(e) {
//		e.preventDefault();
//		alert('"list-header" CLICKED');
//		console.log( e.currentTarget );
//	},
//	'click .list-card-details': function(e) {
//		e.preventDefault();
//		alert('"list-card-details" CLICKED');
//		console.log( e.currentTarget );
//	},
	'click .js-close-popover': function(e) {
		e.preventDefault();
		// CLOSE ALL POPUPS
		closeAllPopups();
	},
	'click #delete-card': function(e) {
		e.preventDefault();
		var cardStack = Session.get('card_edit_stack_id');
		console.log( 'deleted card_id: ' + cardStack );
		Stacks.update(cardStack.stack_id,
			{
				$pull: { cards: {seq_int: cardStack.seq_int} }
			}
		);
		closeAllPopups();
	},
	'click #add-new-stack': function(e) {
		e.preventDefault();
		var title = $(e.currentTarget).closest('form').find('input').val();
		var stack = {
			title: title
			,description:''
			,board_id: Session.get('board_id')
			,stack_int: getStackCnt() };
		Stacks.insert( stack );
		closeAllPopups();
	},
	'click #create-new-board': function(e) {
		e.preventDefault();
		var title = $('#boardNewTitle').val();
		$('#boardNewTitle').val('');
		var board = {
			title: title
		};
		var board_id = Boards.insert( board );
		closeAllPopups();
		Router.go('/board/' + board_id);
	},
	'click #btn-create-new-board': function(e) {
		e.preventDefault();
		Session.set('create_board_pop_up', !Session.get('create_board_pop_up'));
	},
	'click #btn-delete-stack': function(e) {
		e.preventDefault();
		var stack_Id = Session.get('stack_options_stack_id');
		console.log( stack_Id );
		Stacks.remove( stack_Id );
		Session.set('stack_actions_pop_up', !Session.get('stack_actions_pop_up'));
		closeAllPopups();
	}

});
/*------------------------------------------------------------------------------------------------------------------------------*/
var closeAllPopups = function() {
	Session.set('card_edit_stack_id', {});
	Session.set('card_actions_pop_up', true);
	Session.set('create_board_pop_up', true);
	Session.set('stack_actions_pop_up', true);
};
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
