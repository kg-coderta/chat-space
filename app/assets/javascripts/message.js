
$(function(){
  function buildMessage(message){
    var image = message.image == null ? "" : `<img src="${message.image}" class="lower-message__image">`
    var html = `<div class="message" data-id="${message.id}" >
                  <div class="upper-message">
                    <div class="upper-message__user-name">
                      ${message.user_name}
                    </div>
                    <div class="upper-message__date">
                      ${message.date}
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
        messages.forEach(function(message){
        insertHTML = buildMessage(message)
        $('.messages').append(insertHTML)
        })
        $('.messages').animate({scrollTop: $('.messages')[0].scrollHeight}, 'fast');
      })
      .fail(function() {
        alert('error');
      });
    }
  }
  setInterval(reloadMessages, 2500);
});