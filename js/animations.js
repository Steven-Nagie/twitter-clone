$(document).ready(function() {

  // This attaches jQuery timeago to our timestamps
  jQuery("time.timeago").timeago();

  // This will double the height of the tweet input box and change the tweet-controls display from none to block.
  // Note that this only works to doulbe the tweet-compose because I happen to know exactly what it is and I can manage to double it here. If I wanted to double an unknown value, I would have to get the text inside using .text() or .html(), parse that into a number, double that number, and then push it back into a string.
  $('.tweet-compose').on('click', function() {
    $(this).css("height", "5em");
    $("#tweet-controls").css("display", "block");
  });


  // A basic decrementer pattern that will decrease the number for every keypress.
  // For some reason, I need the replace function within the other function, even though as far as I can tell they should do the same thing and I should therefore need only one of them.
  // For further explanation check out http://stackoverflow.com/questions/11324559/jquery-if-div-contains-this-text-replace-that-part-of-the-text and the documentation, which you'll have to find.
  var initCount = 141;
  var charCount = 140;
  $('.tweet-compose').on('keypress', function(e) {
    $('#char-count').text(function() {
        charCount--;
        initCount--;
      return $(this).text().replace(initCount, charCount);
    });
  });
  $('.tweet-compose').keyup(function(e) {
    if (e.keyCode === 8 && charCount < 141) {
      $('#char-count').text(function() {
        charCount++;
        initCount++;
        return $('#char-count').text().replace(charCount-1, charCount);
      });
    }
  });

  // This disables the button by simply adding css "disabled"
  if (charCount < 0) {
    $('#tweet-submit').css('disabled');
  }

  // Creates new div with all the info for new tweet, then inserts that into top of div. Includes the correct date and time!

  $('#tweet-submit').click(function() {
    var newTweet = $('.tweet-compose').val();

    time = new Date();

    // Check the DOM to see how the timeago feature is working (or whether it is at all).

    var tweetFormat = '<div class="tweet">' +
        '<div class="content">' + '<img class="avatar" src="img/alagoon.jpg">' + '<strong class="fullname">Big Cheese </strong>' +
          '<span class="username">@bigCheese</span>' +
          '<p class="tweet-text">' + newTweet + '</p> <div class="tweet-actions">' + '<ul>' +
              '<li><span class="icon action-reply"></span> Reply</li>' +
              '<li><span class="icon action-retweet"></span> Retweet</li>' +
              '<li><span class="icon action-favorite"></span> Favorite</li>' +
              '<li><span class="icon action-more"></span> More</li>' +
            '</ul>' +
          '</div>' +
          '<div class="stats">' +
            '<div class="retweets">' +
              '<p class="num-retweets">30</p>' +
              '<p>RETWEETS</p>' +
            '</div>' +
            '<div class="favorites">' +
              '<p class="num-favorites">6</p>' +
              '<p>FAVORITES</p>' +
            '</div>' +
            '<div class="users-interact">' +
              '<div>' +
                '<img src="img/vklimenko.jpg" />' +
                '<img src="img/funwatercat.jpg" />' +
              '</div>' +
            '</div>' +
            '<div class="time">' +
            '<time class="timeago" datetime=' + time.toString() + '>' + time.toString() + '</time>' +
            '</div>' +
          '</div>';

      $('#stream').prepend(tweetFormat);

  });

  // This will reveal all the possible actions for a tweet when you hover over a tweet

  $(document).on('mouseenter', '.tweet',
    function() {
      $(this).find('.tweet-actions').show();
    });

  $(document).on('mouseleave', '.tweet',
    function() {
      $(this).find('.tweet-actions').hide();
  });

  // Here we make it so that the numbers of retweets etc. is shown when we click on a tweet. To hide it again we currently have to double click.
  $(document).on('click', '.tweet', function() {
    $(this).find('.stats').slideDown('slow');
  });
  $(document).on('dblclick', '.tweet', function() {
    $(this).find('.stats').slideUp('slow');
  });

});
