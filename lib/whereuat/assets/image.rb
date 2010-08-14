module Whereuat
  module Assets
    class Image
      def initialize(path)
        @path = Pathname(path)
      end

      def to_s
        "data:#{content_type};base64," + ([@path.read].pack("m").gsub("\n",''))
      end

      def content_type
        case @path.to_s[/\.([^\.]+)$/,1]
        when 'png'
          'image/png'
        when 'gif'
          'image/gif'
        end
      end
    end
  end
end
