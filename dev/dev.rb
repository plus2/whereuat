require 'rubygems'
require 'bundler'
Bundler.setup

require 'sinatra'
require 'haml'

require 'pathname'
require 'pp'

# pull in whereuat proper
root = Pathname( Sinatra::Application.root ).parent
$LOAD_PATH << root+'lib'
require 'whereuat'

class Object
  def tapp(tag=nil)
    print "#{tag}=" if tag
    pp self
    self
  end
end

load Whereuat.gem_root+'pivotal_config.dont_commit.rb'

helpers do
  include Whereuat::Helpers
end

before do
  Whereuat::Assets.rebuild!
end

get '/' do
  haml :index
end
