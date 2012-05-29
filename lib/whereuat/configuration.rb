module Whereuat
  class Configuration
    attr_accessor :pivotal_tracker_token
    attr_accessor :pivotal_tracker_project
    attr_reader   :use_ssl

    def initialize
      @use_ssl = false
    end

    def use_ssl=(b)
      @use_ssl = !!b
    end

  end
end
