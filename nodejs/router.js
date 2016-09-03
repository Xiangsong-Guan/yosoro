var request_handlers = require("./request_handlers");
var myutil = require("./myutils/myutil");

const handle =
{
	"/resource": request_handlers.resource,
	//"/search": request_handlers.search,
	//"/login": request_handlers.login,
	//"/logout": request_handlers.logout
}

function route(path_name, response, data)
{
	if(typeof handle[path_name] === 'function')
	{
		handle[path_name](response, data);
	}
	else
	{
		myutil.res(response, 404,
		{
			"Content-Type": "text/plain",
			"Refresh"     : "5;url=http://localhost/"
		}, "404 NOT FOUND\n\n\nWE DO NOT KNOW WHAT YOU WANT TO DO...<(_ _)>\n\n\nREDIRECT TO HOME PAGE IN FIVE SECOND!");
	}
}

exports.route = route;