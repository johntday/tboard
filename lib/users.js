getUserDisplayName = function(user){
	if (!user) return '';
	return (user.profile && user.profile.name) ? user.profile.name : user.username;
};
getDocUserIdForSaving = function(doc, user) {
	return doc.userId || ((isAdmin(user)) ? "admin" : user._id);
};
