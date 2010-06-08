$("body").prepend("#{toolbar_html}");
$("head").append("<link href='http://github.com/plus2/uat_director/raw/master/lib/uat_director/stylesheets/uat_director.css' media='screen' rel='stylesheet' type='text/css'>");
$(function() {
  $("#uat-bar a.go").click(function() {
    $.ajax({
      url: '/uat_director',
      success: function(response) {
        $(".pop-over").append(response); 
        $(".pop-over").slideDown();
      }
    });
  });

  $("#uat-bar a.close").click(function() {
    $(".pop-over").slideUp(function() {
      $(".pop-over ol").remove();
    });
  });
});
