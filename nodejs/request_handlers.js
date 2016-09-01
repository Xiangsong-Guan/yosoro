var fs = require("fs");

var get_html_name = "n";
var ext_html = ".html";
var pwd = "./nodejs/";
var dir_html = "html/";

//function start(response, data)
//{
//  response.writeHead(200, {"Content-Type": "text/plain"});
//  response.write("Hello, world!");
//  response.end();
//}

function container(response, data)
{
  //to do...
}

function html(response, data)
{
  var full_path = pwd + dir_html + data[get_html_name] + ext_html;

  fs.stat(full_path, function(err, stats)
  {
    if(!(err))
    {
      if(stats.isFile())
      {
        fs.readFile(full_path, function(error, file_data)
        {
          if(!(error))
          {
            response.writeHead(200, {"Content-Type": "text/html"});
            response.write(file_data);
            response.end();
          }
          else
          {
            response.writeHead(500, {"Content-Type": "text/plain"});
            response.write(error + "\n");
            response.end();
          }
        });
      }
    }
    else
    {
			response.writeHead(500, {"Content-Type": "text/plain"});
			response.write(err + "\n");
			response.end();
    }
  });
}

function login(response, data)
{
  //to do...
}

function logout(response, data)
{
  //to do...
}

function search(response, data)
{
  //to do...
}

exports.html = html;
exports.container = container;
exports.login = login;
exports.logout = logout;
exports.search = search;