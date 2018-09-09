$(function () {
  $('#new_message').on('submit', function (e) {
    e.preventDefault()
    var formData = new FormData(this)
    var groupId = $('.form__submit').data('group-id')
    // var postUrl = '/groups/' + groupId + '/messages'
    var postUrl = $(this).attr('action')
    $.ajax({
      type: 'POST',
      url: postUrl,
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
  })
})
