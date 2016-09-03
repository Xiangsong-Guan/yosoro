var file_process = require("./myutils/file_process");
var myutil = require("./myutils/myutil");

const type_and_dir =
{
  "html": "./nodejs/html/",
  "audio": "./nodejs/container/media/audio/"
}

const type_and_ext =
{
  "html": ".html",
  "audio": ".mp3"
}

const type_and_mime =
{
  "html": "text/html",
  "audio": "audio/mpeg"
}

function resource(response, data)
{
  if(!data.header_range)
  {
    file_process.no_range((type_and_dir[data.type] + data.name + type_and_ext[data.type]), function(err, file_data)
    {
      if(!(err))
      {
        myutil.res(response, 200, {"Content-Type": type_and_mime[data.type]}, file_data);
      }
      else
      {
        myutil.res(response, 500, {"Content-Type": "text/plain"}, (err + "\n"));
      }
    });
  }
  else
  {
    file_process.with_range((type_and_dir[data.type] + data.name + type_and_ext[data.type]), data.header_range, function(err, out_of_range, file_data)
    {
      if(!(err))
      {
        if(!out_of_range)
        {
          myutil.res(response, 206,
          {
            "Content-Type": type_and_mime[data.type],
            "Content-Range": "bytes " + file_data.start + "-" + file_data.end + "/" + file_data.file_size,
            "Content-Length": file_data.size
          }, file_data.data);
        }
        else
        {
          myutil.res(response, 406, {"Content-Range": ("bytes */" + file_data.file_size)}, null);
        }
      }
      else
      {
        myutil.res(response, 500, {"Content-Type": "text/plain"}, (err + "\n"));
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