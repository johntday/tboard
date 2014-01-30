Template.tmpl_card.helpers({
});
/*------------------------------------------------------------------------------------------------------------------------------*/
Template.tmpl_card.events({
	'click .list-card-operation': function(e) {
		var card_id = $(e.currentTarget).data('cardId');
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
