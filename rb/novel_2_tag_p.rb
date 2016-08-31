# encoding: GB18030

html_space = "&nbsp;"
para_begin = "<p>"
para_end = "</p>\n"
output = "output.out"

print "Pleas enter the file path: "
source_path = gets
source_path.chomp!

#转换空行，处理每一行的回车符。
para = IO.readlines(source_path, encoding: Encoding::GB18030)
para.each do |l|
	if l.end_with? "\n"
		l.chop!
	end
end
para.map! { |l| l == "" ? html_space : l }

para.each do |l|
	IO.write(output, (para_begin + l + para_end), mode: "a", encoding: Encoding::GB18030)
end

exit 0