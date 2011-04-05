#!/usr/bin/env ruby

require 'fileutils'

ROOT = File.expand_path File.dirname(__FILE__)
TMP_ROOT = File.join ROOT, 'tmp'
BUILD_ROOT = File.join TMP_ROOT, 'build'
AMBER_ROOT = File.join TMP_ROOT, 'amber'
AMBER_JS   = File.join AMBER_ROOT, 'amber.js'

# This script will use the build tools to create amber.js and related plugins.
# The final expected output can be found in tmp/amber.

# Requires UglifyJS
if `which uglifyjs`.size == 0
  puts "Requires UglifyJS.  npm install uglifyjs first"
  exit 1
end

# Build Amber
puts "Building sproutcore/amber..."
FileUtils.rm_r BUILD_ROOT if File.exists?(BUILD_ROOT)
puts `sc-build amber -rcv --languages=en --build=amber --project=#{ROOT}`

# Get built file and remove jquery
puts "Copying file and removing jquery..."
lines = File.read(File.join(BUILD_ROOT, 'static', 'amber', 'en', 'amber', 'javascript-packed.js'))

jquery_regex = /\/\*!?\n \* jQuery.+\/\*!? SLICE \*\//m
if lines =~ jquery_regex
  lines = lines.gsub(jquery_regex, '')
else
  puts "WARNING: jQuery Regex Could not be matched.  Make sure you put /* SLICE */ at the end of the jQuery file"
end

license = File.read File.join(ROOT, 'license.js')
license = license.gsub('SproutCore -- JavaScript Application Framework', "Amber -- MVC library for jQuery\n * Part of the SproutCore project: http://www.sproutcore.com\n")

FileUtils.mkdir_p AMBER_ROOT

puts "Running UglifyJS"
File.open(AMBER_JS, 'w') { |fd| fd.write lines }
lines = `uglifyjs #{AMBER_JS}`

File.open(AMBER_JS, 'w') do |fd| 
  fd.write license
  fd.write lines
end

puts "Amber built at #{AMBER_ROOT}"




