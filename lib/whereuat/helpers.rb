module Whereuat
  module Helpers
    def whereuat
      "<script type='text/javascript'>var whereuat_stylesheet_url=#{Whereuat.configuration.whereuat_stylesheet_url.to_json};</script>" +
      "<script type='text/javascript' src='#{Whereuat.configuration.whereuat_javascript_url}'></script>"
    end
  end
end

