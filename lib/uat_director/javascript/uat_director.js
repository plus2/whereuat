(function($) {
  $(function() {
    var popOver;

    $("body").prepend("<div id='uat-bar'><a class='go' href='#'>Show me what to test</a><div class='pop-over hide'></div></div>");
    $("head").prepend("<link href='"+window.whereuat_stylesheet_url+"' media='screen' rel='stylesheet' type='text/css'>");

    popOver = $("#uat-bar .pop-over");

    $("#uat-bar a.go").toggle(function() {
      $.ajax({
        url: '/uat_director',
        success: function(response) {
          popOver.append(response); 
          popOver.slideDown();
        }
      });
    },
    function() {
      popOver.slideUp(function() {
        $(".pop-over ol").remove();
      });
    });

    $("#uat-bar input.accept").live("change", function() {
      var checkbox, storyLink, storyId;
      checkbox = $(this);
      storyId = checkbox.siblings(".story-id").html();
      storyLink = checkbox.siblings("a");
      if (this.checked) {
        $.ajax({
          method: "POST",
          url: '/uat_director/' + storyId + '/accept',
          success: function(response) {
            storyLink.css("text-decoration", "line-through");
          }
        });
      }
    });

  });
})(jQuery);
