Template.tmpl_stack.helpers({
	list_cards_max_height: function() {
		return Session.get('list_cards_max_height');
	},
	stacksHandle: function() {
		return stacksHandle;
	}
});
/*------------------------------------------------------------------------------------------------------------------------------*/
Template.tmpl_stack.events({
	'click .open-card-composer': function(e) {
		e.preventDefault();
		var stack_id = $(e.currentTarget).data('stackId');
		alert('"open-card-composer" CLICKED with stack_id=' + stack_id);
		console.log( e.currentTarget );
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
Template.tmpl_stack_list.helpers({
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
Template.tmpl_stack_list.events({
	'click .load-more': function(e) {
		e.preventDefault();
		this.loadNextPage();

		Meteor.MyClientModule.scrollToBottomOfPageFast( $('div[class="post"]').last() );
	}
});