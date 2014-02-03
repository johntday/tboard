Template.tmpl_stacks.helpers({
	stacksHandle: function() {
		return stacksHandle;
	}
});
Template.tmpl_stacks.events({
});
/*------------------------------------------------------------------------------------------------------------------------------*/
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
/*------------------------------------------------------------------------------------------------------------------------------*/
Template.tmpl_stack_item.helpers({
	list_cards_max_height: function() {
		return Session.get('list_cards_max_height');
	},
	cards: function() {
		return this.cards;
	},
	cards_cnt: function() {
		return (this.cards) ? this.cards.length : 0;
	},
	isStackTitleEdit: function() {
		return this._id === Session.get('stack_title_edit_id');
	}
});
Template.tmpl_stack_item.events({
	'click .open-card-composer': function(e) {
		e.preventDefault();
		var stack_id = $(e.currentTarget).data('stackId');
		$('div.card-composer[data-stack-id='+stack_id+']').removeClass('hide');
		//Meteor.MyClientModule.scrollToBottomOfPageFast('div.list-area-wrapper', $('div[class="list-card"]').last() );
	},
	'click div.cc-controls .icon-lg': function(e) {
		e.preventDefault();
		var stack_id = $(e.currentTarget).data('stackId');
		$('div.card-composer[data-stack-id='+stack_id+']').addClass('hide');
	},
	'click h2.list-header-name': function(e) {
		e.preventDefault();
		var stack_id = $(e.currentTarget).data('stackId');
		Session.set('stack_title_edit_id', stack_id);
		$(e.currentTarget).find('textarea').focus();
	},
	'click input.save-stack-title': function(e) {
		e.preventDefault();
		var stack_id = Session.get('stack_title_edit_id');
		var title = $(e.currentTarget).closest('div.edit').find('textarea').val();
		if ( this.title != title )
			Stacks.update(stack_id, { $set: { title:title } } );
		Session.set('stack_title_edit_id', '');
	},
	'click a.cancel-stack-title': function(e) {
		e.preventDefault();
		Session.set('stack_title_edit_id', '');
	},
	'click input.js-add-card': function(e) {
		e.preventDefault();
		var stack_id = $(e.currentTarget).data('stackId');
		var title = $('div.card-composer[data-stack-id='+stack_id+'] .js-card-title').val();

		//stack_state.card_cnts[ this._id ] = (this.cards) ? this.cards.length : 0;

		var seq_int = getCardCnt( stack_id );
		var card = {title: title, seq_int: seq_int};
		Stacks.update(stack_id, { $addToSet: { cards: card } } );
		$('div.card-composer[data-stack-id='+stack_id+']').addClass('hide');
	},
	'click a.list-header-menu-icon': function(e) {
		e.preventDefault();
		console.log('hi');
		var stack_id = $(e.currentTarget).closest('div.list').data('stackId');
		Session.set('stack_options_stack_id',stack_id);
		Session.set('stack_actions_pop_up', !Session.get('stack_actions_pop_up'));
	}

});
/*------------------------------------------------------------------------------------------------------------------------------*/
