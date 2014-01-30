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
	}
});
Template.tmpl_stack_item.events({
	'click .open-card-composer': function(e) {
		e.preventDefault();
		var stack_id = $(e.currentTarget).data('stackId');
		//alert('"open-card-composer" CLICKED with stack_id=' + stack_id);
		console.log( e.currentTarget );
		$('div.card-composer[data-stack-id='+stack_id+']').removeClass('hide');
	},
	'click div.cc-controls .icon-lg': function(e) {
		e.preventDefault();
		var stack_id = $(e.currentTarget).data('stackId');
		//alert('"open-card-composer" CLICKED with stack_id=' + stack_id);
		console.log( e.currentTarget );
		$('div.card-composer[data-stack-id='+stack_id+']').addClass('hide');
	},
	'click input.js-add-card': function(e) {
		e.preventDefault();
		var stack_id = $(e.currentTarget).data('stackId');
		//alert('"open-card-composer" CLICKED with stack_id=' + stack_id);
		console.log( e.currentTarget );
		var title = $('div.card-composer[data-stack-id='+stack_id+'] .js-card-title').val();
		var card = {title: title};
		Stacks.update(stack_id,
			{
				$addToSet: { cards: card }
			}
		);

		$('div.card-composer[data-stack-id='+stack_id+']').addClass('hide');
	}


});

//<a class="open-card-composer js-open-card-composer" data-stack-id="{{_id}}" href="#">Add a card?</a>
