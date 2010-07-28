(function($) {
  $(function() {
    var popOver, tab;

    $("body").prepend("<div id='uat-bar'><a class='wua-go' href='#'>Show me what to test</a><div class='wua-pop-over wua-hide'></div></div>");
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
