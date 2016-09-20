rq_h = require "./request_handlers"
my_u = require "./myutils/myutil"

handle =
	"/resource": rq_h.resource
	"/login"   : rq_h.login

route = (path_name, response, data) ->
	if typeof handle[path_name] == "function"
		handle[path_name] response, data
	else
		my_u.write_res response, 404, null, null, null
	return

exports.route = route