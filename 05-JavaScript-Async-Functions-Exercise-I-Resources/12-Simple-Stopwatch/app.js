let seconds = 0;
let interval;
let saveTimeInterval;

function start(){
    interval = setInterval(function(){
        seconds++;
        console.log("Elapsed time: " + seconds + " seconds")
    }, 1000);

    saveTimeInterval = setInterval(async function(){
        await saveTime(seconds);
    }, 5000)
    
}

function stop(){
    clearInterval(interval);
    clearInterval(saveTimeInterval)
    seconds = 0;
}

function saveTime(saveTime){
    return new Promise(function(resolve, reject)
    {
        console.log("Saved time: " + saveTime + " seconds")
        resolve();
    })
}