# encoding: GB18030

dest_file = "output.out"

print "Pleas enter the file path: "
source_path = gets
source_path.chomp!

#����ÿһ�еĻس�����
txt = IO.readlines(source_path, encoding: Encoding::GB18030)
txt.each do |l|
	if l.end_with? "\n"
		l.chomp!
	end
	IO.write(dest_file, l, mode: "a", encoding: Encoding::GB18030)
end