$(function() {

  $(".new-tweet form").on('submit', function(event) {
    event.preventDefault();
      $(".error").remove();
    let $textData = $(".new-tweet textarea").val();
    if ($textData.length > 140) {
      $(".new-tweet form").after("<p class='error'>tweet is too long</p>");
      $(".error").fadeIn().fadeOut(4000);
      return;
    }
    if ($textData === '' || $textData === null) {
      $(".new-tweet form").after("<p class='error'>Please type a text to tweet</p>");
      $(".error").fadeIn().fadeOut(4000);
      return;
    }
    else {
      $.ajax({
        url: '/tweets',
        method: 'POST',
        data: $(".new-tweet form").serialize(),
        success: function (typedText) {
          loadTweets(typedText);
        },
        error: function(err){
          console.error("there was some error: ", err);
        }
      });
      $(".new-tweet textarea").val('');
      return;
    }
  });

  function  loadTweets () {
    $.ajax({
      url: '/tweets',
      method: 'GET',
      dataType: 'json',
      success: function (stuff) {
        renderTweets(stuff)
      },
      error: function(err){
        console.error("there was some error: ", err);
      }
    });
  }
  loadTweets();

  function renderTweets (tweetsArray) {
    $(".posted-tweets")
    .empty()
    .append(tweetsArray.map(createtweetElement).reverse());
  }

  function createtweetElement (tweet) {
    return $(safeTemplate`
      <article class="entire-tweet">
        <header>
          <img src="${(tweet.user.avatars || {}).small}">
          <h1>${tweet.user.name}</h1>
          <p>${tweet.user.handle}</p>
        </header>
        <div class="content">
          ${tweet.content.text}
        </div>
        <footer>
         <div class="time-stamp"><a href="#">${moment(tweet.created_at).fromNow()}</a></div>
         <div class="tweet-actions">
           <i class="fa fa-flag" aria-hidden="true"></i>
           <i class="fa fa-retweet" aria-hidden="true"></i>
           <i class="fa fa-heart" aria-hidden="true"></i>
         </div>
       </footer>
      </article>
    `);
  }

  function safeTemplate(strings, ...replacements) {
    const result = strings.map((s, i) => {
      return s + safeText(replacements[i] || "")
    });
    return result.join('');
  }
  function safeText(text) {
    const div = document.createElement("div");
    const textNode = document.createTextNode(text);
    div.appendChild(textNode);
    return div.innerHTML;
  }

  $(".new-tweet").hide();
  $("#nav-bar .compose").on("click", function (event){
    event.preventDefault();
    $(".new-tweet").slideToggle();
    $(".new-tweet textarea").select();
  });

});
