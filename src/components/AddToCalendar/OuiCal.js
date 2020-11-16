;(function(exports) {
    var MS_IN_MINUTES = 60 * 1000;
  
    var formatTime = function(date) {
      return date.toISOString().replace(/-|:|\.\d+/g, '');
    };
  
    var calculateEndTime = function(event) {
      return event.end ?
        formatTime(event.end) :
        formatTime(new Date(event.start.getTime() + (event.duration * MS_IN_MINUTES)));
    };
  
    var hrefGenerators = {
      google: function(event) {
        var startTime = formatTime(event.start);
        var endTime = calculateEndTime(event);
  
        return encodeURI([
          'https://www.google.com/calendar/render',
          '?action=TEMPLATE',
          '&text=' + (event.title || ''),
          '&dates=' + (startTime || ''),
          '/' + (endTime || ''),
          '&details=' + (event.description || ''),
          '&location=' + (event.address || ''),
          '&sprop=&sprop=name:'
        ].join(''));
      },
  
      ics: function(event, eClass, calendarName) {
        var startTime = formatTime(event.start);
        var endTime = calculateEndTime(event);
  
        return encodeURI(
          'data:text/calendar;charset=utf8,' + [
            'BEGIN:VCALENDAR',
            'VERSION:2.0',
            'BEGIN:VEVENT',
            'URL:' + document.URL,
            'DTSTART:' + (startTime || ''),
            'DTEND:' + (endTime || ''),
            'SUMMARY:' + (event.title || ''),
            'DESCRIPTION:' + (event.description || ''),
            'LOCATION:' + (event.address || ''),
            'END:VEVENT',
            'END:VCALENDAR'].join('\n'));
      },
    };
  
    var generateCalendars = function(event) {
      return {
        google: hrefGenerators.google(event),
        ics: hrefGenerators.ics(event),
      };
    };
  
    // Make sure we have the necessary event data, such as start time and event duration
    var validParams = function(params) {
      return params.data !== undefined && params.data.start !== undefined &&
        (params.data.end !== undefined || params.data.duration !== undefined);
    };
  
    exports.createCalendar = function(params) {
      if (!validParams(params)) {
        console.log('Event details missing.');
        return;
      }
  
      return generateCalendars(params.data);
    };
  })(this);