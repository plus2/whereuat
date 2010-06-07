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
      if env["PATH_INFO"] =~ /^\/uat_director/
        index
      else
        @app.call(env)
      end
    end

    def index
      @project = PT::Project.find(config.pivotal_tracker_project)
      @stories = @project.stories.all(:current_state => "delivered")
      haml "index"
    end

    def haml(file_name, options={})
      template = (template_root + "#{file_name}.haml").read
      [200, {"Content-Type" => "text/html"}, [Haml::Engine.new(template).render(self)]]
    end

    def template_root
      Pathname.new(__FILE__).parent + "templates"
    end

    def config
      UatDirector.configuration
    end
  end
end

