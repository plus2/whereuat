require 'whereuat/configuration'
require 'whereuat/rack_app'
require 'whereuat/helpers'

ActionView::Base.send :include, Whereuat::Helpers

module Whereuat
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
