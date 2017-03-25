var config = require("../config");
var helps = require("../common/helps");
var proxy = require('../proxy');

exports.saveUserSession = saveUserSession;
exports.removeUserSession = removeUserSession;
exports.getUserBySession = getUserBySession;
exports.requiredLogin = requiredLogin;
exports.getCsrfToken = getCsrfToken;
exports.requireAdmin = requireAdmin;
exports.requireTopicDeletePermission = requireTopicDeletePermission;

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
    var url = config.url.host + '/users/login?type=redirect';
    if (req.xhr) {
      helps.jsonRedirect(res, url);
    } else {
      res.redirect(url);//if not logged in, redirect to loggin page
    }
    
  }
}

//intercept action that requires site admin privilege
function requireAdmin(req, res, next) {
  if (req.session && req.session.user._id == config.adminId) {
    next();
  } else {
    next(new Error("Require admin permission!"));
  }
}


/** Check if requester has the permission to delete topic
 *  @param req: Incoming message, must contain the id of topic to delete(topicId)
 */
function requireTopicDeletePermission(req, res, next) {
  
  proxy.Topic.getUserNameByTopicId(req.body.topicId, function (err, result) {
    if (result.length == 0) {
      return res.json(({msg: "No such topic!", status: 1}))
    }
    var topicUserName = result[0]._doc.userName;
    if (req.session && (req.session.user._id == config.adminId || req.session.user.userName == topicUserName )) {
      next()
    }
    else {
      return res.json({msg: "Permission denied!", status: 1});
    }
  });
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

