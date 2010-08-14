(function($) {
  $(function() {
    var popOver, tab, stories;

    $("body").prepend("<div id='uat-bar'><a class='wua-go' href='#'>Show me what to test</a><div class='wua-pop-over'></div></div>");
    $("head").prepend("<link href='"+window.whereuat_stylesheet_url+"' media='screen' rel='stylesheet' type='text/css'>");

    popOver = $("#uat-bar .wua-pop-over");
    tab     = $("#uat-bar a.wua-go");

    tab.toggle(
      function() {
        if (popOver.find("ol").length > 0) {
          slideOut();
        } else {
          $.ajax({
            url: '/whereuat',
            success: function(response) {
              popOver.append(response); 
              stories = popOver.find("ol");
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
      popOver.animate({width: '400px'}, 500, function() {
        stories.fadeIn(100);
      });
      tab.animate({left: '400px'}, 510);
    }

    function slideIn() {
      stories.fadeOut(100, function() {
        tab.animate({left: '0px'}, 490);
        popOver.animate({width: '0px'}, 510);
      });
    }

    $("#uat-bar a.wua-accept").live("click", function() {
      var acceptLink, storyName, storyId, spinner, listItem;

      acceptLink = $(this);

      storyId    = acceptLink.siblings(".wua-story-id").html();
      storyName  = acceptLink.siblings("span.wua-story");
      spinner    = acceptLink.siblings(".wua-spinner");
      listItem   = acceptLink.parent();

      spinner.fadeIn();

      $.ajax({
        method: "POST",
        url: '/whereuat/' + storyId + '/accept',
        success: function(response) {
          listItem.removeClass("wua-rejected").addClass("wua-accepted");
          spinner.fadeOut();
        }
      });

      return false;
    });

    $("#uat-bar a.wua-reject").live("click", 
      function() {
        var rejectLink, reasonForm;

        rejectLink = $(this);

        reasonForm = rejectLink.siblings("form");

        if (reasonForm.is(':visible')) {
          reasonForm.slideUp();
        } else {
          reasonForm.slideDown();
        }

        return false;
      }
    );

    $("#uat-bar button.wua-reject").live("click", function() {
      var button, reasonForm, storyName, storyId, spinner, listItem;

      button     = $(this);

      reasonForm = button.parent();
      storyId    = reasonForm.siblings(".wua-story-id").html();
      storyName  = reasonForm.siblings("span.wua-story");
      spinner    = reasonForm.siblings(".wua-spinner");
      listItem   = reasonForm.parent();

      spinner.fadeIn();

      $.ajax({
        method: "POST",
        url: '/whereuat/' + storyId + '/reject',
        data: {reason: $(".wua-reason").val()},
        success: function(response) {
          listItem.removeClass("wua-accepted").addClass("wua-rejected");
          reasonForm.slideUp();
          spinner.fadeOut();
        }
      });

      return false;
    });

  });
})(jQuery);
