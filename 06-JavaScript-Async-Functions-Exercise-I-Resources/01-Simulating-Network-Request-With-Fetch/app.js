async function fetchData() {
    const response = await fetch('https://swapi.dev/api/people/1');
    const jsonData = await response.json(); // promise
    console.log(jsonData);
}