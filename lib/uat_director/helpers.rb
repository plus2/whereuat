module UatDirector
  module Helpers
    def uat_director
<<TDSCRIPT
<script type="text/javascript">
  $("body").prepend("#{toolbar_html}");
  $("#uat-bar").css({width: "100%", background: "#000", "text-align": "right"});
  $("#uat-bar a.go").css({color: "#fff"});
  $("#uat-bar .pop-over").css({position: "absolute", right: "0px", clear: "none", "z-index": "99999999", background: "#fff", "text-align": "left"});
  $("#uat-bar .hide").css({display: "none"});
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
</script>
TDSCRIPT
    end

    def toolbar_html
      "<div id='uat-bar'><a class='go' href='#'>Show me what to test</a><div class='pop-over hide'><a class='close' href='#'>close</a></div></div>"
    end
  end
end

