Template.tmpl_boards.helpers({
	boardsHandle: function() {
		return boardsHandle;
	}
});
/*------------------------------------------------------------------------------------------------------------------------------*/
Template.tmpl_boards.events({
});
/*------------------------------------------------------------------------------------------------------------------------------*/
//Template.tmpl_stack.rendered = function() {
//};
//Template.tmpl_stack.created = function() {
//};
//
//Template.tmpl_stack.destroyed = function() {
//};
Template.tmpl_boards_list.helpers({
	records: function() {
		return this.fetch();
	},
	ready: function() {
		return this.ready();
	},
	allLoaded: function() {
		return ( this.fetch().length < this.loaded() );
	}
});
Template.tmpl_boards_list.events({
	'click .load-more': function(e) {
		e.preventDefault();
		this.loadNextPage();

		Meteor.MyClientModule.scrollToBottomOfPageFast( $('div[class="post"]').last() );
	}
});