// // generator function
// function* generatorFunc(){
//     yield 1;
//     yield 2;
//     yield 3;
// }

// // create generator object
// const generatorObj = generatorFunc();
// console.log(generatorObj.next())
// console.log(generatorObj.next())
// console.log(generatorObj.next())
// console.log(generatorObj.next())
// console.log(generatorObj.next())


function asyncGenerator(generatorFunc) {
    const generatorObj = generatorFunc();
    function handle(result){
        if(result.done) return Promise.resolve(result.value);
        return Promise.resolve(result.value).then(
            res => handle(generatorObj.next(res)),
            err => handle(generatorObj.throw(err))
        )
    }
    try {
        return handle(generatorObj.next());
    } catch (error) {
        
    }
}

function startAsyncGenerator() {
    asyncGenerator(function* (){
        const data1 = yield new Promise(resolve => setTimeout(() => resolve('Task 1 is complete'), 2000)); console.log(data1);
        const data2 = yield new Promise(resolve => setTimeout(() => resolve('Task 2 is complete'), 5000)); console.log(data2);
        const data3 = yield new Promise(resolve => setTimeout(() => resolve('Task 3 is complete'), 10000)); console.log(data3);
    })
}