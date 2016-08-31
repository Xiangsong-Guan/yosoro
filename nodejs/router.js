var request_handlers = require("./request_handlers");

var handle =
{
	"/c": request_handlers.container,
	"/h": request_handlers.html,
	"/": request_handlers.login,
	"/logout": request_handlers.logout
}

function route(path_name, response, data)
{
	if(typeof handle[path_name] === 'function')
	{
		handle[path_name](response, data);
	}
	else
	{
    response.writeHead(404,
		{
			"Content-Type": "text/plain",
			"Refresh"     : "5;url=http://localhost/"
		});
    response.write("404 NOT FOUND\n\n\nWE DO NOT KNOW WHAT YOU WANT TO DO...<(_ _)>\n\n\nREDIRECT TO HOME PAGE IN FIVE SECOND!");
    response.end();
	}
}

exports.route = route;