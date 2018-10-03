$(function () {
  function buildHTML(user) {
    if (!user) {
      var html = `
        <div class="chat-group-user clearfix">
          <p>該当するユーザはいません。</p>
        </div>
      `
    } else {
      var html = `
      <div class="chat-group-user clearfix">
        <p class="chat-group-user__name">${user.name}</p>
        <a class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id="${user.id}" data-user-name="${user.name}">追加</a>
      </div>
      `
    }
    return html
  }

  $('#user-search-field').on('keyup', function(e) {
    $("#chat-group-users").empty()
    var input = $(this).val()
    $.ajax({
      type: "GET",
      url: "/users",
      data: { keyword: input },
      dataType: "json"
    })
    .done(function(res) {
      res.forEach(user => {
        var html = buildHTML(user)
        $("#chat-group-users").append(html)
      })
    })
    .fail(function(err) {
      alert(`ユーザ検索に失敗しました`)
    })
  })
})
// $(function () {
//   function buildHTML(message) {
//     var text = (
//       (message.text)
//         ? `<p class="message__text">${message.text}</p>`
//         : ''
//     )
//     var image = (
//       (message.image)
//         ? `<img class="message__image" src="${message.image}">`
//         : ''
//     )
//     var html = `<li class="message">
//       <div class="message__header">
//         <p class="message__member">
//           ${message.user_name}
//           <span class="message__date">${message.date}</span>
//         </p>
//       </div>
//       ${text}
//       ${image}
//     </li>`
//     return html
//   }

//   $('#new_message').on('submit', function (e) {
//     e.preventDefault()
//     var formData = new FormData(this)
//     var postUrl = $(this).attr('action')
//     $.ajax({
//       type: 'POST',
//       url: postUrl,
//       data: formData,
//       dataType: 'json',
//       processData: false,
//       contentType: false
//     })
//     .done(function(data) {
//       var html = buildHTML(data)
//       $(".messages > ul").append(html)
//       $(".form__input").val('')
//       $(".form__submit").attr("disabled", false)
//       $('.messages').animate({
//         scrollTop: $('.messages').get(0).scrollHeight
//       }, 'fast');
//     })
//     .fail(function(err) {
//       alert('投稿に失敗しました。' + err)
//     })
//   })
// })
