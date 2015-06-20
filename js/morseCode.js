var codes = { " ": " ",
  "A": ".-", "B": "-...", "C": "-.-.", "D": "-..", "E": ".", "F": "..-.",
  "G": "--.", "H": "....", "I": "..", "J": ".---", "K": "-.-", "L": ".-..",
  "M": "--", "N": "-.", "O": "---", "P": ".--.", "Q": "--.-", "R": ".-.",
  "S": "...", "T": "-", "U": "..-", "V": "...-", "W": ".--", "X": "-..-",
  "Y": "-.--", "Z": "--..", "0": "-----", "1": ".----", "2": "..---", "3": "...--",
  "4": "....-", "5": ".....", "6": "-....", "7": "--...", "8": "---..", "9": "----.",
  ".": ".-.-.-", ":": "---...", ",": "--..--", ";": "-.-.-.", "?": "..--..", "=": "-...-",
  "'": ".----.", "/": "-..-.", "!": "-.-.--", "-": "-....-", "_": "..--.-", "\"": ".-..-.",
  "(": "-.--.", ")": "-.--.-", "$": "...-..-", "&": ".-..." };

window.addEventListener('WebComponentsReady', function () {
  var setBtn = document.getElementById('connect');
  var device = document.getElementById('device');
  var board = document.getElementById('board');
  device.setAttribute('value', localStorage.device || "");

  setBtn.addEventListener('click', function (e) {
    board.device = device.value;
    board.on('ready', ready);
    board.init();

    localStorage.device = device.value;

    e.stopPropagation();
    e.preventDefault();
    return false;
  }, false);
});

function ready() {
  $( "#send" ).removeProp( "disabled" );
  $( "#send" ).on( 'click', function send() {
    var message = "";
    var text = $("#message").val().toUpperCase();
    for ( var index in text ) {
      var messageChar = text.charAt( index );
      var code = codes[ messageChar ];
      message += code;
    }
    $("#morseCode").val( message );
    sendChar( message, 0 );
  });
}

function sendChar( text, textIndex ) {
  if ( text.length <= textIndex ) {
    return;
  }
  
  var textChar = text.charAt( textIndex );
  if ( textChar.indexOf( "." ) != -1 ) {
    console.log( textChar );
    $("#dit").addClass("btn-danger");
    $("#dit").removeClass("btn-default");
    $("#dah").addClass("btn-default");
    $("#dah").removeClass("btn-danger");
    sendCode( text, textIndex + 1, 500, 250 );
  }
  else if ( textChar.indexOf( "-" ) != -1 ) {
    console.log( textChar );
    $("#dit").addClass("btn-default");
    $("#dit").removeClass("btn-danger");
    $("#dah").addClass("btn-danger");
    $("#dah").removeClass("btn-default");
    sendCode( text, textIndex + 1, 250, 250 );
  }
  else {
    console.log( textChar );
    sendCode( text, textIndex + 1, 0, 500 );
  }
}

function sendCode( text, textIndex, delayOn, delayOff ) {
  ledOn( text, textIndex, delayOn, delayOff );
}

var led = document.getElementById('led');
function ledOn( text, textIndex, delayOn, delayOff ) {
  if ( delayOn > 0 ) {
    console.log( "led on " + delayOn + "ms" );
    led.on();
  }
  
  setTimeout( function() { ledOff( text, textIndex, delayOff ) }, delayOn );
}

function ledOff( text, textIndex, delayOff ) {
  console.log( "led off " + delayOff + "ms" );
  $("#dit").addClass("btn-default");
  $("#dit").removeClass("btn-danger");
  $("#dah").addClass("btn-default");
  $("#dah").removeClass("btn-danger");
  led.off();
  
  setTimeout( function() { sendChar( text, textIndex ) }, delayOff );
}