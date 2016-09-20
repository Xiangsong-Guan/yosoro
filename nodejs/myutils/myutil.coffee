write_res = (res, code, type, key_header, body) ->
	switch code
		when 200
			res.writeHead 200, "Content-Type": type
			res.write body
			res.end null
		when 206
			res.writeHead 206,
										"Content-Type": type
										"Content-Range": key_header[0]
										"Content-Length": key_header[1]
			res.write body
			res.end null
		when 404
			res.writeHead 404,
										"Content-Type": "text/html"
										"Refresh": "5;url=http://ohayosoro.me/resource?type=html&name=matteteainowuta"
			res.write "<!DOCTYPE html><html><head><title>404 NOT FOUND</title></head><body style=\"font-family: 'Microsoft Yahei','Helvetica Neue',Helvetica,Arial,sans-serif; margin: 100px;\"><h1 style=\"font-size: 100px;\">:(</h1><h2>404 NOT FOUND</h2><p>We are sorry to say that we cannot find the things which you want to get. m( _ _ )m</p><p>Let's go back to the recommended song of this week -> #Mattete aino uta# by Aqours.</p><p>REDIRECTION IN THREE SECONDS...</p></body></html>"
			res.end null
		when 406
			res.writeHead 406, "Content-Range": key_header[0]
			res.end null
		when 500
			res.writeHead 500, "Content-Type": "text/html"
			res.write "<!DOCTYPE html><html><head><title>orz</title></head><body style=\"font-family: 'Microsoft Yahei','Helvetica Neue',Helvetica,Arial,sans-serif; margin: 100px;\"><h1 style=\"font-size: 100px;\">:(</h1><h2>SERVER DOWN</h2><p>We are sorry to say that our server maybe down at this time. m( _ _ )m</p><p>And we find out this error if caused by that #{body}.</p><p>It's our servers crush down or you make the wrong request? For the former, just contacr us. For the later, try it again with the right way.</p></body></html>"
			res.end null
		when 451
			res.writeHead 451,
										"Content-Type": "text/plain"
										"Refresh": "3;url=https://tools.ietf.org/html/rfc7725"
			res.write '451 Unavailable For Legal Reasons.\nREDIRECTION IN THREE SECONDS...'
			res.end null
		else
			res.writeHead 403,
										"Content-Type": "text/plain"
			res.write 'UNKNOWN ERROR, NOW WE ENTER THE ALERT MODE!'
			res.end null
	return

exports.write_res = write_res