/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
$(function() {

  function  createtweetElement (tweet) {
    let $newTweet = $("<article>").addClass("entire-tweet");
    let $header = $(`
      <header>
        <img src="${tweet.user.avatars ? tweet.user.avatars.small : ""}">
        <h1>${tweet.user.name}</h1>
        <p>${tweet.user.handle}</p>
      </header>
    `);

    $newTweet.append($header);

    let $content = $(`<div></div>`).text(tweet.content.text).addClass("content");
    $newTweet.append($content);
    let $time = new Date(tweet.created_at);
    let $footer = $(`
      <footer>
        <div class="time-stamp"><a href="#">${$time.toLocaleString()}</a></div>
        <div class="tweet-actions">
          <i class="fa fa-flag" aria-hidden="true"></i>
          <i class="fa fa-retweet" aria-hidden="true"></i>
          <i class="fa fa-heart" aria-hidden="true"></i>
        </div>
      </footer>
    `);
    $newTweet.append($footer);
    return $newTweet;
  }
  function renderTweets (tweetsArray) {
    $(".posted-tweets").empty()
    tweetsArray.forEach((tweet) => {
      let $tweetToAppend = createtweetElement(tweet);

      $(".posted-tweets").prepend($tweetToAppend);
    });
  }


  $(".new-tweet form").on('submit', function(event) {
    event.preventDefault();
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
          console.log("there was some error:"+err);
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
        console.log("there was some error:"+err);
      }
    });
  }
  loadTweets();

  $(".new-tweet").hide();
  $("#nav-bar .compose").on("click", function (event){
    event.preventDefault();
    $(".new-tweet").slideToggle();
    $(".new-tweet textarea").select();
  });

});
