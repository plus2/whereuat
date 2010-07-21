(function($) {
  $(function() {
    var popOver, tab;

    $("body").prepend("<div id='uat-bar'><a class='go' href='#'>Show me what to test</a><div class='pop-over hide'></div></div>");
    $("head").prepend("<link href='"+window.whereuat_stylesheet_url+"' media='screen' rel='stylesheet' type='text/css'>");

    popOver = $("#uat-bar .pop-over");
    tab     = $("#uat-bar a.go");

    tab.toggle(
      function() {
        if (popOver.find("ol").length > 0) {
          slideOut();
        } else {
          $.ajax({
            url: '/whereuat',
            success: function(response) {
              popOver.append(response); 
              slideOut();
            }
          });
        }
      },
      function() {
        slideIn();
      }
    );

    function slideOut() {
      popOver.show("slide", {direction: "left"}, 500);
      tab.animate({left: '400px'}, 510);
    }

    function slideIn() {
      tab.animate({left: '0px'}, 490);
      popOver.hide("slide", {direction: "left"}, 500);
    }

    $("#uat-bar a.accept").live("click", function() {
      var acceptLink, storyLink, storyId;
      acceptLink = $(this);
      storyId = acceptLink.siblings(".story-id").html();
      storyLink = acceptLink.siblings("a.story");
      $.ajax({
        method: "POST",
        url: '/whereuat/' + storyId + '/accept',
        success: function(response) {
          storyLink.css("text-decoration", "line-through");
          storyLink.css("background", "green");
        }
      });
    });

    $("#uat-bar a.reject").live("click", function() {
      var acceptLink, storyLink, storyId;
      acceptLink = $(this);
      storyId = acceptLink.siblings(".story-id").html();
      storyLink = acceptLink.siblings("a.story");
      $.ajax({
        method: "POST",
        url: '/whereuat/' + storyId + '/reject',
        success: function(response) {
          storyLink.css("text-decoration", "line-through");
          storyLink.css("background", "red");
        }
      });
    });

  });
})(jQuery);
