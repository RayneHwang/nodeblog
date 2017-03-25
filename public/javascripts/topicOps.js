/**
 * Created by lei on 17-3-24.
 */

var topicIdToDelete = null;


// Open delete confirm dialog and set topicId into global var
function openDeleteConfirmDialog(id) {
  var modalDialog = $('#myModal');
  modalDialog.find(".modal-body").html("确认删除主题吗？");
  $('#myModal').find('#btn2').css("display", "inline");
  $('#myModal').find('#btn2').html("确认");
  modalDialog.modal("show");
  topicIdToDelete = id;
}


function deleteTopic() {
  if (!topicIdToDelete) return;
  $.ajaxSetup({async:true});
  $.post("/topic/delete", {topicId: topicIdToDelete}, function (data, status) {
    var selector = "a[href='/topic/show/?_id=" + topicIdToDelete + "']";
    //remove topic from topic list
    $(selector).parent().remove();
    //reset global var
    topicIdToDelete = null;
    $('#myModal').find('.modal-body').html("删除成功！");
    $('#myModal').find('#btn2').css("display", "none");
    $('#myModal').modal('show');
  });
  
  setTimeout(function () {
    if (topicIdToDelete != null) {
      $('#myModal').find('.modal-body').html("删除失败！");
      $('#myModal').find('#btn2').html("重试");
      $('#myModal').modal('show');
    }
  }, 2000)
}