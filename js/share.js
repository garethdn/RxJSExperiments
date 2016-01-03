(function(){

  document.getElementById('task5').addEventListener('click', run);
  document.getElementById('task5-subscribe').addEventListener('click', resubscribe);

  var url = 'https://api.github.com/repos/garethdn/jquery-numerator/stargazers';
  var subs = [];
  var stream = getStream();

  function run() {
    console.log('Subscribing...');
    subscribe();
  }

  function subscribe() {
    var sub = stream.subscribe(function(res){
      console.log(res);
    }, function(err){
      console.error(err)
    }, function(){
      console.log('Completed');
    })

    subs.push(sub)
    console.log('Total subscriptions: ' + subs.length);
  }

  function resubscribe() {
    console.log('Resubscribing...');
    subscribe();
  }

  function getStream() {
    return Rx.Observable
      .defer(function(){
        return Rx.Observable.fromPromise(window.fetch(url))
      })
      .flatMap(function(res){
        return Rx.Observable.fromPromise(res.json());
      });
  }

  function getMulticastStream() {
    return getStream().share();
  }

})();