/**
 * Created by lei on 17-3-24.
 */

var topicIdToDelete = null;

function openDeleteConfirmDialog(id) {
  $('#myModal').modal("show");
  topicIdToDelete = id;
}

function deleteTopic() {
  if (!topicIdToDelete) return;
  
  $.post("/topic/delete", {topicId: topicIdToDelete}, function (data, status) {
    var selector = "a[href='/topic/show/?_id=" + topicIdToDelete + "']";
    $(selector).parent().remove();
    topicIdToDelete = null;
  });
}