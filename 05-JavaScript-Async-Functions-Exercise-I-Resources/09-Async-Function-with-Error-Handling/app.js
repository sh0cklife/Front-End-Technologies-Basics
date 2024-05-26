async function promiseRejectionAsync() {
   let promise = new Promise(function(resolve, reject){
      setTimeout(function(){
         reject(new Error("Something went wrong!"))
      }, 2000)
   })

   try{
      await promise;
   }
   catch(error){
      console.log(error);
   }
}