var pctBlacklist = {
	blackListener: function(evt, cb) {
		var target = evt.currentTarget,
			username = target.getAttribute("username"),
			action = target.getAttribute("action");

		chrome.extension.sendRequest({storage: ['blacklist']}, function(response) {
			var blacklist = blacklistToArray(response.storage.blacklist);
		
			if (target.id == "pct-link") {
				if (action == "add") {
					addNameToBlacklist(username, blacklist, cb);
				} else if (action == "remove") {
					removeNameFromBlacklist(username, blacklist, cb);
				}
			}
		});
	}
};

function addNameToBlacklist(name, blacklistArray, cb) {
	var newBlacklist;

	blacklistArray.push(name);
	newBlacklist = JSON.stringify(blacklistArray);
	chrome.extension.sendRequest({storage: 'blacklist', value: newBlacklist}, cb);
}

function removeNameFromBlacklist(name, blacklistArray, cb) {
	var newBlacklist,
		index = blacklistArray.indexOf(name);

	blacklistArray.splice(index, 1);
	newBlacklist = JSON.stringify(blacklistArray);
	chrome.extension.sendRequest({storage: 'blacklist', value: newBlacklist}, cb);
}

function blacklistToArray(blacklist) {
	if (!blacklist) {
		blacklist = localStorage["blacklist"];
	}

	if (blacklist) {
		return JSON.parse(blacklist);
	}
}