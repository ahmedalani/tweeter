/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
$(function(){

  const data = [
    {
      "user": {
        "name": "Newton",
        "avatars": {
          "small":   "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_50.png",
          "regular": "https://vanillicon.com/788e533873e80d2002fa14e1412b4188.png",
          "large":   "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_200.png"
        },
        "handle": "@SirIsaac"
      },
      "content": {
        "text": "If I have seen further it is by standing on the shoulders of giants"
      },
      "created_at": 1461116232227
    },
    {
      "user": {
        "name": "Descartes",
        "avatars": {
          "small":   "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc_50.png",
          "regular": "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc.png",
          "large":   "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc_200.png"
        },
        "handle": "@rd" },
      "content": {
        "text": "Je pense , donc je suis"
      },
      "created_at": 1461113959088
    },
    {
      "user": {
        "name": "Johann von Goethe",
        "avatars": {
          "small":   "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1_50.png",
          "regular": "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1.png",
          "large":   "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1_200.png"
        },
        "handle": "@johann49"
      },
      "content": {
        "text": "Es ist nichts schrecklicher als eine tätige Unwissenheit."
      },
      "created_at": 1461113796368
    }
  ];

  function  createtweetElement (tweet) {
    let $newTweet = $("<article>").addClass("entire-tweet");
    let $header = $(`
      <header>
        <img src="${tweet.user.avatars.small}">
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
    if ($textData === '') {
      $(".new-tweet form").after("<p class='error'>Please type a text to tweet</p>");
      $(".error").fadeIn().fadeOut(4000);
      return;
    }
    if ($textData === null) {
      $(".new-tweet form").after("<p class='error'>INVALID ENTRY</p>");
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

  $("#nav-bar .compose").on("click", function (event){
    event.preventDefault();
    $(".new-tweet").slideToggle();
    $(".new-tweet textarea").select();
  });
  // $(".new-tweet form").on('submit', function(event) {
  //   loadTweets();
  // });




});
