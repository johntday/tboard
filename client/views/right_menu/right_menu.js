Template.tmpl_right_menu.helpers({
	board_widgets_content_height: function() {
		//console.log("board_widgets_content_height="+Session.get('board_widgets_content_height'));
		return Session.get('board_widgets_content_height');
	},
	board_actions_list_height: function() {
		//console.log("board_actions_list_height="+Session.get('board_actions_list_height'));
		return Session.get('board_actions_list_height');
	}

});
/*------------------------------------------------------------------------------------------------------------------------------*/
Template.tmpl_right_menu.events({
	'click #btn-collapse-right-side-bar-menu': function(e) {
		Session.get('collapse_right_side_bar_menu') ? $(e.currentTarget).removeClass('collapsed') : $(e.currentTarget).addClass('collapsed');
		Session.set('collapse_right_side_bar_menu', !Session.get('collapse_right_side_bar_menu'));
	},
	'click #btn-delete-board': function(e) {
		Session.set('collapse_right_side_bar_menu', !Session.get('collapse_right_side_bar_menu'));
		var board_id = Session.get('board_id');
		Meteor.call('deleteBoard', board_id, function(error) {
			if(error){
				console.log(JSON.stringify(error));
				//throwError(error.reason);
				//$(e.target).removeClass('disabled');
			}else{
				MyLog("right_menu.js/1", "deleted board", {'_id': board_id});
				Router.go('/');
			}
		});
	}


});
/*------------------------------------------------------------------------------------------------------------------------------*/
