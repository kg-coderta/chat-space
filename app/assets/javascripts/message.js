
$(function(){
  function buildMessage(message){
    var image = message.image == null ? "" : `<img src="${message.image}" class="lower-message__image">`
    var html = `<div class="message" data-id="${message.id}" >
                  <div class="upper-message">
                    <div class="upper-message__user-name">
                      ${message.user_name}
                    </div>
                    <div class="upper-message__date">
                      ${message.created_at}
                    </div>
                  </div>
                  <div class="lower-message">
                    <p class="lower-message__content">
                      ${message.content}
                    </p>
                    ${image}
                  </div>
                </div>`             
    return html;
  }

  $('#new_message').on('submit', function(e){
    e.preventDefault();
    var formData = new FormData(this)
    var url = $(this).attr("action")
    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: "json",
      processData: false,
      contentType: false
    })

    .done(function(message){
      var html = buildMessage(message)
      $(".messages"). append(html)
      $("#new_message")[0].reset();
      scroll();
      $(".form__submit").attr("disabled",false);
    })
    .fail(function(message){
    alert("メッセージを入力してください")
    })
  })
  
  function scroll(){
    var target = $('.message').last();
    var position = target.offset().top + $('.messages').scrollTop() ;
    $('.messages').animate({
      scrollTop: position 
    }, 150, 'swing');
  }

  var reloadMessages = function() {
    if (window.location.href.match(/\/groups\/\d+\/messages/)){  
      last_message_id = $(".message:last").data("id");
      $.ajax({
        url: 'api/messages',
        type: 'get',
        dataType: 'json',
        data: {id: last_message_id}
      })
      .done(function(messages) {
        var insertHTML = " ";
        // if (messages.length !== 0)
        messages.forEach(function(message){
        if (last_message_id < message.id || last_message_id == null){ 
          insertHTML = buildMessage(message)
          $('.messages').append(insertHTML)
          scroll();
        }
        })
        
      })
      .fail(function() {
        alert('error');
      });
    }
  }
  setInterval(reloadMessages, 2500);
});