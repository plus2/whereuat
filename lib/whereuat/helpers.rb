module Whereuat
  module Helpers
    def whereuat
      wua = "<script type='text/javascript'>var whereuat_stylesheet_url=#{Whereuat.configuration.whereuat_stylesheet_url.to_json};</script>" +
            "<script type='text/javascript' src='#{Whereuat.configuration.whereuat_javascript_url}'></script>"

      wua.respond_to?(:html_safe) ? wua.html_safe : wua
    end
  end
end

