var socket= io();
socket.on('addTweet', function(newTweet) {
  var elemTweet= $('<li class="collection-item avatar">');
  elemTweet.append('<img src="'+newTweet.user.profile_image_url_https+'" class="circle" />');
  elemTweet.append('<span class="title"><strong>'+newTweet.user.name+' &#8226; @'+newTweet.user.screen_name+'</strong></span>');
  elemTweet.append('<p>'+newTweet.text+'</p>');

  if(newTweet.text.search("#{tracks.first}")!= -1)
    $('#tweets_feed1').append(elemTweet);
  else {
    if(newTweet.text.search("#{tracks.second}")!= -1)
      $('#tweets_feed2').append(elemTweet);
  }
});
