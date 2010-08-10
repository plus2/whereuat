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

### Installing assets

By default, whereuat's assets are served as raw blobs from Github. Sometimes you'd rather serve them from within your app.

In Rails 3, after whereuat configuration above, its as simple as

    rake whereuat:install

In Rails 2, you need to create a `RAILS_ROOT/lib/tasks/whereuat.rake`
    require 'whereuat/tasks'

then
    rake whereuat:install

(You can always copy the assets in the gem over by hand)
    
**Please note** image assets are served from PLUS2's server at `conversant.com.au`. Configurable image urls are coming in a later version but for now please edit the paths manually.

## Note on Patches/Pull Requests

* Fork the project.
* Make your feature addition or bug fix.
* Add tests for it. This is important so I don't break it in a future version unintentionally.
* Commit, do not mess with rakefile, version, or history.
  (if you want to have your own version, that is fine but bump version in a commit by itself I can ignore when I pull)
* Send me a pull request. Bonus points for topic branches.

## Contributors

* Ben Askins
* Lachie Cox
* Ben Webster
* Daniel Neighman

## Copyright

Copyright &copy; 2010 Plus2. See LICENSE for details.
