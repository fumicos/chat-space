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

  function appendMessage(html) {
    $(".messages > ul").append(html)
  }

  function scrollLatestMessage () {
    $('.messages').animate({
      scrollTop: $('.messages').get(0).scrollHeight
    }, 'fast');
  }

  function getMessage() {
    var currentPage = location.pathname
    var isMessagesPage = currentPage.match(/\/groups\/\d+\/messages/)
    if (isMessagesPage) {
      $.ajax({
        url: currentPage,
        dataType: 'json'
      })
      .done(function(res) {
      })
      .fail(function(err) {
      })
    } else {
      clearInterval(autoUpdateMessage)
    }
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
      appendMessage(html)
      $(".form__input").val('')
      $(".form__submit").attr("disabled", false)
      scrollLatestMessage()
    })
    .fail(function(err) {
      alert('投稿に失敗しました。' + err)
    })
  })

  // 自動更新
  var autoUpdateMessage = setInterval(getMessage, 5000)
})
