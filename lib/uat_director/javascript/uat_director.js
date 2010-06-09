(function($) {
  $(function() {
    var popOver;

    $("body").prepend("<div id='uat-bar'><a class='go' href='#'>Show me what to test</a><div class='pop-over hide'></div></div>");
    $("head").prepend("<link href='http://github.com/plus2/uat_director/raw/master/lib/uat_director/stylesheets/uat_director.css' media='screen' rel='stylesheet' type='text/css'>");

    popOver = $("#uat-bar .pop-over");

    $("#uat-bar a.go").toggle(function() {
      $.ajax({
        url: '/uat_director',
        success: function(response) {
          popOver.append(response); 
          popOver.slideDown();
        }
      });
    }, function() {
      popOver.slideUp(function() {
        $(".pop-over ol").remove();
      });
    });

 });
})(jQuery);
