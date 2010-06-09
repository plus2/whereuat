(function($) {
  $(function() {
    var popOver;

    popOver = $("#uat-bar .pop-over");

    $("body").prepend("<div id='uat-bar'><a class='go' href='#'>Show me what to test</a><div class='pop-over hide'></div></div>");
    $("head").prepend("<link href='http://github.com/plus2/uat_director/raw/master/lib/uat_director/stylesheets/uat_director.css' media='screen' rel='stylesheet' type='text/css'>");

    $("#uat-bar a.go").click(function() {
      $.ajax({
        url: '/uat_director',
        success: function(response) {
          popOver.append(response); 
          popOver.slideDown();
        }
      });
    });

    $("#uat-bar a.close").click(function() {
      popOver.slideUp(function() {
        $(".pop-over ol").remove();
      });
    });

  });
})(jQuery);
