var http        = require("http");
var url         = require("url");
var querystring = require("querystring");
var formidable  = require("./formidable");
var myutil = require("./myutils/myutil");

function start(route, handle) {
	http.createServer(function(request, response)
	{
		if(request.method === 'GET')
		{
			var get_data = querystring.parse(url.parse(request.url).query);

			get_data.header_range = request.headers.range;
			route(url.parse(request.url).pathname, response, get_data);
		}
		else
		{
			var form = new formidable.IncomingForm();

			form.parse(request, function(error, fields, files)
			{
				if(!(error))
				{
					var post_data =
					{
						"fields": fields,
						"files" : files
					};

					route(url.parse(request.url).pathname, response, post_data);
				}
				else
				{
					myutil.res(response, 500, {"Content-Type": "text/plain"}, (err + "\n"));
				}
			});
		}
	}).listen(5000);
}

exports.start = start;