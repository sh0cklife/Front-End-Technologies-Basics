async function simplePromiseAsync() {
    let promise = new Promise(function(resolve, reject){
        setTimeout(function(){
            resolve("Async/Away is awsome!")
        }, 2000)
    })

    let result = await promise;
    console.log(result);
}