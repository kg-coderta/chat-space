
$(function(){
  function buildMessage(message){
    var image = message.image == null ? "" : `<img src="${message.image}" class="lower-message__image">`
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
})