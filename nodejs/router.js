var route, write_response;

write_response = require("./myutils/write_response");

route = (handle, path_name, response, data) =>
{
  if(typeof handle[path_name] === "function")
  {
    handle[path_name](response, data);
  }
  else
  {
    write_response.write_res(response, 404, null, null, null);
  }
};

exports.route = route;