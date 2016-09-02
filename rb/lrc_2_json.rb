# encoding: GB18030

yinhao = '"'
maohao = ':'
douhao = ','
huanhang = "\n"
zuodakuohao = "{"
youdakuohao = "}"
keyword1 = "time"
keyword2 = "aqours_css_i"
keyword3 = "lrc_o"
keyword4 = "lrc_t"

dest_file = "output.json"
vice_file = "trans"
time_tmp_rexp = /\[[\d][\d]:[\d][\d].[\d][\d]\]/

def combine(count)
	n = 0
	while n < count
		yield(n)
		n = n + 1
	end
end

print "Pleas enter the file path: "
source_path = gets
source_path.chomp!

#处理每一行的回车符。
lrc = IO.readlines(source_path, encoding: Encoding::GB18030)
lrc.each do |l|
	if l.end_with? "\n"
		l.chomp!
	end
end
tran_lrc = IO.readlines(vice_file, encoding: Encoding::GB18030)
tran_lrc.each do |l|
	if l.end_with? "\n"
		l.chomp!
	end
end

#分离时间和歌词到不同的数组中
time_tmp = Array.new()
lrc.each do |l|
	time_tmp_rexp.match(l) do |t|
		time_tmp.push(t.to_s[1..-2])
	end
end
lrc.each do |l|
	l.sub!(time_tmp_rexp, "")
end

#转换时间形式，00:00.00 => 00.00
tmp_a = Array.new()
time = Array.new()
tmp_f = 0.0;
time_tmp.each do |t|
	tmp_a = t.split(':')
	tmp_f = (tmp_a[0].to_f * 60.0) + tmp_a[1].to_f;
	time.push(tmp_f.round(5).to_s);
end

combine(lrc.length) do |n|
	IO.write(dest_file, (zuodakuohao + keyword1 + maohao + time[n] + douhao + keyword2 + maohao + "0" + douhao + keyword3 + maohao + yinhao + lrc[n] + yinhao + douhao + keyword4 + maohao + yinhao + tran_lrc[n] + yinhao + youdakuohao + douhao + huanhang), mode: "a", encoding: Encoding::GB18030)
end

exit 0