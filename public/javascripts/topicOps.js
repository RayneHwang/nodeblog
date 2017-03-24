/**
 * Created by lei on 17-3-24.
 */


var deleteTopic = (function ($) {
  return function deleteTopic(id) {
    $('#myModal').modal("show");
    // $.post("/topic/delete", {topicId: id}, function (data, status) {
    //   var selector="a[href='/topic/show/?_id=" + id + "']";
    //   $(selector).parent().remove();
    // });
  }
})($);