Template.tmpl_card.helpers({
	username: function() {
		return getUserDisplayName(Meteor.user());
	}
});
/*------------------------------------------------------------------------------------------------------------------------------*/
Template.tmpl_card.events({
	'click .list-card-operation': function(e) {
		var seq_int = $(e.currentTarget).data('seqInt');
		var stack_id = $(e.currentTarget).closest('div.list').data('stackId');
		Session.set('card_edit_stack_id', {stack_id:stack_id, seq_int:seq_int});
		Session.set('card_actions_pop_up', false);
	}
});
/*------------------------------------------------------------------------------------------------------------------------------*/
//Template.tmpl_card.rendered = function() {
//};
//Template.tmpl_card.created = function() {
//};
//
//Template.tmpl_card.destroyed = function() {
//};
