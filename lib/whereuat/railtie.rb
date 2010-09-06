module Whereuat
  class Railtie < Rails::Railtie
    initializer 'whereuat.middleware' do |app|
      app.config.middleware.insert_before(Rack::Lock, Whereuat::RackApp)
    end
    rake_tasks do
      Whereuat.load_rake_tasks!
    end
  end
end
