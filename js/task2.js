(function(){

  document.getElementById('task2').addEventListener('click', task2);

  var githubUserUrl = 'https://api.github.com/users/garethdn';

  function task2() {
    var requestStream = Rx.Observable.just(githubUserUrl);

    requestStream.subscribe(function(url){
      // Use `flatMap` to pipe the `requestStream` to a new stream....
      var responseStream = requestStream.flatMap(function(url) {
        // ...which then creates a new stream from the fetch promise...
        return Rx.Observable.fromPromise(window.fetch(url)).flatMap(function(res){
          // ...which then creates another stream from the json() promise
          return Rx.Observable.fromPromise(res.json());
        });
      });

      responseStream.subscribe(function(res){
        document.getElementById('task2-output').innerHTML = JSON.stringify(res, null, 4);
        console.log(res);
      });
    })
  }

})();