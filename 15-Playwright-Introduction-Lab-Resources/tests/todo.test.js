const { test, expect } = require('@playwright/test');

//verify user can add task
test('User can add task', async ({page}) => {
    //arrange
    await page.goto('http://localhost:8080')

    //act
    await page.fill('#task-input', 'Test Task');
    await page.click('#add-task')

    //assert
    const taskText = await page.textContent('.task');
    expect(taskText).toContain('Test Task')
})

//Verify user can delete tasks
test('User can delete tasks', async ({page}) => {
    //arrange
    await page.goto('http://localhost:8080');
    await page.fill('#task-input', 'Test Task');
    await page.click('#add-task');

    //act
    await page.click('.task .delete-task');

    //assert
    const allTasks = await page.$$eval('.task', tasks => tasks.map(
        task => task.textContent
    ))
    expect(allTasks).not.toContain('Test Task')
})

//verify user can mark task as complete
test('User can mark task as complete', async ({page}) => {
    //arrange
    await page.goto('http://localhost:8080');
    await page.fill('#task-input', 'Test Task');
    await page.click('#add-task');

    //act
    await page.click('.task .task-complete');

    //assert
    const completedTask = await page.$('.task.completed')
    expect(completedTask).not.toBeNull();
})

//verify user can filter tasks
test('User can filter tasks', async ({page}) => {
    //arrange
    await page.goto('http://localhost:8080');
    await page.fill('#task-input', 'Test Task');
    await page.click('#add-task');
    await page.click('.task .task-complete');

    //act
    await page.selectOption('#filter', 'Completed')

    //assert
    const incompleteTasks = await page.$('.task:not(.completed)')
    expect (incompleteTasks).toBeNull()
})