$(function() {

  function appendUser(user){
    var html = `<div class="chat-group-user clearfix">
                  <p class="chat-group-user__name">
                    ${user.name}
                  </p>
                  <a class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id=" ${user.id}" data-user-name="${user.name}">追加</a>
                </div>`   
    $("#user-search-result").append(html);     
  }

  function appendError(errorMessage){
    var html = `<div class="chat-group-user clearfix">
                  <p class="chat-group-user__name">
                    ${errorMessage}
                  </p>
                </div>` 
    $("#user-search-result").append(html);              
  }

  $(document).on("keyup","#user-search-field", function() {
    var input = $("#user-search-field").val();
    $.ajax({
      url: "/users",
      type: "GET",
      data: {search: input},
      dataType: "json"
    })
   
    .done(function(users){
      $("#user-search-result").empty();
      if(users.length !== 0){
        users.forEach(function(user){
          appendUser(user);
        });
      }
      else{
        appendError("一致するユーザーが見つかりません")
      }
    })
    .fail(function() {
      alert('ユーザー検索に失敗しました');
    })
  });
  
  function addUser(user){
  var id = $(user).attr("data-user-id")
  var name = $(user).attr("data-user-name")
  var html = `<div class='chat-group-user'>
                <input name='group[user_ids][]' type='hidden' value='${id}'>
                <p class='chat-group-user__name'>
                  ${name}
                </p>
              <div class='user-search-remove chat-group-user__btn chat-group-user__btn--remove js-remove-btn'>削除</div>
              </div>`
  $(".chat-group-users").append(html)
  }

  $(document).on("click", ".user-search-add", function(e){
    $(this).parent().remove();
    var user = e.target;
    addUser(user) 
  })

  $(document).on("click", ".user-search-remove", function(){
    $(this).parent().remove();
  })
});

