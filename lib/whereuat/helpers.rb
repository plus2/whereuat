module Whereuat
  module Helpers
    def whereuat
      wua = "<style type='text/css'>#{Whereuat.inline_css}</style>" +
            "<script type='text/javascript'>#{Whereuat.inline_javascript}</script>"

      wua.respond_to?(:html_safe) ? wua.html_safe : wua
    end
  end
end

