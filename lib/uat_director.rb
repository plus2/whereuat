require 'uat_director/configuration'
require 'uat_director/rack_app'
require 'uat_director/helpers'

ActionView::Base.send :include, UatDirector::Helpers

module UatDirector
  class << self
    attr_writer :configuration

    def configuration
      @configuration ||= Configuration.new
    end

    def configure
      yield(configuration)
    end
  end
end
