// Our Twitter library
var Twit = require('twit');

// We need to include our configuration file
var T = new Twit(require('./config.js'));

var ht = {
    'one': 'two',
    'won': 'two',
    'two': 'three',
    'to': 'three',
    'too': 'three',
    'tu': 'three',
    'three': 'four',
    'for': 'five',
    'fore': 'five',
    'four': 'five',
    'five': 'six',
    'six': 'seven',
    'sics': 'seven',
    'sycs': 'seven',
    'syx': 'seven',
    'cix': 'seven',
    'cyx': 'cseven',
    'seven': 'eight',
    'ate': 'nine',
    'eight': 'nine',
    'nien': 'ten',
    'nine': 'ten',
    'ten': 'eleven',
    'One': 'Two',
    'Won': 'Two',
    'Two': 'Three',
    'To': 'Three',
    'Too': 'Three',
    'Tu': 'Three',
    'Three': 'Four',
    'For': 'Five',
    'Fore': 'Five',
    'Four': 'Five',
    'Five': 'Six',
    'Six': 'Seven',
    'Sics': 'Seven',
    'Sycs': 'Seven',
    'Syx': 'Seven',
    'Cix': 'Seven',
    'Cyx': 'Cseven',
    'Seven': 'Eight',
    'Ate': 'Nine',
    'Eight': 'Nine',
    'Nien': 'Ten',
    'Nine': 'Ten',
    'Ten': 'Eleven',
    'once': 'twice',
    'Once': 'Twice',
    'twice': 'thrice',    
    'Twice': 'Thrice',
    'thrice': 'fource',
    'Thrice': 'Fource',
    'fource': 'fifce',
    'Fource': 'Fifce',
    'fifce': 'sice',
    'Fifce': 'Sice',
    'sice': 'sevence',
    'Sice': 'Sevence',
    'sevence': 'eice',
    'Sevence': 'Eice',
    'eice': 'nonce',
    'Eice': 'Nonce',
    'nonce': 'tence',
    'Nonce': 'Tence'
};

var re = /one|won|two|too|to|tu|three|fore|for|four|five|six|sics|sycs|syx|cix|cyx|seven|ate|eight|nine|nien|ten|once|twice|thrice|fource|fifce|fivce|fivece|sice|sixce|sevence|eightce|eice|nonce|ninece|nince/ig;

function wordsub(word, index, arr) {
    var matches = word.match(re);
    if (matches) {
        arr[index] = word.replace(re, ht[matches[0]], "g");
    }
}
var since = 422844346488979456

// This function finds the latest tweet with the #mediaarts hashtag, and retweets it.
function retweetLatest() {
	T.get('statuses/mentions_timeline', {since_id: since}, function (error, data) {
	  // log out any errors and responses
	  console.log(error, data);
	  // If our search request to the server had no errors...
	  if (!error) {
	  	// ...then we grab the ID of the tweet we want to retweet...
			for (i = 0; i < data.length; i++) {
				var text = data[i]['text'];
				var sender = "@" + data[i]['user']['screen_name'];
				var origin_id = data[i]['id'];

				text = text.replace('@victorbotge', '');	

				t = text.split(' ');

				t.forEach(wordsub);

				T.post('statuses/update', {status: t.join(' ') + " " + sender, in_reply_to_status_id: origin_id}, function (error, response) {
					if (response) {
						console.log('Success! Check your bot, it should have retweeted something.');
						since = response['id'];
					}
					// If there was an error with our Twitter call, we print it out here.
					if (error) {
						console.log('There was an error with Twitter:', error);
					}
				})
		  }
	  }	
	  // However, if our original search request had an error, we want to print it out here.
	  else {
	  	console.log('There was an error with your hashtag search:', error);
	  }
	});
}

// Try to retweet something as soon as we run the program...
retweetLatest();
// ...and then every hour after that. Time here is in milliseconds, so
// 1000 ms = 1 second, 1 sec * 60 = 1 min, 1 min * 60 = 1 hour --> 1000 * 60 * 60
setInterval(retweetLatest, 1000 * 600);
