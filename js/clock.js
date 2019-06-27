setInterval(function() {
  var date  = new Date();
  var mins = date.getMinutes();

  var hoursDegree = date.getHours() * 30 + (mins / 2);
  var hrotate = "rotate(" + hoursDegree + "deg)";

  var minutesDegree = date.getMinutes() * 6;
  var mrotate = "rotate(" + minutesDegree + "deg)";

  var secondsDegree = date.getSeconds() * 6;
  var srotate = "rotate(" + secondsDegree + "deg)";

  document.getElementById('sec').style.transform = srotate;
  document.getElementById('min').style.transform = mrotate;
  document.getElementById('hour').style.transform = hrotate;
}, 1000 );


var degree = 0;
  for (var j = 0; j < 60; j++) {
    var faceLine = document.createElement('div');
    document.getElementById('lines').appendChild(faceLine);
    degree = degree + 6;
    faceLine.style.transform = 'rotate(' + degree + 'deg)';
  }
