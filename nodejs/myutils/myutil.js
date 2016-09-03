function res(res, code, headers, body)
{
	res.writeHead(code, headers);
	if(body)
	{
		res.write(body);
	}
	res.end();
}

exports.res = res;