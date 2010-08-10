namespace :whereuat do
  desc "install whereuat's image, js & css assets into the app's public directory, for faster serving"
  task :install do
    Whereuat.assets_path.mkpath

    lib = Whereuat.gem_root+'lib/whereuat'

    FileList[lib+'javascript/*.js', lib+'stylesheets/*'].each do |path|
      to = Whereuat.assets_path + File.basename(path)
      cp path, to
    end
  end
end
