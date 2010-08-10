require 'whereuat/configuration'
require 'whereuat/rack_app'
require 'whereuat/helpers'
require 'whereuat/rails' if defined?(Rails)

module Whereuat
  class << self
    attr_writer :configuration

    def configuration
      @configuration ||= Configuration.new
    end

    def configure
      yield(configuration)
    end

    def load_rake_tasks!
      load gem_root+'lib/whereuat/tasks.rb'
    end

    def assets_path
      Rails.root+'public/whereuat'
    end

    def gem_root
      @gem_root ||= Pathname('../..').expand_path(__FILE__)
    end
  end
end
