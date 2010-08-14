require 'rubygems'
require 'rake'

begin
  require 'jeweler'
  Jeweler::Tasks.new do |gem|
    gem.name = "whereuat"
    gem.summary = %Q{Direct your clients to test delivered features}
    gem.description = %Q{Adds a toolbar to your rails app that directs your clients to test stories that have been marked as 'delivered' in Pivotal Tracker }
    gem.email = "ben.askins@plus2.com.au"
    gem.homepage = "http://github.com/plus2/whereuat"
    gem.authors = ["Ben Askins", "Lachie Cox", "Ben Webster"]
    # gem is a Gem::Specificatiohttp://www.rubygems.org/read/chapter/20 n... see http://www.rubygems.org/read/chapter/20 for additional settings
    gem.add_dependency("pivotal-tracker", ">= 0.1.3")
    gem.add_dependency("haml", ">= 2.2.0")
    gem.add_dependency("rack", ">= 1.0.0")
  end
  Jeweler::GemcutterTasks.new
rescue LoadError
  puts "Jeweler (or a dependency) not available. Install it with: gem install jeweler"
end


rake_app = Rake::Application.new
rake_app.collect_tasks
if rake_app.top_level_tasks.include?('dev')
  require 'pathname'

  sh "bundle check || bundle install"

  task :dev => %w{dev:run}

  namespace :dev do
    task :run => :setup do
      sh 'bundle exec shotgun --server thin dev/dev.rb'
    end

    task :setup do
      gem_root = Pathname('..').expand_path(__FILE__)
      pivotal_config = gem_root+'pivotal_config.dont_commit.rb'
      unless pivotal_config.exist?
        puts "What's your pivotal tracker token? (find your down the bottom of https://www.pivotaltracker.com/profile)."
        token = $stdin.gets.chomp

        puts "What pivotal tracker project do you want to test against? (e.g. The digits at the end of http://www.pivotaltracker.com/projects/12345)."
        project_id = $stdin.gets.chomp

        puts "Creating config using your details."

        pivotal_config.open('w') {|f|
          f << %{Whereuat.configure do |config|
                  config.pivotal_tracker_token   = "#{token}"
                  config.pivotal_tracker_project = #{project_id}
                end
          }.gsub(/^\s{3,16}/,'')
        }
      end
    end
  end

else
  desc "set up and run app in a convenient dev-only way. rake dev *must* be called as the only top level task (i.e. as 'rake dev')"
  task :dev do
    abort "Please run rake dev as 'rake dev'"
  end
end

task :bundled_env do
  require 'rubygems'
  require 'bundler'
  Bundler.setup

  $LOAD_PATH << File.expand_path('../lib',__FILE__)
  require 'whereuat'
end

namespace :assets do
  task :rebuild => :bundled_env do
    Whereuat::Assets.rebuild!
  end
end
