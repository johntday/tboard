Template.home.helpers({
	board_canvas_height: function() {
		//console.log("board_canvas_height="+Session.get('board_canvas_height'));
		return Session.get('board_canvas_height') + 40;
	},
	left: function() {
		console.log( popWidth );
		return popWidth;
	}

});
/*------------------------------------------------------------------------------------------------------------------------------*/
Template.home.events({

});
/*------------------------------------------------------------------------------------------------------------------------------*/
