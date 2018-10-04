$(function () {
  function buildHTML(user) {
    var html
    if (user) {
      html = `
      <div class="chat-group-user clearfix">
        <p class="chat-group-user__name">${user.name}</p>
        <a class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id="${user.id}" data-user-name="${user.name}">追加</a>
      </div>
      `
    } else {
      html = `
        <div class="chat-group-user clearfix">
          <p>該当するユーザはいません。</p>
        </div>
      `
    }
    return html
  }

  function buildAppendedHtml(user) {
    var html = `
    <div class='chat-group-user clearfix js-chat-member' id='chat-group-user-8'>
      <input name='group[user_ids][]' type='hidden' value='${user.id}'>
      <p class='chat-group-user__name'>${user.name}</p>
      <a class='user-search-remove chat-group-user__btn chat-group-user__btn--remove js-remove-btn'>削除</a>
    </div>
    `
    return html
  }

  $('#user-search-field').on('keyup', function() {
    $("#user-search-result").empty()
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
        $("#user-search-result").append(html)
      })
    })
    .fail(function(err) {
      alert(`ユーザ検索に失敗しました`)
    })
  })

  $('#user-search-result').on('click', '.user-search-add', function (e) {
    var appendUser = {
      id: $(this).data().userId,
      name: $(this).data().userName
    }
    var html = buildAppendedHtml(appendUser)
    $('#chat-group-users').append(html)
    $(this).parent().remove()
  })

  $('#chat-group-users').on('click', '.user-search-remove', function(e){
    $(this).parent().remove()
  })
})
