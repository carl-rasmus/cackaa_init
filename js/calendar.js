/**
 * Print the summary and start datetime/date of the next ten events in
 * the authorized user's calendar. If no events are found an
 * appropriate message is printed.
 */
function listUpcomingEvents() {
  // var today = new Date().toISOString();

  //scoping relevant dates for query: from yesterday till tomorrow
  var yesterday = (new Date(new Date().setDate(new Date().getDate()-1))).toISOString();
  var tomorrow = (new Date(new Date().setDate(new Date().getDate()+1))).toISOString();
  //calculating current time in minutes
  var now = (new Date().getHours() * 60) + (new Date().getMinutes() * 1);

  gapi.client.calendar.events.list({
    'calendarId': 'primary',
    'timeMin': yesterday,
    'timeMax': tomorrow,
    'showDeleted': false,
    'singleEvents': true,
    // 'maxResults': 10,
    'orderBy': 'startTime'
  }).then(function(response) {
    var events = response.result.items;
    // appendPre('Upcoming events:');

    if (events.length > 0) {
      for (i = 0; i < events.length; i++) {
        var event = events[i];
        // var when = event.start.dateTime;
        var when = event.start.dateTime.substr(11, 5);

        // pulling out hours and mintes of the time
        // var whenEnd = event.end.dateTime.substr(11, 5);
        var whenHour = event.start.dateTime.substr(11, 2);
        var whenMinute = event.start.dateTime.substr(14, 2);
        var whenEndHour = event.end.dateTime.substr(11, 2);
        var whenEndMinute = event.end.dateTime.substr(14, 2);

        // translating event START to sum of minutes
        var whenStart = (whenHour) * 60 + (whenMinute) * 1;
        // translating event DURATIO to sum of minutes
        var duration = (whenEndHour - whenHour) * 60 + (whenEndMinute - whenMinute);
        // translating event END to sum of minutes
        var whenEnd = whenStart + duration;

        // this is for all day events (not containing "dateTime")
        if (!when) {
          when = event.start.date;
        }

        // apply for loop in DOM

        appendPre(event.summary + ' - ' + when + ' to ' + whenEndHour + ':' + whenEndMinute + ' (duration: ' + duration + '  ' + whenStart + ')');

        // Draw linear bars within the div called "bars"
        var newLi = document.createElement('div');
        newLi.style.width = duration + 'px';
        newLi.style.marginLeft = whenStart + 'px';
        var bars = document.getElementById('bars');
        bars.appendChild(newLi);

        // converting minutes into degrees (12 hour clock)
        var whenStartInDegrees = whenStart * 0.5;
        var whenEndInDegrees = whenStartInDegrees + duration * 0.5;
        // creating new svg w/ path for each badoodad
        var newPath = document.createElementNS("http://www.w3.org/2000/svg", "path");
        newPath.setAttribute('d', describeArc(175, 175, 160, whenStartInDegrees, whenEndInDegrees));
        newPath.setAttribute('fill', 'none');
        newPath.setAttribute('stroke', 'tomato');
        newPath.setAttribute('stroke-width', '4');
        document.getElementById('arcs').appendChild(newPath);

        if (now > whenEnd) {
          newPath.setAttribute('opacity', '0.5');
        }
        if (now >= whenStart && now <=whenEnd ){
          newPath.setAttribute('stroke-width', '10');
        }
      }
        // if no events, do this
    } else {
      appendPre('No upcoming events found.');
    }
  });
}
