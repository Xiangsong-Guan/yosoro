var router, server, request_handlers, type_and_dir, type_and_ext, type_and_mime, handle;

server           = require("./server");
router           = require("./router");
request_handlers = require("./request_handlers");

type_and_dir =
  {
    "html" : "/home/kxx/http/yosoro/nodejs/container/html/",
    "audio": "/home/kxx/http/yosoro/nodejs/container/media/audio/",
    "video": "/home/kxx/http/yosoro/nodejs/container/media/video/"
  };

type_and_ext =
  {
    "html" : ".html",
    "audio": ".opus",
    "video": ".webm"
  };

type_and_mime =
  {
    "html" : "text/html",
    "audio": "audio/opus",
    "video": "video/webm"
  };

handle =
  {
    "/resource": request_handlers.resource,
    "/login"   : request_handlers.login
  };

server.start(router.route, handle);

exports.type_and_dir  = type_and_dir;
exports.type_and_ext  = type_and_ext;
exports.type_and_mime = type_and_mime;