Cards = new Meteor.Collection('cards');

STATUS_PENDING=1;
STATUS_APPROVED=2;
STATUS_REJECTED=3;
/*------------------------------------------------------------------------------------------------------------------------------*/
// Create a collection where users can only modify documents that
// they own. Ownership is tracked by an 'userId' field on each
// document. All documents must be owned by the user (or userId='admin') that created
// them and ownership can't be changed. Only a document's owner (or userId='admin')
// is allowed to delete it, and the 'locked' attribute can be
// set on a document to prevent its accidental deletion.

Cards.allow({
	insert: function (userId, doc) {
		//return ownsDocumentOrAdmin(userId, doc);
		return false;
	},
	update: function (userId, doc, fields, modifier) {
		return ownsDocumentOrAdmin(userId, doc);
	},
	remove: function (userId, doc) {
		return ownsDocumentOrAdmin(userId, doc);
	},
	fetch: ['userId']
});

Cards.deny({
	update: function (userId, docs, fields, modifier) {
		// can't change owners
		return _.contains(fields, 'userId','owner');
	},
	remove: function (userId, doc) {
		// can't remove locked documents
		return doc.locked;
	},
	fetch: ['locked'] // no need to fetch 'userId'
});
/*------------------------------------------------------------------------------------------------------------------------------*/

Meteor.methods({
	createCard: function(properties){
		MyLog("collections/cards.js/createCard/1", "properties", properties);
		var user = Meteor.user();
		var userId = getDocUserIdForSaving(properties, user);
		//var cardWithSameTitle = Cards.findOne( {title: {$regex: card.title, $options: 'i'}} );
		var cardId = '';

		if (!user)
			throw new Meteor.Error(601, 'You need to login to create a new card');
		if(!properties.title)
			throw new Meteor.Error(602, 'Please add a title');

		var card = extendWithMetadataForInsert( properties, userId, user );

		MyLog("collections/cards.js/createCard/2", "card", card);

		cardId = Cards.insert(card);
		card.cardId = cardId;

		// NOTIFICATION
//		if (! isAdmin(user)) {
//			var n = notificationFactory(MOVIE_CREATED_BY_USER, "card", "admin", card.title, card.status, "/cards/"+cardId, card.created);
//			Notifications.insert(n);
//		}

		return card;
	},

	updateCard: function(_id, properties){
		var user = Meteor.user();

		if (!user)
			throw new Meteor.Error(601, 'You need to login to update a card');
		if(!properties.title)
			throw new Meteor.Error(602, 'Please add a title');

		var card = extendWithMetadataForUpdate( properties );

		MyLog("collections/cards.js/updateCard/1", "properties", properties);

		Cards.update(_id, {$set: card} );

		// NOTIFICATION
//		if (! isAdmin(user)) {
//			var n = notificationFactory(MOVIE_UPDATED_BY_USER, "card", "admin", card.title, card.status, "/cards/"+_id, card.created);
//			Notifications.insert(n);
//		} else {
//			var m = Cards.findOne(_id);
//			var n = notificationFactory(MOVIE_UPDATED_BY_ADMIN, "card", m.userId, card.title, card.status, "/cards/"+_id, card.created);
//			Notifications.insert(n);
//		}
		return card;
	},

	deleteCard: function(cardId) {
		// remove associated stuff
		if(!this.isSimulation) {
//			CardTimelines.remove({cardId: cardId});
//			Facts.remove({cardId: cardId});
		}

		// NOTIFICATION
//		if (isAdmin()) {
//			var m = Cards.findOne(cardId);
//			var n = notificationFactory(MOVIE_DELETED_BY_ADMIN, "card", m.userId, m.title, m.status, "/cards/"+cardId, getNow());
//			Notifications.insert(n);
//		}

		Cards.remove(cardId);
		return cardId;
	}
});
