window.onload = function() {

  // Get references to elements on the page.
  var form = document.getElementById('message-form');
  var messageField = document.getElementById('message');
  var messagesList = document.getElementById('messages');
  var socketStatus = document.getElementById('status');
  var closeBtn = document.getElementById('close');

  // Create a new WebSocket.
  var socket = new WebSocket('wss://echo.websocket.org');

  // Show a connected message when the WebSocket is opened.
  socket.onopen = function(event) {
    socketStatus.innerHTML = 'Connected to: ' + event.currentTarget.url;
    socketStatus.className = 'open';
  };

  // Send a message when the form is submitted.
  form.onsubmit = function(e) {
    e.preventDefault();

    // Retrieve the message from the textarea.
    var message = messageField.value;

    // Send the message through the WebSocket.
    socket.send(message);

    // Add the message to the messages list.
    messagesList.innerHTML += '<li class="sent"><span>Sent:</span>' + message +
                              '</li>';

    // Clear out the message field.
    messageField.value = '';

    return false;
  };

  // Add the message to the messages list.
   messagesList.innerHTML += '<li class="sent"><span>Sent:</span>' + message + '</li>';

   // Clear out the message field.
   messageField.value = '';

   return false;
 };


};
