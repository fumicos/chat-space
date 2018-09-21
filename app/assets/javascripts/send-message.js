$(function () {
  function buildHTML(message) {
    var html = `<li class="message">
      <div class="message__header">
        <p class="message__member">
          ${message.user_name}
          <span class="message__date">${message.date}</span>
        </p>
      </div>
      <p class="message__text">${message.text}</p>
    </li>`
    return html
  }

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
    .done(function(data) {
      var html = buildHTML(data)
      $(".messages ul").append(html)
      $(".form__input").val('')
      console.log(data)
    })
  })
})
