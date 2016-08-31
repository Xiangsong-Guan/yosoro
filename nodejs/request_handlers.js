function start(response, data)
{
  response.writeHead(200, {"Content-Type": "text/plain"});
  response.write("Hello, world!");
  response.end();
}

exports.start = start;