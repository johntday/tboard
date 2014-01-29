Boards = new Meteor.Collection('boards');

/*------------------------------------------------------------------------------------------------------------------------------*/
// Create a collection where users can only modify documents that
// they own. Ownership is tracked by an 'userId' field on each
// document. All documents must be owned by the user (or userId='admin') that created
// them and ownership can't be changed. Only a document's owner (or userId='admin')
// is allowed to delete it, and the 'locked' attribute can be
// set on a document to prevent its accidental deletion.

Boards.allow({
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

Boards.deny({
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
	createBoard: function(properties){
		MyLog("collections/boards.js/createBoard/1", "properties", properties);
		var user = Meteor.user();
		var userId = getDocUserIdForSaving(properties, user);
		//var boardWithSameTitle = Boards.findOne( {title: {$regex: board.title, $options: 'i'}} );
		var boardId = '';

		if (!user)
			throw new Meteor.Error(601, 'You need to login to create a new board');
		if(!properties.title)
			throw new Meteor.Error(602, 'Please add a title');

		var board = extendWithMetadataForInsert( properties, userId, user );

		MyLog("collections/boards.js/createBoard/2", "board", board);

		boardId = Boards.insert(board);
		board.boardId = boardId;

		// NOTIFICATION
//		if (! isAdmin(user)) {
//			var n = notificationFactory(MOVIE_CREATED_BY_USER, "board", "admin", board.title, board.status, "/boards/"+boardId, board.created);
//			Notifications.insert(n);
//		}

		return board;
	},

	updateBoard: function(_id, properties){
		var user = Meteor.user();

		if (!user)
			throw new Meteor.Error(601, 'You need to login to update a board');
		if(!properties.title)
			throw new Meteor.Error(602, 'Please add a title');

		var board = extendWithMetadataForUpdate( properties );

		MyLog("collections/boards.js/updateBoard/1", "properties", properties);

		Boards.update(_id, {$set: board} );

		// NOTIFICATION
//		if (! isAdmin(user)) {
//			var n = notificationFactory(MOVIE_UPDATED_BY_USER, "board", "admin", board.title, board.status, "/boards/"+_id, board.created);
//			Notifications.insert(n);
//		} else {
//			var m = Boards.findOne(_id);
//			var n = notificationFactory(MOVIE_UPDATED_BY_ADMIN, "board", m.userId, board.title, board.status, "/boards/"+_id, board.created);
//			Notifications.insert(n);
//		}
		return board;
	},

	deleteBoard: function(boardId) {
		// remove associated stuff
		if(!this.isSimulation) {
//			BoardTimelines.remove({boardId: boardId});
//			Facts.remove({boardId: boardId});
		}

		// NOTIFICATION
//		if (isAdmin()) {
//			var m = Boards.findOne(boardId);
//			var n = notificationFactory(MOVIE_DELETED_BY_ADMIN, "board", m.userId, m.title, m.status, "/boards/"+boardId, getNow());
//			Notifications.insert(n);
//		}

		Boards.remove(boardId);
		return boardId;
	}
});
