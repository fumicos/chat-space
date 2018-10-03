$(function () {
  function buildHTML(message) {
    var text = (
      (message.text)
        ? `<p class="message__text">${message.text}</p>`
        : ''
    )
    var image = (
      (message.image)
        ? `<img class="message__image" src="${message.image}">`
        : ''
    )
    var html = `<li class="message">
      <div class="message__header">
        <p class="message__member">
          ${message.user_name}
          <span class="message__date">${message.date}</span>
        </p>
      </div>
      ${text}
      ${image}
    </li>`
    return html
  }

  $('#new_message').on('submit', function (e) {
    e.preventDefault()
    var formData = new FormData(this)
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
      $(".messages > ul").append(html)
      $(".form__input").val('')
      $('.messages').animate({
        scrollTop: $('.messages').get(0).scrollHeight
      }, 'fast');
    })
    .fail(function(err) {
      alert('投稿に失敗しました。' + err)
    })
  })
})
