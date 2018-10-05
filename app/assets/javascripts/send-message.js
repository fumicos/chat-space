$(function () {
  // ページがひらいたら、最新のメッセージを表示する。
  scrollLatestMessage()

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
    var html = `<li class="message" data-message-id="${message.id}">
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
    scrollLatestMessage()
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
      if($('.message').length > 0) {
        var lastId = $('.message').last().data().messageId
        $.ajax({
          url: currentPage,
          dataType: 'json',
          data: { id: lastId }
        })
        .done(function(res) {
          res.messages.forEach(function (message, index) {
            var html = buildHTML(message)
            appendMessage(html)
          })
        })
        .fail(function(err) {
        })
      } else {
        return
      }
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
    })
    .fail(function(err) {
      alert('投稿に失敗しました。' + err)
    })
  })

  // 自動更新
  var autoUpdateMessage = setInterval(getMessage, 5000)
})
