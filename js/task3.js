(function(){

  document.getElementById('task3').addEventListener('click', task3);

  var githubUserUrl = 'https://api.github.com/repos/garethdn/jquery-numerator/stargazers';

  function task3() {
    var requestStream = Rx.Observable.fromPromise(window.fetch(githubUserUrl))
      .flatMap(function(res){
        return Rx.Observable.fromPromise(res.json());
      });

    requestStream.subscribe(function(res){
      document.getElementById('task3-output').innerHTML = JSON.stringify(res, null, 4);
      console.log(res)
    })
  }

})();