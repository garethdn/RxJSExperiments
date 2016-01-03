(function(){
  document.getElementById('task1').addEventListener('click', task1);

  var githubUserUrl = 'https://api.github.com/users/garethdn';

  function task1() {
    // This stream simply emits the string
    var requestStream = Rx.Observable.just(githubUserUrl);

    // Subscribing causes the stream to omit it's value
    requestStream.subscribe(function(url){
      // Create a new stream from the emitted url string which use the string
      // to make a HTTP request
      var responseStream = Rx.Observable.create(function(observer){
        // Manually assign the promise's arguments in the callbacks to the the observer's
        // `onNext`, `onError` and `onComplete` functions
        window.fetch(url).then(function(res){
          // fetch doesn't return the reponse directly, .json() needs to be called which returns a promise
          res.json().then(function(data){
            observer.onNext(data);
          })
        }, function(jqXHR, status, error){
          observer.onError(error);
        }, function(){
          observer.onCompleted();
        });
      });

      // Finally, subscribe to the `responseStream` and when it's response os emitted inject it into the DOM
      responseStream.subscribe(function(res){
        document.getElementById('task1-output').innerHTML = JSON.stringify(res, null, 4);
        console.log(res);
      });
    })
  }

})();