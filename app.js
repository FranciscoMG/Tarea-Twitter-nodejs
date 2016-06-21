var app= require('express')();
var http= require('http').Server(app);
var io= require('socket.io')(http);
var twitter = require('twitter');
var tracks= {'first': process.argv[2], 'second': process.argv[3]};

app.set('view engine', 'pug');

app.get('/', function(req, resp) {
  resp.render('index', {tracks: tracks});
});

app.get('/style.css', function(req, resp) {
  resp.sendFile(__dirname + '/css/style.css');
});

app.get('/script.js', function(req, resp) {
  resp.sendFile(__dirname + '/js/script.js');
});

var client = new twitter({
  consumer_key: 'CuWL22KMBKVLGcbtrPuYULCZw',
  consumer_secret: 'pAYELEmeNj7YoH6jyCN9iNhQG4pnDQF2umkjNUthE6GJeIgtYy',
  access_token_key: '720739854615613440-LCusq7ae60EQ3eUiEamQnp1zuy5Lpe8',
  access_token_secret: '0GNE978VYLH7ZgFMXSObIosv7UrkXNnyJWanpxh6bxjX9'
});

io.on('connection', function (socket) {
  client.stream('statuses/filter', {track: tracks.first+","+tracks.second}, function(stream) {
    stream.on('data', function(tweet) {
      socket.emit('addTweet', tweet);
    });

    stream.on('error', function(error) {
    });
  });
});


http.listen(8081, function () {
  console.log('Ver detalles... http://localhost:8081');
});
