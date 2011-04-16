`sc-build runtime handlebars core_foundation -c`

def uglify(string)
  IO.popen("uglifyjs", "r+") do |io|
    io.puts string
    io.close_write
    return io.read
  end
end

string = ""

["runtime", "handlebars", "core_foundation"].each do |framework|
  file = Dir["tmp/build/static/#{framework}/**/javascript.js"][0]

  string << File.read(file)
end

puts uglify(string)
