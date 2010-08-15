# whereuat

Adds a slide out panel to your rails app that directs clients to test stories that have been marked as 'delivered' in Pivotal Tracker.

![whereuat demo](http://img.skitch.com/20100806-gug4f5uapk6ixh64sk16qenf9s.jpg)

## Installing

Add whereuat to your Gemfile:

    gem 'whereuat'

Create an initializer to add the Whereuat::RackApp to your middleware stack and configure your pivotal tracker api token and project id:

    require 'whereuat'

    Whereuat.configure do |config|
      config.pivotal_tracker_token   = "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
      config.pivotal_tracker_project = 123456
    end

Use the following helper somewhere in your application layout (we recommend at the end of the body):

    = whereuat

The helper will insert a smidgeon of javascript that will add a tiny tab on the LHS of each page.

**Please note** that whereuat requires `jQuery` to be included in your layout or templates already.

Reload a page from your app and give it a whirl.

## Note on Patches/Pull Requests

* Fork the project.
* Make your feature addition or bug fix.
* Add tests for it. This is important so I don't break it in a future version unintentionally.
* Commit, do not mess with rakefile, version, or history.
  (if you want to have your own version, that is fine but bump version in a commit by itself I can ignore when I pull)
* Send me a pull request. Bonus points for topic branches.

### rake dev

If you'd like to contribute to `whereuat` you can get started by running

    rake dev

This sets up the correct configuration and environment (follow the instructions), then starts a sinatra app under shotgun. You can use this sinatra app to verify your work on `whereuat`.

All assets are regenerated from their constituents on each request. The constituents are located in the `dev` directory.

## Contributors

* Ben Askins
* Lachie Cox
* Ben Webster
* Daniel Neighman

## Copyright

Copyright &copy; 2010 Plus2. See LICENSE for details.
