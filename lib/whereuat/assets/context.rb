module Whereuat
  module Assets
    class Context

      # bg becomes bg_uri. bg_uri yields a data uri of the image.
      ImageMap = {
        :bg         => 'uat-bg.png',
        :logo       => 'uat-logo.gif',
        :accept     => 'accept.png',
        :reject     => 'reject.png',
        :pt         => 'pt.png',
        :btnreject  => 'btnreject.png',
        :spinner    => 'spinner.gif'
      }

      ImageMap.each do |k,v|
        define_method("#{k}_uri") { Image.new( images_root + v ) }
      end

      protected

      def images_root
        @images_root ||= Whereuat.dev_root+'images'
      end
    end
  end
end

