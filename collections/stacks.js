Stacks = new Meteor.Collection('stacks');

/*------------------------------------------------------------------------------------------------------------------------------*/
// Create a collection where users can only modify documents that
// they own. Ownership is tracked by an 'userId' field on each
// document. All documents must be owned by the user (or userId='admin') that created
// them and ownership can't be changed. Only a document's owner (or userId='admin')
// is allowed to delete it, and the 'locked' attribute can be
// set on a document to prevent its accidental deletion.

Stacks.allow({
	insert: function (userId, doc) {
		//return ownsDocumentOrAdmin(userId, doc);
		return true;
	},
	update: function (userId, doc, fields, modifier) {
		return ownsDocumentOrAdmin(userId, doc);
	},
	remove: function (userId, doc) {
		return ownsDocumentOrAdmin(userId, doc);
	},
	fetch: ['userId']
});

Stacks.deny({
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
	createStack: function(properties){
		MyLog("collections/stacks.js/createStack/1", "properties", properties);
		var user = Meteor.user();
		var userId = getDocUserIdForSaving(properties, user);
		//var stackWithSameTitle = Stacks.findOne( {title: {$regex: stack.title, $options: 'i'}} );
		var stackId = '';

		if (!user)
			throw new Meteor.Error(601, 'You need to login to create a new stack');
		if(!properties.title)
			throw new Meteor.Error(602, 'Please add a title');

		var stack = extendWithMetadataForInsert( properties, userId, user );

		MyLog("collections/stacks.js/createStack/2", "stack", stack);

		stackId = Stacks.insert(stack);
		stack.stackId = stackId;

		// NOTIFICATION
//		if (! isAdmin(user)) {
//			var n = notificationFactory(MOVIE_CREATED_BY_USER, "stack", "admin", stack.title, stack.status, "/stacks/"+stackId, stack.created);
//			Notifications.insert(n);
//		}

		return stack;
	},

	updateStack: function(_id, properties){
		var user = Meteor.user();

		if (!user)
			throw new Meteor.Error(601, 'You need to login to update a stack');
		if(!properties.title)
			throw new Meteor.Error(602, 'Please add a title');

		var stack = extendWithMetadataForUpdate( properties );

		MyLog("collections/stacks.js/updateStack/1", "properties", properties);

		Stacks.update(_id, {$set: stack} );

		// NOTIFICATION
//		if (! isAdmin(user)) {
//			var n = notificationFactory(MOVIE_UPDATED_BY_USER, "stack", "admin", stack.title, stack.status, "/stacks/"+_id, stack.created);
//			Notifications.insert(n);
//		} else {
//			var m = Stacks.findOne(_id);
//			var n = notificationFactory(MOVIE_UPDATED_BY_ADMIN, "stack", m.userId, stack.title, stack.status, "/stacks/"+_id, stack.created);
//			Notifications.insert(n);
//		}
		return stack;
	},

	deleteStack: function(stackId) {
		// remove associated stuff
		if(!this.isSimulation) {
//			StackTimelines.remove({stackId: stackId});
//			Facts.remove({stackId: stackId});
		}

		// NOTIFICATION
//		if (isAdmin()) {
//			var m = Stacks.findOne(stackId);
//			var n = notificationFactory(MOVIE_DELETED_BY_ADMIN, "stack", m.userId, m.title, m.status, "/stacks/"+stackId, getNow());
//			Notifications.insert(n);
//		}

		Stacks.remove(stackId);
		return stackId;
	}
});
