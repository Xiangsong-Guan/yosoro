var login, logout, resource, search, index, write_response, file_process;

index = require("./index");
write_response = require("./myutils/write_response");
file_process = require("./myutils/file_process");

resource = (response, data) =>
{
  if(!data["header_range"])
  {
    file_process.no_range(index.type_and_dir[data["type"]] + data["name"] + index.type_and_ext[data["type"]], (err_1, file_data) =>
    {
      if(!err_1)
      {
        write_response.write_res(response, 200, index.type_and_mime[data["type"]], null, file_data);
      }
      else
      {
        write_response.write_res(response, 500, null, null, "" + err_1);
      }
    });
  }
  else
  {
    file_process.with_range(index.type_and_dir[data["type"]] + data["name"] + index.type_and_ext[data["type"]], data["header_range"], (err_2, out_of_range, file_data) =>
    {
      if(!err_2)
      {
        if(!out_of_range)
        {
          write_response.write_res(response, 206, index.type_and_mime[data["type"]], ["bytes " + file_data["start"] + "-" + file_data["end"] + "/" + file_data["file_size"], file_data["size"]], file_data["data"]);
        }
        else
        {
          write_response.write_res(response, 406, null, "bytes */" + file_data["file_size"], null);
        }
      }
      else
      {
        write_response.write_res(response, 500, null, null, "" + err_2);
      }
    });
  }
};

login = (response, data) =>
{
  file_process.no_range(index.type_and_dir["html"] + "preface.html", (err_1, file_data) =>
  {
    if(!err_1)
    {
      write_response.write_res(response, 200, "text/html", null, file_data);
    }
    else
    {
      write_response.write_res(response, 500, null, null, "" + err_1);
    }
  });
};

logout = (response, data) =>
{};

search = (response, data) =>
{};

exports.resource = resource;
exports.login    = login;
exports.logout   = logout;
exports.search   = search;