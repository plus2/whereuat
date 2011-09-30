module Whereuat
  class Widget
    extend Whereuat::Helpers
    
    def self.render(response)
      body = response.body
      if response.content_type == "text/html" && position = body.index('</body>')
        body.insert(position, whereuat)
      end
    end
  end
end