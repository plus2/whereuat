module Whereuat
  class Railtie < Rails::Railtie
    initializer 'whereuat.middleware' do |app|
      app.config.middleware.insert_after(ActionDispatch::Static, Whereuat::RackApp)
    end
  end
end
