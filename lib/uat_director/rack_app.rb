require 'pathname'
require 'haml'
require 'pivotal-tracker'

module UatDirector
  class RackApp
    PT = PivotalTracker

    def initialize(app)
      @app             = app
      PT::Client.token = config.pivotal_tracker_token 
    end

    def call(env)
      case env["PATH_INFO"]
      when /^\/uat_director$/
        index
      when /^\/uat_director\/(.*)\/accept/
        accept $1
      else
        @app.call(env)
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

    def template_root
      Pathname.new(__FILE__).parent + "templates"
    end

    def config
      UatDirector.configuration
    end
  end
end

