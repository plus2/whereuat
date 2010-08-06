ActionView::Base.send :include, Whereuat::Helpers

if defined?(Rails::Railtie)
  require 'whereuat/railtie'
else
  Rails.configuration.middleware.use(Whereuat::RackApp)
end
