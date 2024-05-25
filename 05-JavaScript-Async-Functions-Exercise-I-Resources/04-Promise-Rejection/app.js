function promiseRejection() {
    let promise = new Promise(function(resolve, reject){
        setTimeout(function(){
            reject("Something went wrong!")
        }, 3000)
    })
    promise.catch(function(error){
        console.log(error);
    })
}