module UatDirector
  module Helpers
    def uat_director
      "<script type='text/javascript'>var uatdirector_stylesheet_url=#{UatDirector.configuration.whereuat_stylesheet_url.to_json};</script>" +
      "<script type='text/javascript' src='#{UatDirector.configuration.whereuat_javascript_url}'></script>"
    end
  end
end

