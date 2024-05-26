async function startQuiz() {
    
    let finalScore = 0;
    for (let i = 0; i < questions.length; i++){
        const {question, answers, correct} = questions[i];
        const userInput = await askQuestions(question, answers);
        if(userInput === correct){
            finalScore +=1;
            console.log("Correct asnwer!")
        }
        else{
            console.log("Wrong answer!!!")
        }
    }
    console.log("Final result: " + finalScore);
    if(finalScore >= 3){
        console.log("Excellent work!")
    }
    
}

function askQuestions(question, answers){
    return new Promise(function(resolve, reject){
        let message = question + '\n';
        answers.forEach((answer, index) => message += `${index}. ${answer}\n`);
        const userInput = prompt(message);
        resolve(parseInt(userInput));
    })
}


const questions = [
    {
        question: "What is 2 + 2?",
        answers: ["3","4","5"],
        correct: 1
    },
    {
        question: "What is the capital of France?",
        answers: ["Berlin","Madrid","Paris"],
        correct: 2
    },
    {
        question: "What is the square root of 16?",
        answers: ["4","5","6"],
        correct: 0
    }
]