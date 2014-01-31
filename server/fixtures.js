Meteor.startup(function () {
	var project_id;
	var project_cnt = Projects.find().count();
	if (project_cnt === 0)
		createProjects();

	function createProjects() {
		for (var i=0; i < 3; i++) {
			var project = {
				title:'my project name '+i
				,description:'my project description '+i
			};
			project_id = Projects.insert(project);

//			createBoards( project_id );
		}
	}
/*	function createBoards(project_id) {
		for (var i=0; i < 1; i++) {
			var board = {
				title:'my board name '+i
				,description:'my board description '+i
				,project_id:project_id
			};
			var board_id = Boards.insert(board);

			createStacks( board_id );
		}
	}
	function createStacks(board_id) {
		for (var i=0; i < 4; i++) {
			var cardArray = getCardArray(i);
			var stack = {
				title:'my stack '+i
				,description:'my stack description '+i
				,board_id:board_id
				,seq_int:i
				,cards:cardArray
			};
			var stack_id = Stacks.insert(stack);
		}
	}
	function getCardArray(j) {
		var cardArray = [];
		for (var i=0; i < 4; i++) {
			var card = {
				title:'my card name '+i
				,description:'card '+i+' for stack '+j
				,seq_int:i
			};
			cardArray.push( card );
		}
		return cardArray;
	}*/

	// ADMIN
	var u = Meteor.users.findOne({username: "admin"}); // find the admin user
	if(!u)
		Accounts.createUser({username: "admin", password: "877669", profile: {name: "Administrator"}});
	// John T Day
	u = Meteor.users.findOne({username: "johntday"}); // find John Day
	if(!u)
		Accounts.createUser({username: "johntday", password: "877669",
			profile: {name: "John T Day",
				projects: [{_id:project_id, title: 'my project name 0', role:'root'}] } } );

});
