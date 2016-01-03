(function(){

  var clickStream = Rx.Observable.fromEvent(document.querySelector('#task4'), 'click');

  var trippleClickStream = clickStream
    .buffer(function() { return clickStream.debounce(250); })
    .map(function(list) { return list.length; })
    .filter(function(x) { return x === 3; });

  trippleClickStream.subscribe(function (numclicks) {
    document.getElementById('task4-output').insertAdjacentHTML('beforeend', '<div>That was a triple click!</div>');
  });

})();