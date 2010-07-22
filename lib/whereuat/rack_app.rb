require 'pathname'
require 'haml'
require 'pivotal-tracker'

require 'pp'

module Whereuat
  class RackApp
    PT = PivotalTracker

    def initialize(app)
      @app             = app
      PT::Client.token = config.pivotal_tracker_token 
    end

    def call(env)
      req = Rack::Request.new(env)
      
      if env?('development') && dev_rsp = dev_mode(req)
        return dev_rsp
      end

      case req.path
      when %r{^/whereuat$}
        index
      when %r{^/whereuat/(.*)/accept}
        accept $1
      when %r{^/whereuat/(.*)/reject}
        reject $1, req.params["reason"]
      else
        @app.call(env)
      end
    end

    def env?(env)
      (ENV['RACK_ENV'] || (defined?(Rails) && Rails.env)) == env
    end

    def dev_mode(req)
      case req.path
      when %r{^/whereuat/whereuat.css$}
        [200, {"Content-Type" => "text/css"}, [ (root + 'lib/whereuat/stylesheets/whereuat.css').read ]]
        
      when %r{^/whereuat/whereuat.js$}
        [200, {"Content-Type" => "text/javascript"}, [ (root + 'lib/whereuat/javascript/whereuat.js').read ]]
        
      end
    end

    def index
      @stories = project.stories.all(:current_state => "delivered")
      haml "index"
    end

    def accept(pivotal_story_id)
      story = project.stories.find(pivotal_story_id.to_i)  
      story.update(:current_state => 'accepted')
      render "Accepted" 
    end

    def reject(pivotal_story_id, reason=nil)
      story = project.stories.find(pivotal_story_id.to_i)  
      story.update(:current_state => 'rejected')
      story.notes.create(:text => "[rejected] #{reason}")
      render "Rejected" 
    end

    def project
      @project ||= PT::Project.find(config.pivotal_tracker_project)
    end

    def haml(file_name, options={})
      template = (template_root + "#{file_name}.haml").read
      render Haml::Engine.new(template).render(self)
    end

    def render(html)
      [200, {"Content-Type" => "text/html"}, [html]]
    end

    def root
      @root ||= Pathname("../../../").expand_path(__FILE__)
    end

    def template_root
      @template_root ||= root+'lib/whereuat/templates'
    end

    def config
      Whereuat.configuration
    end
  end
end

