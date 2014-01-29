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
	}
});
/*------------------------------------------------------------------------------------------------------------------------------*/
Template.tmpl_board.events({
	'click #header .header-boards-button': function(e) {
		e.preventDefault();
		$('#boards-drawer .boards-drawer').toggleClass('show');
		console.log( e.currentTarget );
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
	'click .board-header-btn': function(e) {
		alert('"board-header-btn" CLICKED');
		console.log( e.currentTarget );
	},
//	'click .header-btn': function(e) {
//		alert('"header-btn" CLICKED');
//		console.log( e.currentTarget );
//	},
	'click .list-card-operation': function(e) {
		alert('"list-card-operation" CLICKED');
		console.log( e.currentTarget );
	},
	'click .list-header-menu-icon': function(e) {
		alert('"list-header-menu-icon" CLICKED');
		console.log( e.currentTarget );
	},
	'click .placeholder': function(e) {
		alert('"placeholder" CLICKED');
		console.log( e.currentTarget );
		$( '.list.add-list').removeClass('idle');
	},
	'click .js-cancel-edit': function(e) {
		$( '.list.add-list').addClass('idle');
	},
	'click .js-save-edit': function(e) {
		e.preventDefault();
		$('.list.add-list').addClass('idle');
		alert('"js-save-edit" CLICKED');
		console.log( e.currentTarget );
	},
	'click .list-header': function(e) {
		e.preventDefault();
		alert('"list-header" CLICKED');
		console.log( e.currentTarget );
	},
	'click .list-card-details': function(e) {
		e.preventDefault();
		alert('"list-card-details" CLICKED');
		console.log( e.currentTarget );
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
