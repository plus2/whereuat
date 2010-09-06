
module Whereuat
  module Assets
    class << self
      def rebuild!
        Whereuat.assets_path.mkpath

        Whereuat.javascript_file.open('w') {|f| f << Whereuat.javascript}
        Whereuat.css_file.open('w')        {|f| f << Whereuat.css       }
      end
    end

    autoload :Image  , 'whereuat/assets/image'
    autoload :Context, 'whereuat/assets/context'

    def template_ctx
      Context.new
    end

    def mustache
      @mustache ||= begin
                      require 'mustache'
                      Mustache
                    end
    end

    def javascript
      mustache.render(javascript_template_file.read, Context.new)
    end

    def css
      mustache.render(css_template_file.read, Context.new)
    end

    def dev_root
      @dev_root ||= gem_root+'dev'
    end

    def javascript_template_file
      @javascript_template_file ||= dev_root+'javascripts/whereuat.js.mustache'
    end

    def css_template_file
      @css_template_file ||= dev_root+'stylesheets/whereuat.css.mustache'
    end

    def javascript_file
      @javascript_file ||= assets_path+'whereuat.js'
    end

    def css_file
      @css_file ||= assets_path+'whereuat.css'
    end

    def inline_javascript
      javascript_file.exist? ? javascript_file.read : ''
    end

    def inline_css
      css_file.exist? ? css_file.read : ''
    end
  end
end
