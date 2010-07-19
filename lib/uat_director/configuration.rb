module UatDirector

  class Configuration
    attr_accessor :pivotal_tracker_token
    attr_accessor :pivotal_tracker_project

    attr_accessor :whereuat_stylesheet_url
    attr_accessor :whereuat_javascript_url

    def initialize
      self.whereuat_stylesheet_url = "http://github.com/plus2/whereuat/raw/master/lib/uat_director/stylesheets/uat_director.css"
      self.whereuat_javascript_url = "http://github.com/plus2/whereuat/raw/master/lib/uat_director/javascript/uat_director.js"
    end
  end

end
