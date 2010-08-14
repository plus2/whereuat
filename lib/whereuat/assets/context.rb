module Whereuat
  module Assets
    class Context
      def bg_url
        Image.new(images_root+'uat-bg.png')
      end

      def spinner_url
        Image.new(images_root+'spinner.gif')
      end

      def images_root
        @images_root ||= Whereuat.dev_root+'images'
      end
    end
  end
end

