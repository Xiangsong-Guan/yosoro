function start(response, data)
{
  response.writeHead(200, {"Content-Type": "text/plain"});
  response.write("Hello, world!");
  response.end();
}

function container(response, data)
{
  //to do...
}

function html(response, data)
{
  //to do...
}

function login(response, data)
{
  //to do...
}

function logout(response, data)
{
  //to do...
}

exports.html = html;
exports.container = container;
exports.login = login;
exports.logout = logout;