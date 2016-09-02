var file_process = require("./myutil/file_process");

var res_type_attr_name = "type";
var res_name_attr_name = "name";

var type_and_dir =
{
  "html": "./nodejs/html/",
  "audio": "./nodejs/container/media/audio/"
}

var type_and_ext =
{
  "html": ".html",
  "audio": ".mp3"
}

var type_and_mime =
{
  "html": "text/html",
  "audio": "audio/mpeg"
}

function resource(response, data)
{
  var res_type = data[res_type_attr_name];
  var full_path = type_and_dir[res_type] + data[res_name_attr_name] + type_and_ext[res_type];

  if(!data["header_range"])
  {
    file_process.no_range(full_path, function(err, file_data)
    {
      if(!(err))
      {
        response.writeHead(200, {"Content-Type": type_and_mime[res_type]});
        response.write(file_data);
        response.end();
      }
      else
      {
        response.writeHead(500, {"Content-Type": "text/plain"});
        response.write(err + "\n");
        response.end();
      }
    });
  }
  else
  {
    file_process.with_range(full_path, data["header_range"], function(err, out_of_range, file_data)
    {
      if(!(err))
      {
        if(!out_of_range)
        {
          response.writeHead(206,
          {
            "Content-Type": type_and_mime[res_type],
            "Content-Range": "bytes " + file_data["start"] + "-" + file_data["end"] + "/" + file_data["file_size"],
            "Content-Length": file_data["size"]
          });
          response.write(file_data["data"]);
          response.end();
        }
        else
        {
          response.writeHead(406, {"Content-Range": ("bytes */" + file_data["file_size"])});
          response.end();
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

exports.resource = resource;
exports.login = login;
exports.logout = logout;
exports.search = search;