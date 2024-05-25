function allPromise() {
    let promise = new Promise(function(resolve, reject){
        setTimeout(function(){
            resolve("Hello,")
        }, 1000)
    })

    let promise2 = new Promise(function(resolve, reject){
        setTimeout(function(){
            resolve("MR.")
        }, 2000)
    })

    let promise3 = new Promise(function(resolve, reject){
        setTimeout(function(){
            resolve("Dennis :)")
        }, 3000)
    })

    let promise4 = new Promise(function(resolve, reject){
        setTimeout(function(){
            reject("Something went wrong!")
        }, 2500)
    })

    Promise.all([promise, promise2, promise3, promise4])
        .then(function(result){
        console.log(result)
    }).catch(function(error){
        console.log(error)
    })
}