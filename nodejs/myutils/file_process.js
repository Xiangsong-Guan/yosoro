var fs = require("fs");

const default_len = 1048576;

function no_range(full_path, callback)
{
	fs.stat(full_path, function(err, stats)
	{
		if(!err)
		{
			if(stats.isFile())
			{
				fs.readFile(full_path, function(error, data)
				{
					callback(error, data);
				});
			}
			else
			{
				callback("NO SUCH RESOURCE!", null);
			}
		}
		else
		{
			callback(err, null);
		}
	});
}

function with_range(full_path, range, callback)
{
	var stats = fs.statSync(full_path);

	if(!stats.isFile())
	{
		callback("NO SUCH RESOURCE!", false, null);
		return 1;
	}

	var array = range.split(/bytes=([0-9]*)-([0-9]*)/);
  var start = isNaN(parseInt(array[1])) ? 0 : parseInt(array[1]);
  var end = isNaN(parseInt(array[2])) ? ((default_len >= (stats.size - start)) ? (stats.size - 1) : (start + default_len - 1)) : parseInt(array[2]);

	if(start >= stats.size || end >= stats.size)
	{
		callback(null, true, {"file_size": stats.size});
		return 1;
	}

	fs.open(full_path, "r", function(error, fd)
	{
		if(!error)
		{
			var buf = new Buffer(end - start + 1);

			fs.read(fd, buf, 0, (end - start + 1), start, function(err, len, buffer)
			{
				if(!err)
				{
					callback(null, false,
					{
						"size": len,
						"start": start,
						"end": end,
						"file_size": stats.size,
						"data": buffer
					});

					stats = null;
					start = null;
					end = null;
					buf = null;
				}
				else
				{
					callback(err, false, null);
				}
			});
		}
		else
		{
			callback(error, false, null);
		}
	});
}

exports.with_range = with_range;
exports.no_range = no_range;