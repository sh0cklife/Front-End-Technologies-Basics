async function multiplePromises() {
      const promise1 = new Promise (function(resolve, reject){
            setTimeout(function(){
                  resolve('Resolved after 1 second!');
            }, 1000)
      });

      const promise2 = new Promise (function(resolve, reject){
            setTimeout(function(){
                  resolve('Resolved after 2 seconds!');
            }, 2000)
      });

      const promise3 = new Promise (function(resolve, reject){
            setTimeout(function(){
                  reject('Rejected after 3 seconds!');
            }, 3000)
      });

      // Promise.allSettled([promise1, promise2, promise3])
      // .then(result => {
      //       result.forEach(result => console.log(result.status, result.value || result.reason));
      // });

      const results = await Promise.allSettled([promise1, promise2, promise3]);
      results.forEach(result => console.log(result.status, result.value || result.reason));
}