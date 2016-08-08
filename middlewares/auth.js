var config = require("../config");
var helps = require("../common/helps");

exports.saveUserSession = saveUserSession;
exports.removeUserSession = removeUserSession;
exports.getUserBySession = getUserBySession;
exports.requiredLogin = requiredLogin;
exports.getCsrfToken = getCsrfToken;

function getUserBySession(req, callback) {
	if (req.session && req.session.user) {
		return callback(req.session.user);
	} else {
		return callback(false);
	}
}

function requiredLogin(req, res, next) {
	if (req.session && req.session.user) {
		return next();
	} else {
		var url = config.url.host+'/users/login?type=redirect';
		if (req.xhr) {
			helps.jsonRedirect(res, url);
		} else {
			res.redirect(url);//if not logged in, redirect to loggin page
		}

	}
}

function saveUserSession(req, user) {
	var session = req.session;
	session.user = user;
}

function removeUserSession(req, callback) {
	req.session.destroy(callback);
}

function getCsrfToken(req, res, next) {
	req.session.csrfSecret = undefined;
	res.locals.csrfToken = req.csrfToken();
	return next();
}

