require 'rubygems'
require 'rake'

begin
  require 'jeweler'
  Jeweler::Tasks.new do |gem|
    gem.name = "uat_director"
    gem.summary = %Q{Direct your clients to test delivered features}
    gem.description = %Q{Adds a toolbar to your rails app that directs your clients to test stories that have been marked as 'delivered' in Pivotal Tracker }
    gem.email = "ben.askins@gmail.com"
    gem.homepage = "http://github.com/benaskins/uat_director"
    gem.authors = ["Ben Askins"]
    # gem is a Gem::Specificatiohttp://www.rubygems.org/read/chapter/20 n... see http://www.rubygems.org/read/chapter/20 for additional settings
    gem.add_dependency("pivotal-tracker", ">= 0.1.3")
    gem.add_dependency("haml", ">= 3.0.0")
    gem.add_dependency("rack", ">= 1.0.0")
  end
  Jeweler::GemcutterTasks.new
rescue LoadError
  puts "Jeweler (or a dependency) not available. Install it with: gem install jeweler"
end

