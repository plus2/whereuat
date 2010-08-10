module Whereuat

  class Configuration
    attr_accessor :pivotal_tracker_token
    attr_accessor :pivotal_tracker_project

    attr_accessor :whereuat_stylesheet_url
    attr_accessor :whereuat_javascript_url

    def initialize
      if Whereuat.assets_path.directory?
        use_internal_resources!
      else
        use_github_resources!
      end
    end

    def use_github_resources!
      puts "using github resources"
      self.whereuat_stylesheet_url = "http://github.com/plus2/whereuat/raw/master/lib/whereuat/stylesheets/whereuat.css"
      self.whereuat_javascript_url = "http://github.com/plus2/whereuat/raw/master/lib/whereuat/javascript/whereuat.js"
    end

    def use_internal_resources!
      puts "using internal resources"
      self.whereuat_stylesheet_url = "/whereuat/whereuat.css"
      self.whereuat_javascript_url = "/whereuat/whereuat.js"
    end
    alias :use_dev_resources! :use_internal_resources!
  end

end
