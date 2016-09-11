write_res = (res, code, headers, body) ->
	res.writeHead code, headers
	if body
		res.write body
	res.end null
	return

exports.write_res = write_res