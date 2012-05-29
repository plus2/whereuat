(function($) {
  $(function() {
    var bar, popOver, tab, stories, spinner;

    $("body").prepend("<div id='uat-bar'><a class='wua-go' href='#'>Show me what to test</a><div class='wua-pop-over'></div></div>");

    spinner   = $('<img src="data:image/gif;base64,R0lGODlhEAAQAPQAACEhIf///yYmJs3NzYuLi/j4+Nzc3ENDQ2tra+rq6peXl6WlpTc3N3l5eVFRUb+/v7OzswAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAAFUCAgjmRpnqUwFGwhKoRgqq2YFMaRGjWA8AbZiIBbjQQ8AmmFUJEQhQGJhaKOrCksgEla+KIkYvC6SJKQOISoNSYdeIk1ayA8ExTyeR3F749CACH5BAkKAAAALAAAAAAQABAAAAVoICCKR9KMaCoaxeCoqEAkRX3AwMHWxQIIjJSAZWgUEgzBwCBAEQpMwIDwY1FHgwJCtOW2UDWYIDyqNVVkUbYr6CK+o2eUMKgWrqKhj0FrEM8jQQALPFA3MAc8CQSAMA5ZBjgqDQmHIyEAIfkECQoAAAAsAAAAABAAEAAABWAgII4j85Ao2hRIKgrEUBQJLaSHMe8zgQo6Q8sxS7RIhILhBkgumCTZsXkACBC+0cwF2GoLLoFXREDcDlkAojBICRaFLDCOQtQKjmsQSubtDFU/NXcDBHwkaw1cKQ8MiyEAIfkECQoAAAAsAAAAABAAEAAABVIgII5kaZ6AIJQCMRTFQKiDQx4GrBfGa4uCnAEhQuRgPwCBtwK+kCNFgjh6QlFYgGO7baJ2CxIioSDpwqNggWCGDVVGphly3BkOpXDrKfNm/4AhACH5BAkKAAAALAAAAAAQABAAAAVgICCOZGmeqEAMRTEQwskYbV0Yx7kYSIzQhtgoBxCKBDQCIOcoLBimRiFhSABYU5gIgW01pLUBYkRItAYAqrlhYiwKjiWAcDMWY8QjsCf4DewiBzQ2N1AmKlgvgCiMjSQhACH5BAkKAAAALAAAAAAQABAAAAVfICCOZGmeqEgUxUAIpkA0AMKyxkEiSZEIsJqhYAg+boUFSTAkiBiNHks3sg1ILAfBiS10gyqCg0UaFBCkwy3RYKiIYMAC+RAxiQgYsJdAjw5DN2gILzEEZgVcKYuMJiEAOwAAAAAAAAAAAA==">');

    bar       = $('#uat-bar');
    popOver   = $(".wua-pop-over"  ,bar);
    tab       = $("a.wua-go"       ,bar);

    tab.toggle(
      function() {
        if (popOver.find("ol").length > 0) {
          slideOut();
        } else {
          var goSpinner = spinner.clone()
                          .addClass('wua-go-spinner')
                          .insertAfter(tab)
                          .fadeIn();
          
          $.ajax({
            url: '/whereuat',
            success: function(response) {
              goSpinner.fadeOut(function() {goSpinner.remove()});
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

    
    $("a.wua-accept", bar).live("click", function() {
      var acceptLink, storyName, storyId, storySpinner, listItem;

      acceptLink = $(this);

      storyId    = acceptLink.siblings(".wua-story-id").html();
      storyName  = acceptLink.siblings("span.wua-story");
      listItem   = acceptLink.parent();

      storySpinner = spinner.clone().insertBefore(storyName).fadeIn();

      $.ajax({
        method: "POST",
        url: '/whereuat/' + storyId + '/accept',
        success: function(response) {
          listItem.removeClass("wua-rejected").addClass("wua-accepted");
          storySpinner.fadeOut(function() {storySpinner.remove()});
        }
      });

      return false;
    });

    $("a.wua-reject", bar).live("click", 
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

    $("button.wua-reject", bar).live("click", function() {
      var button, reasonForm, storyName, storyId, spinner, listItem, reasonText;

      button     = $(this);

      reasonForm = button.parent();
      storyId    = reasonForm.siblings(".wua-story-id").html();
      storyName  = reasonForm.siblings("span.wua-story");
      spinner    = reasonForm.siblings(".wua-spinner");
      listItem   = reasonForm.parent();

      reasonText = button.siblings(".wua-reason").val();

      spinner.fadeIn();

      $.ajax({
        method: "POST",
        url: '/whereuat/' + storyId + '/reject',
        data: {reason: reasonText},
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
