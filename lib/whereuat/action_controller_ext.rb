if Whereuat.configuration.enable_widget

  already_inherited = defined?(ApplicationController)
  
  [ActionController::Base, already_inherited ? ApplicationController : nil].compact.each do |base|
    base.class_eval do
      after_filter :render_whereuat
      
      private
      def render_whereuat
        Whereuat::Widget.render(response)
      end
    end
  end
  
end