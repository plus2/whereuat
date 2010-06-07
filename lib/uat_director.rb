require 'uat_director/configuration'
require 'uat_director/rack_app'
require 'uat_director/helpers'

ActionView::Base.send :include, UatDirector::Helpers

module UatDirector
  class << self
    attr_accessor :configuration

    def configure
      self.configuration ||= Configuration.new
      yield(configuration)
    end
  end
end
