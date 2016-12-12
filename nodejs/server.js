var formidable, url, querystring, http, write_response, start;

http           = require("http");
querystring    = require("querystring");
url            = require("url");
formidable     = require("./formidable");
write_response = require("./myutils/write_response");

start = (route, handle) =>
{
  (http.createServer((request, response) =>
  {
    var form, get_data;
    if(request.method === 'GET')
    {
      get_data = querystring.parse((url.parse(request.url)).query);
      get_data["header_range"] = request.headers.range;
      route(handle, (url.parse(request.url)).pathname, response, get_data);
    }
    else if(request.method === 'POST')
    {
      form = new formidable.IncomingForm();
      form.parse(request, (err_1, fields, files) =>
      {
        var post_data;
        if(!err_1)
        {
          post_data =
            {
              "fields": fields,
              "files" : files
            };
          route(handle, (url.parse(request.url)).pathname, response, post_data);
        }
        else
        {
          write_response.write_res(response, 500, null, null, "" + err_1);
        }
      });
    }
    else
    {
      write_response.write_res(response, 0, null, null, null);
    }
  })).listen(5000);
};

exports.start = start;