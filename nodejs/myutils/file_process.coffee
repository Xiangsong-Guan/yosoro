fs = require "fs"

default_len = 1048576

no_range = (full_path, callback) ->
	try
		stats = fs.statSync full_path
	catch exp_m
		stats = null
		callback "NO SUCH RESOURCE!", null
		return
	fs.readFile full_path, (err_2, data) ->
		callback err_2, data
		stats = null
		return
	return

with_range = (full_path, range, callback) ->
	try
		stats = fs.statSync full_path
	catch exp_m
		stats = null
		callback "NO SUCH RESOURCE!", false, null
		return
	array = range.split /bytes=([0-9]*)-([0-9]*)/
	start = if isNaN parseInt array[1] then 0 else parseInt array[1]
	end = if isNaN parseInt array[2] then (if default_len >= stats.size - start then stats.size - 1 else start + default_len - 1) else parseInt array[2]
	if start >= stats.size or end >= stats.size
		callback null, true, file_size: stats.size
		return
	fs.open full_path, "r", (err_3, fd) ->
		if !err_3
			buf = new Buffer end - start + 1
			fs.read fd, buf, 0, end - start + 1, start, (err_4, len, buffer) ->
				if !err_4
					callback null, false,
						size: len
						start: start
						end: end
						file_size: stats.size
						data: buffer
					stats = null
					start = null
					end = null
					buf = null
				else
					callback err_4, false, null
				return
		else
			callback err_3, false, null
		return
	return

exports.with_range = with_range
exports.no_range = no_range