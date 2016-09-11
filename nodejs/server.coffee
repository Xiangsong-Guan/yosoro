http = require "http"
url  = require "url"
qr_s = require "querystring"
fmdb = require "formidable"
my_u = require "./myutils/myutil"

start = (route, handle) ->
	(http.createServer (request, response) ->
		if request.method == 'GET'
			get_data = qr_s.parse (url.parse request.url).query
			get_data.header_range = request.headers.range
			route (url.parse request.url).pathname, response, get_data
			return
		else
			form = new formidable.IncomingForm()
			form.parse request, (err_1, fields, files) ->
				if !err_1
					post_data =
						fields: fields
						files : files
					route (url.parse request.url).pathname, response, post_data
				else
					my_u.write_res response, 500, "Content-Type": "text/plain", "#{err_1}\n"
				return
		return).listen(5000)
	return

exports.start = start