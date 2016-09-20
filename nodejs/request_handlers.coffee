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
			if !err_1 then my_u.write_res response, 200, type_and_mime[data.type], null, file_data else my_u.write_res response, 500, null, null, "#{err_1}"
			return
	else
		fl_p.with_range type_and_dir[data.type] + data.name + type_and_ext[data.type], data.header_range, (err_2, out_of_range, file_data) ->
			if !err_2
				if !out_of_range
					my_u.write_res response, 206, type_and_mime[data.type],
												 ["bytes #{file_data.start}-#{file_data.end}/#{file_data.file_size}"
												 file_data.size], file_data.data
				else
					my_u.write_res response, 406, null, "bytes */#{file_data.file_size}", null
			else
				my_u.write_res response, 500, null, null, "#{err_2}"
			return
	return

login = (response, data) ->
	#to do ...

	fl_p.no_range "#{type_and_dir.html}preface.html", (err_1, file_data) ->
		if !err_1 then my_u.write_res response, 200, "text/html", null, file_data else my_u.write_res response, 500, null, null, "#{err_1}"
		return
	return

logout = (response, data) ->
	# to do...

search = (response, data) ->
	# to do...

exports.resource = resource
exports.login = login
exports.logout = logout
exports.search = search