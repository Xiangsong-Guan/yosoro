fl_p = require "./myutils/file_process"
my_u = require "./myutils/myutil"

type_and_dir =
	html: "/home/kxx/http/nodejs/container/html/"
	audio: "/home/kxx/http/nodejs/container/media/audio/"
type_and_ext =
  html: ".html"
  audio: ".mp3"
type_and_mime =
  html: "text/html"
  audio: "audio/mpeg"

resource = (response, data) ->
	if !data.header_range
		fl_p.no_range type_and_dir[data.type] + data.name + type_and_ext[data.type], (err_1, file_data) ->
			if !err_1 then my_u.write_res response, 200,	"Content-Type": type_and_mime[data.type], file_data	else my_u.write_res response, 500, "Content-Type": "text/plain", "#{err_1}\n"
			return
	else
		fl_p.with_range type_and_dir[data.type] + data.name + type_and_ext[data.type], data.header_range, (err_2, out_of_range, file_data) ->
			if !err_2
				if !out_of_range
					my_u.write_res response, 206,
            "Content-Type": type_and_mime[data.type]
            "Content-Range": "bytes " + file_data.start + "-" + file_data.end + "/" + file_data.file_size
            "Content-Length": file_data.size, file_data.data
				else
					my_u.write_res response, 406, "Content-Range": "bytes */" + file_data.file_size, null
			else
				my_u.write_res response, 500, "Content-Type": "text/plain", "#{err_2}\n"
			return
	return

login = (response, data) ->
	# to do...

logout = (response, data) ->
	# to do...

search = (response, data) ->
	# to do...

exports.resource = resource
exports.login = login
exports.logout = logout
exports.search = search