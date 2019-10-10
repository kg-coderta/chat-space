$(function(){
  function buildMessage(message){
    var html = `<div class="message">
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
                    <img class="lower-message__image" src="${message.image}">
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
      $('#message_content').val('');
      scroll();
      $(".form__submit").attr("disabled",false);
    })
    .fail(function(message){
    alert("メッセージを入力してください")
    })
  })
})