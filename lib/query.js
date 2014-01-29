regexQuery = function (searchText) {
	return {$regex: searchText, $options: 'i'};
};
sortQuery = function (sortProperty, sortOrder) {
	var args = Array.prototype.slice.call(arguments, 0);
	var sort = {sort: {}};

	for (var i=0; i < args.length; i++) {
		sort.sort[args[i]] = args[++i];
	}
	return sort;
};
projectSort = {
	default: sortQuery()
};
boardSort = {
	default: sortQuery()
};
stackSort = {
	seq_int: sortQuery('seq_int', 1)
};
cardSort = {
	seq_int: sortQuery('seq_int', 1)
};
findOptions = function(sort, limit) {
	return (limit) ? _.extend(sort, {limit:limit}) : sort;
};
projectQuery = function(userId) {
	return {};
};
boardQuery = function(project_id) {
	return {project_id: project_id};
};
stackQuery = function(board_id) {
	return {board_id: board_id};
};
cardQuery = function(stack_id) {
	return {stack_id: stack_id};
};
