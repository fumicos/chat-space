$(function () {
  $('form').on('submit', function () {
    var form = document.querySelector('form')
    var formData = new FormData(form)
    var groupId = $('.form__submit').data('group-id')
    $.ajax({
      type: 'POST',
      url: '/groups/' + groupId + '/messages',
      data: formData,
      dataType: 'json'
    })
  })
})
