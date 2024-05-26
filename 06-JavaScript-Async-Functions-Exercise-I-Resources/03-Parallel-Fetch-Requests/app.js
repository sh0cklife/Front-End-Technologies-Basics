async function fetchParallel() {
  const array = await Promise.all([
    fetch('https://swapi.dev/api/people/1')
    .then(res => res.json()),
    fetch('https://swapi.dev/api/people/2')
    .then(res => res.json())
  ]);
  console.log(array);
}