rq_h = require "./request_handlers"
my_u = require "./myutils/myutil"

handle =
	"/resource": rq_h.resource
	"/login"   : rq_h.login

route = (path_name, response, data) ->
	if typeof handle[path_name] == "function"
		handle[path_name] response, data
	else
		my_u.write_res response, 404,
			"Content-Type": "text/plain"
			"Refresh": "5;url=http://ohayosoro.me/",
			"404 NOT FOUND\n\n\nWE DO NOT KNOW WHAT YOU WANT TO DO...<(_ _)>\n\n\nREDIRECT TO HOME PAGE IN FIVE SECOND!"
	return

exports.route = route