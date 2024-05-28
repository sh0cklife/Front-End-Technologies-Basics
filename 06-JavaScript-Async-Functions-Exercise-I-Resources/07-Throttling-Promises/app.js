async function throttlePromises() {
    const asyncTasnk = 
    [
        () => new Promise(resolve => setTimeout(() => {console.log('Task 1 is done'); resolve('Task 1 is done')}, 1000)),
        () => new Promise(resolve => setTimeout(() => {console.log('Task 2 is done'); resolve('Task 2 is done')}, 1500)),
        () => new Promise(resolve => setTimeout(() => {console.log('Task 3 is done'); resolve('Task 3 is done')}, 2000)),
        () => new Promise(resolve => setTimeout(() => {console.log('Task 4 is done'); resolve('Task 4 is done')}, 2500))
    ];

    async function throttle(tasks, limit){
        const results = [];
        const executions = [];
        for (const task of tasks){
            const p = task().then(result => {
                executions.splice(executions.indexOf(p), 1);
                return result;
            });
            executions.push[p];
            results.push[p];
            if (executions.length >= limit){
                await Promise.race(executions);
            }
        }

        return Promise.all(results);
    }

    const results = await throttle(asyncTasnk, 2);
    console.log('All tasks are completed', results);
}